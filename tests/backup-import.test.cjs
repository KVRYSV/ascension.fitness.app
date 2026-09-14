// Run with: node --test tests/backup-import.test.cjs
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
function sourceBetween(start, end) {
  const offset = html.indexOf(start);
  assert.notEqual(offset, -1);
  const stop = html.indexOf(end, offset);
  assert.notEqual(stop, -1);
  return html.slice(offset, stop);
}

function harness() {
  let change;
  const stored = new Map();
  const messages = [];
  const context = vm.createContext({
    window: {},
    document: { getElementById: () => ({ addEventListener: (_, fn) => { change = fn; } }) },
    localStorage: {
      getItem: key => stored.get(key) ?? null,
      setItem: (key, value) => { stored.set(key, value); },
      removeItem: key => { stored.delete(key); }
    },
    FileReader: class {
      readAsText(file) {
        if (file.fail) return this.onerror();
        this.result = file.text;
        this.done = this.onload();
        context.readDone = this.done;
      }
    },
    toast: message => messages.push(message),
    sysConfirm: async () => true,
    bootUI: () => {},
    sessionDraft: null
  });
  vm.runInContext(sourceBetween('const KEY=', '/* ============================================================ UNITS'), context);
  vm.runInContext(sourceBetween('function prepareBackup(', 'async function restartProgram('), context);
  vm.runInContext(`S=defaultState(); S.profile={name:'Player',sex:'male',age:30,heightCm:180,weightKg:80,activity:1.55,equip:'gym',days:[1,3,5],goal:'leanbulk'}; save();`, context);
  const initial = stored.get('ascension_save_v3');
  return {
    context, stored, messages, initial,
    state: () => vm.runInContext('S', context),
    backup: () => JSON.parse(initial),
    async import(data, options = {}) {
      const target = { value: 'backup.json', files: [{ text: options.raw ?? JSON.stringify(data), fail: options.fail }] };
      change({ target });
      await context.readDone;
      assert.equal(target.value, '');
    },
    unchanged() {
      assert.equal(stored.get('ascension_save_v3'), initial);
      assert.equal(JSON.stringify(vm.runInContext('S', context)), initial);
    }
  };
}

test('all inline scripts compile', () => {
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(match[1]);
});

for (const [name, mutate] of [
  ['sessions object', b => { b.sessions = {}; }],
  ['null session', b => { b.sessions = [null]; }],
  ['invalid session exercises', b => { b.sessions = [{ date: '2026-09-14', name: 'Gate', ex: {} }]; }],
  ['invalid exercise sets', b => { b.sessions = [{ date: '2026-09-14', name: 'Gate', ex: [{ id: 'squat', sets: {} }] }]; }],
  ['null settings', b => { b.settings = null; }],
  ['invalid nested array', b => { b.rpg.titles.owned = {}; }],
  ['invalid numeric type', b => { b.rpg.level = '1'; }],
  ['nonfinite number', b => { b.rpg.exp = Infinity; }],
  ['invalid profile days', b => { b.profile.days = [7]; }],
  ['array root', () => []]
]) {
  test(`rejects ${name} before confirmation or persistence`, async () => {
    const h = harness();
    h.context.sysConfirm = () => assert.fail('invalid backup reached confirmation');
    const b = h.backup();
    await h.import(mutate(b) ?? b);
    h.unchanged();
    assert.match(h.messages.at(-1), /Invalid backup/);
  });
}

test('imports a current backup and persists rendering changes only after success', async () => {
  const h = harness();
  const b = h.backup();
  b.profile.name = 'Restored';
  h.context.bootUI = () => {
    vm.runInContext('S.rpg.exp=12; save();', h.context);
    assert.equal(h.stored.get('ascension_save_v3'), h.initial);
  };
  await h.import(b);
  const saved = JSON.parse(h.stored.get('ascension_save_v3'));
  assert.equal(saved.profile.name, 'Restored');
  assert.equal(saved.rpg.exp, 12);
  assert.equal(h.messages.at(-1), 'Backup restored');
});

test('fills omitted legacy fields with defaults', async () => {
  const h = harness();
  await h.import({ profile: h.backup().profile, rpg: { level: 2 }, version: 1 });
  assert.equal(h.state().rpg.level, 2);
  assert.equal(h.state().sessions.length, 0);
  assert.equal(h.state().settings.units, 'imperial');
  assert.equal(h.messages.at(-1), 'Backup restored');
});

test('cancelled confirmation preserves the save', async () => {
  const h = harness();
  h.context.sysConfirm = async () => false;
  const b = h.backup(); b.profile.name = 'Cancelled';
  await h.import(b);
  h.unchanged();
});

test('rendering failure rolls back state and draft, including attempted autosaves', async () => {
  const h = harness();
  const previousDraft = { date: '2026-09-14' };
  h.context.sessionDraft = previousDraft;
  const b = h.backup(); b.profile.name = 'Broken';
  h.context.bootUI = () => {
    if (h.state().profile.name === 'Broken') {
      vm.runInContext('S.rpg.exp=99; save();', h.context);
      throw new Error('render failed');
    }
  };
  await h.import(b);
  h.unchanged();
  assert.equal(h.context.sessionDraft, previousDraft);
  assert.equal(vm.runInContext('storageOK', h.context), true);
  assert.match(h.messages.at(-1), /progress was kept/);
});

test('storage write failure rolls back without reporting success', async () => {
  const h = harness();
  h.context.localStorage.setItem = () => { throw new Error('quota exceeded'); };
  const b = h.backup(); b.profile.name = 'Not saved';
  await h.import(b);
  h.unchanged();
  assert.match(h.messages.at(-1), /progress was kept/);
});

test('unavailable storage rejects restoration', async () => {
  const h = harness();
  vm.runInContext('storageOK=false', h.context);
  await h.import(h.backup());
  h.unchanged();
  assert.equal(vm.runInContext('storageOK', h.context), false);
  assert.match(h.messages.at(-1), /progress was kept/);
});

test('invalid JSON and file read errors preserve the save', async () => {
  const h = harness();
  await h.import(null, { raw: '{' });
  h.unchanged();
  assert.match(h.messages.at(-1), /valid JSON/);
  await h.import(null, { fail: true });
  h.unchanged();
  assert.match(h.messages.at(-1), /Could not read/);
});
