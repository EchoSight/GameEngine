const STORAGE_KEYS = {
  role: 'dnd_role',
  characters: 'dnd_characters',
  resources: 'dnd_resources',
  maps: 'dnd_maps',
};

const ROUTES = {
  roster: '/',
  create: '/create',
  resources: '/resources',
  dice: '/dice',
  maps: '/maps',
};

const ICONS = {
  characters: '👥',
  create: '✚',
  dice: '🎲',
  maps: '🗺',
  resources: '📚',
  back: '←',
  edit: '✎',
  save: '✓',
  delete: '✕',
  upload: '⤴',
  zoomIn: '+',
  zoomOut: '−',
  reset: '↺',
  grid: '⌗',
  player: '👁',
  dm: '🛡',
  line: '／',
  rect: '▭',
  pointer: '⌖',
  move: '👣',
  attack: '⚔',
  next: '»',
};

const ABILITY_NAMES = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const DND_CLASSES = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
const DND_RACES = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling', 'Dragonborn'];
const CLASS_HIT_DIE = {
  Barbarian: 12,
  Bard: 8,
  Cleric: 8,
  Druid: 8,
  Fighter: 10,
  Monk: 8,
  Paladin: 10,
  Ranger: 10,
  Rogue: 8,
  Sorcerer: 6,
  Warlock: 8,
  Wizard: 6,
};
const EQUIPMENT_CATALOG = [
  { name: 'Longsword', weight: 3, quantity: 1, category: 'weapon', damageDie: 8, attackBonus: 0, damageBonus: 0, properties: ['versatile'] },
  { name: 'Shortbow', weight: 2, quantity: 1, category: 'weapon', damageDie: 6, attackBonus: 0, damageBonus: 0, properties: ['ranged', 'two-handed'] },
  { name: 'Dagger', weight: 1, quantity: 1, category: 'weapon', damageDie: 4, attackBonus: 0, damageBonus: 0, properties: ['finesse', 'light', 'thrown'] },
  { name: 'Greataxe', weight: 7, quantity: 1, category: 'weapon', damageDie: 12, attackBonus: 0, damageBonus: 0, properties: ['heavy', 'two-handed'] },
  { name: 'Handaxe', weight: 2, quantity: 1, category: 'weapon', damageDie: 6, attackBonus: 0, damageBonus: 0, properties: ['light', 'thrown'] },
  { name: 'Javelin', weight: 2, quantity: 1, category: 'weapon', damageDie: 6, attackBonus: 0, damageBonus: 0, properties: ['thrown'] },
  { name: 'Mace', weight: 4, quantity: 1, category: 'weapon', damageDie: 6, attackBonus: 0, damageBonus: 0 },
  { name: 'Quarterstaff', weight: 4, quantity: 1, category: 'weapon', damageDie: 6, attackBonus: 0, damageBonus: 0, properties: ['versatile'] },
  { name: 'Rapier', weight: 2, quantity: 1, category: 'weapon', damageDie: 8, attackBonus: 0, damageBonus: 0, properties: ['finesse'] },
  { name: 'Greatsword', weight: 6, quantity: 1, category: 'weapon', damageDie: 12, attackBonus: 0, damageBonus: 0, properties: ['heavy', 'two-handed'] },
  { name: 'Light Crossbow', weight: 5, quantity: 1, category: 'weapon', damageDie: 8, attackBonus: 0, damageBonus: 0, properties: ['ranged', 'two-handed'] },
  { name: 'Warhammer', weight: 2, quantity: 1, category: 'weapon', damageDie: 8, attackBonus: 0, damageBonus: 0, properties: ['versatile'] },
  { name: 'Chain Mail', weight: 55, quantity: 1, category: 'armor', acBonus: 6, properties: ['heavy'] },
  { name: 'Leather Armor', weight: 10, quantity: 1, category: 'armor', acBonus: 1, properties: ['light'] },
  { name: 'Scale Mail', weight: 45, quantity: 1, category: 'armor', acBonus: 4, properties: ['medium'] },
  { name: 'Shield', weight: 6, quantity: 1, category: 'armor', acBonus: 2 },
  { name: 'Studded Leather', weight: 13, quantity: 1, category: 'armor', acBonus: 2, properties: ['light'] },
  { name: 'Half Plate', weight: 40, quantity: 1, category: 'armor', acBonus: 5, properties: ['medium'] },
  { name: 'Plate', weight: 65, quantity: 1, category: 'armor', acBonus: 8, properties: ['heavy'] },
  { name: 'Backpack', weight: 5, quantity: 1, category: 'gear' },
  { name: 'Rope (50 ft)', weight: 10, quantity: 1, category: 'gear' },
  { name: 'Torch', weight: 1, quantity: 5, category: 'gear' },
  { name: 'Tinderbox', weight: 1, quantity: 1, category: 'gear' },
  { name: 'Rations (1 day)', weight: 2, quantity: 5, category: 'consumable' },
  { name: 'Healing Potion', weight: 0.5, quantity: 1, category: 'consumable', damageDie: 4, damageBonus: 4, properties: ['healing'] },
  { name: 'Antitoxin', weight: 0, quantity: 1, category: 'consumable' },
];
const DEFAULT_RESOURCES = [
  {
    id: 'res-1',
    title: 'Standard Array',
    description: 'The standard ability score array for quick character creation.',
    tags: ['rules', 'character-creation'],
    type: 'rules',
    content: '15, 14, 13, 12, 10, 8 — Assign one to each ability score.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'res-2',
    title: 'Conditions Reference',
    description: 'Quick reference for all combat conditions.',
    tags: ['rules', 'combat'],
    type: 'handout',
    content: 'Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Incapacitated, Invisible, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned, Unconscious.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'res-3',
    title: 'Starter Dungeon Map',
    description: 'A simple 5-room dungeon for level 1 parties.',
    tags: ['maps', 'starter'],
    type: 'map',
    content: 'Room 1: Entry Hall (2 Goblins) → Room 2: Trapped Corridor (DC 12 Perception) → Room 3: Armory (Loot) → Room 4: Boss Chamber (Bugbear) → Room 5: Treasure Vault.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'res-4',
    title: 'Town of Willowmere',
    description: 'A small frontier town for campaign starting point.',
    tags: ['lore', 'setting'],
    type: 'lore',
    content: 'Pop: ~200. Notable NPCs: Mayor Elda Thornwick (Human, LG), Blacksmith Grok (Half-Orc), Innkeeper Mira (Halfling). Tavern: The Rusty Lantern. Quest Board available.',
    createdAt: new Date().toISOString(),
  },
];
const DICE = [
  { sides: 4, label: 'd4', icon: '◆' },
  { sides: 6, label: 'd6', icon: '⬡' },
  { sides: 8, label: 'd8', icon: '◇' },
  { sides: 10, label: 'd10', icon: '⬠' },
  { sides: 12, label: 'd12', icon: '⬢' },
  { sides: 20, label: 'd20', icon: '⬣' },
  { sides: 100, label: 'd100', icon: '%' },
];
const MONSTER_PRESETS = [
  { label: 'Goblin', color: 'hsl(120, 60%, 35%)', hp: 7 },
  { label: 'Orc', color: 'hsl(30, 70%, 35%)', hp: 15 },
  { label: 'Dragon', color: 'hsl(0, 70%, 40%)', hp: 195 },
  { label: 'Skeleton', color: 'hsl(0, 0%, 60%)', hp: 13 },
  { label: 'Wolf', color: 'hsl(30, 30%, 40%)', hp: 11 },
  { label: 'Bandit', color: 'hsl(45, 50%, 35%)', hp: 11 },
];
const XP_TABLE = [0, 0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];

const state = {
  role: localStorage.getItem(STORAGE_KEYS.role) || 'player',
  mobileMenuOpen: false,
  drawer: null,
  dialog: null,
  diceFabOpen: false,
  fabResult: null,
  dicePage: {
    history: [],
    expression: '1d20',
    advMode: 'normal',
    lastRoll: null,
    rolling: false,
  },
  rosterVersion: 0,
  view: {
    characterEditing: false,
    selectedCharacterId: null,
    resourcesAdding: false,
    resourcesFilterTag: 'all',
    mapsUploading: false,
    mapName: '',
    mapPreview: '',
  },
  mapUi: {},
};

const app = document.getElementById('app');

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCharacters() {
  return readJson(STORAGE_KEYS.characters, []);
}

function saveCharacters(characters) {
  writeJson(STORAGE_KEYS.characters, characters);
}

function getResources() {
  const resources = readJson(STORAGE_KEYS.resources, null);
  if (resources) return resources;
  writeJson(STORAGE_KEYS.resources, DEFAULT_RESOURCES);
  return DEFAULT_RESOURCES;
}

function saveResources(resources) {
  writeJson(STORAGE_KEYS.resources, resources);
}

function getMaps() {
  return readJson(STORAGE_KEYS.maps, []);
}

function saveMaps(maps) {
  writeJson(STORAGE_KEYS.maps, maps);
}

function getMapTokens(mapId) {
  return readJson(`map-tokens-${mapId}`, []);
}

function saveMapTokens(mapId, tokens) {
  writeJson(`map-tokens-${mapId}`, tokens);
}

function getMapObstacles(mapId) {
  return readJson(`map-obstacles-${mapId}`, []);
}

function saveMapObstacles(mapId, obstacles) {
  writeJson(`map-obstacles-${mapId}`, obstacles);
}

function getModifier(score) {
  return Math.floor((score - 10) / 2);
}

function formatModifier(score) {
  const modifier = getModifier(score);
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

function xpForLevel(level) {
  return XP_TABLE[Math.min(level, 20)] ?? XP_TABLE[20];
}

function getEquippedAC(character) {
  const dex = character.abilities.find((ability) => ability.name === 'DEX');
  const dexMod = dex ? getModifier(dex.score) : 0;
  let base = 10 + dexMod;
  character.equipment.filter((item) => item.equipped && item.category === 'armor').forEach((item) => {
    if (item.acBonus) base += item.acBonus;
  });
  return base;
}

function getEquippedWeapons(character) {
  return character.equipment.filter((item) => item.equipped && item.category === 'weapon');
}

function parseExpression(expr) {
  const match = expr.trim().toLowerCase().match(/^(\d*)d(\d+)\s*([+-]\s*\d+)?$/);
  if (!match) return null;
  const count = match[1] ? Number.parseInt(match[1], 10) : 1;
  const sides = Number.parseInt(match[2], 10);
  const modifier = match[3] ? Number.parseInt(match[3].replace(/\s/g, ''), 10) : 0;
  if (count < 1 || count > 100 || sides < 2 || sides > 100) return null;
  return { count, sides, modifier };
}

function rollDice(count, sides) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
}

function rollExpression(expr, advMode) {
  const parsed = parseExpression(expr);
  if (!parsed) return null;
  let rolls = rollDice(parsed.count, parsed.sides).map((result) => ({ die: parsed.sides, result }));
  if (advMode && parsed.count === 1 && parsed.sides === 20) {
    const second = Math.floor(Math.random() * 20) + 1;
    const first = rolls[0].result;
    rolls = [{ die: 20, result: advMode === 'advantage' ? Math.max(first, second) : Math.min(first, second) }];
  }
  const diceTotal = rolls.reduce((sum, roll) => sum + roll.result, 0);
  return {
    id: uid('roll'),
    expression: expr.trim(),
    rolls,
    modifier: parsed.modifier,
    total: diceTotal + parsed.modifier,
    advantage: advMode,
    timestamp: Date.now(),
  };
}

function quickRoll(sides) {
  const result = Math.floor(Math.random() * sides) + 1;
  return {
    id: uid('roll'),
    expression: `1d${sides}`,
    rolls: [{ die: sides, result }],
    modifier: 0,
    total: result,
    timestamp: Date.now(),
  };
}

function abilityArray() {
  return ABILITY_NAMES.map((name) => ({ name, score: 10 }));
}

function getRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return hash.startsWith('/') ? hash : `/${hash}`;
}

function navigate(path) {
  if (window.location.hash === `#${path}`) {
    render();
    return;
  }
  window.location.hash = path;
}

function activeCharacterIdFromRoute(route) {
  const match = route.match(/^\/character\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getMapViewState(mapId) {
  if (!state.mapUi[mapId]) {
    state.mapUi[mapId] = {
      zoom: 1,
      panX: 0,
      panY: 0,
      isPanning: false,
      draggingTokenId: null,
      dragOffsetX: 0,
      dragOffsetY: 0,
      draggingObstacleId: null,
      dragObstacleStart: null,
      drawObstacleStart: null,
      drawPreview: null,
      showGrid: true,
      gridSize: 40,
      ftPerCell: 5,
      showPlayerPreview: false,
      selectedTokenId: null,
      showAddMenu: false,
      selectedObstacleId: null,
      obstacleTool: null,
      imgWidth: 800,
      imgHeight: 600,
      initiativeEntries: [],
      combatActive: false,
      currentTurnIndex: 0,
      combatMoving: false,
      combatMovementUsed: 0,
      lastCombatResult: null,
      lastAttackState: { hasAttacked: false, selectedWeaponId: null },
    };
  }
  return state.mapUi[mapId];
}

function getCurrentMapViewState() {
  const route = getRoute();
  const mapId = route.match(/^\/maps\/([^/]+)$/)?.[1];
  return mapId ? getMapViewState(decodeURIComponent(mapId)) : null;
}

function hslHealthColor(current, max) {
  const ratio = max > 0 ? current / max : 0;
  if (ratio > 0.5) return 'var(--success)';
  if (ratio > 0.25) return 'var(--warning)';
  return 'var(--accent)';
}

function percent(current, max) {
  return max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0;
}

function totalWeight(equipment) {
  return equipment.reduce((sum, item) => sum + item.weight * item.quantity, 0);
}

function isCrit(result) {
  return result && result.rolls.length === 1 && result.rolls[0].die === 20 && result.rolls[0].result === 20;
}

function isFumble(result) {
  return result && result.rolls.length === 1 && result.rolls[0].die === 20 && result.rolls[0].result === 1;
}

function saveRole(role) {
  state.role = role;
  localStorage.setItem(STORAGE_KEYS.role, role);
}

function routeMeta(route) {
  if (route.startsWith('/create')) return { key: 'create', label: 'NEW BUILD' };
  if (route.startsWith('/dice')) return { key: 'dice', label: 'DICE ROLLER' };
  if (route.startsWith('/maps')) return { key: 'maps', label: 'MAPS' };
  if (route.startsWith('/resources')) return { key: 'resources', label: 'RESOURCES' };
  return { key: 'characters', label: 'CHARACTERS' };
}

function renderSidebar(route) {
  const links = [
    { path: ROUTES.roster, label: 'CHARACTERS', icon: ICONS.characters },
    { path: ROUTES.create, label: 'NEW BUILD', icon: ICONS.create },
    { path: ROUTES.dice, label: 'DICE ROLLER', icon: ICONS.dice },
    { path: ROUTES.maps, label: 'MAPS', icon: ICONS.maps },
    { path: ROUTES.resources, label: 'RESOURCES', icon: ICONS.resources },
  ];
  return `
    <aside class="sidebar">
      <div class="sidebar__brand">
        <p class="brand-title">TACTICAL<br />SLATE</p>
        <p class="brand-subtitle">Character engine</p>
      </div>
      <div class="sidebar__role">
        <button class="role-toggle ${state.role === 'dm' ? 'is-dm' : 'is-player'}" data-action="toggle-role">
          <span class="icon">${state.role === 'dm' ? ICONS.dm : ICONS.player}</span>
          ${state.role === 'dm' ? 'DUNGEON MASTER' : 'PLAYER VIEW'}
        </button>
      </div>
      <nav class="sidebar-nav">
        ${links
          .map((link) => {
            const active = route === link.path || route.startsWith(`${link.path}/`);
            return `<a class="sidebar-link ${active ? 'is-active' : ''}" href="#${link.path}"><span class="icon">${link.icon}</span>${link.label}</a>`;
          })
          .join('')}
      </nav>
      <div class="sidebar__footer">
        <p class="meta-text">v1.1 // ${state.role === 'dm' ? 'DM MODE' : 'PLAYER MODE'}</p>
      </div>
    </aside>
  `;
}

function renderMobileNav(route) {
  const active = routeMeta(route);
  const links = [
    { path: ROUTES.roster, label: 'CHARACTERS', icon: ICONS.characters },
    { path: ROUTES.create, label: 'NEW BUILD', icon: ICONS.create },
    { path: ROUTES.dice, label: 'DICE ROLLER', icon: ICONS.dice },
    { path: ROUTES.maps, label: 'MAPS', icon: ICONS.maps },
    { path: ROUTES.resources, label: 'RESOURCES', icon: ICONS.resources },
  ];
  return `
    <div class="mobile-topbar">
      <div>
        <div class="brand-title" style="font-size:0.8rem">TACTICAL SLATE</div>
        <div class="meta-text">${active.label}</div>
      </div>
      <div class="inline-actions">
        <button class="role-toggle ${state.role === 'dm' ? 'is-dm' : 'is-player'}" data-action="toggle-role">${state.role === 'dm' ? 'DM' : 'PLR'}</button>
        <button class="icon-button" data-action="toggle-mobile-menu" aria-label="Menu">☰</button>
      </div>
    </div>
    <div class="mobile-menu ${state.mobileMenuOpen ? '' : 'hidden'}">
      ${links
        .map((link) => `<a class="sidebar-link ${route === link.path || route.startsWith(`${link.path}/`) ? 'is-active' : ''}" href="#${link.path}" data-action="close-mobile-menu"><span class="icon">${link.icon}</span>${link.label}</a>`)
        .join('')}
    </div>
  `;
}

function renderRosterPage() {
  const characters = getCharacters();
  return `
    <section class="page-body">
      <div class="page-header">
        <div>
          <h1 class="page-title">CHARACTER ROSTER</h1>
          <p class="kicker">${characters.length} BUILD${characters.length === 1 ? '' : 'S'} REGISTERED</p>
        </div>
        <a class="button action-link" href="#${ROUTES.create}">${ICONS.create} NEW BUILD</a>
      </div>
      ${
        characters.length === 0
          ? `<div class="empty-state"><p class="empty-title">NO CHARACTERS FOUND.</p><a class="empty-link" href="#${ROUTES.create}">INITIATE FIRST BUILD →</a></div>`
          : `<div class="card-grid">${characters.map(renderCharacterCard).join('')}</div>`
      }
    </section>
  `;
}

function renderCharacterCard(character) {
  const hpPct = percent(character.hp, character.maxHp);
  return `
    <a class="card" href="#/character/${encodeURIComponent(character.id)}">
      <div class="character-card__head">
        <div class="character-card__body">
          ${renderAvatar(character.icon, character.name, 'avatar')}
          <div class="meta-stack">
            <h3 class="name">${escapeHtml(character.name)}</h3>
            <p class="kicker">LVL ${character.level} ${escapeHtml(character.race)} ${escapeHtml(character.class)}</p>
          </div>
        </div>
        <div style="text-align:right">
          <div class="big-number" style="font-size:1.8rem">${character.ac}</div>
          <div class="stat-label">AC</div>
        </div>
      </div>
      <div class="hp-bar">
        <div class="row-between"><span class="stat-label">HIT POINTS</span><span class="hp-numbers"><span>${character.hp}</span><span style="color:var(--muted-foreground)">/${character.maxHp}</span></span></div>
        <div class="hp-track"><div class="hp-fill" style="width:${hpPct}%;background:${hslHealthColor(character.hp, character.maxHp)}"></div></div>
      </div>
      <div class="stats-grid" style="margin-top:0.9rem">
        <div class="surface stat-card"><div class="stat-value" style="font-size:1.2rem">${formatModifier(character.abilities.find((a) => a.name === 'STR')?.score ?? 10)}</div><div class="stat-label">STR</div></div>
        <div class="surface stat-card"><div class="stat-value" style="font-size:1.2rem">${formatModifier(character.abilities.find((a) => a.name === 'DEX')?.score ?? 10)}</div><div class="stat-label">DEX</div></div>
        <div class="surface stat-card"><div class="stat-value" style="font-size:1.2rem">${character.speed}</div><div class="stat-label">SPD</div></div>
      </div>
    </a>
  `;
}

function renderAvatar(icon, name, className = 'avatar') {
  return icon
    ? `<img class="${className}" src="${icon}" alt="${escapeHtml(name)}" />`
    : `<span class="${className} mono">${escapeHtml((name || '?').slice(0, 1).toUpperCase())}</span>`;
}

function renderCreatePage() {
  const draft = state.view.createDraft || {
    name: '',
    race: DND_RACES[0],
    dndClass: DND_CLASSES[0],
    level: 1,
    abilities: abilityArray(),
    equipment: [],
  };
  state.view.createDraft = draft;
  const conMod = getModifier(draft.abilities.find((ability) => ability.name === 'CON')?.score ?? 10);
  const hitDie = CLASS_HIT_DIE[draft.dndClass];
  const maxHp = Math.max(1, hitDie + conMod + (draft.level - 1) * (Math.floor(hitDie / 2) + 1 + conMod));
  const baseAc = 10 + getModifier(draft.abilities.find((ability) => ability.name === 'DEX')?.score ?? 10);
  return `
    <section class="page-body">
      <div class="page-header">
        <div>
          <h1 class="page-title">INITIATE CHARACTER BUILD.</h1>
          <p class="kicker">Static browser workflow · no backend required</p>
        </div>
      </div>
      <form id="create-character-form" class="panel-stack">
        <section class="section">
          <h2 class="section-title">IDENTITY</h2>
          <div class="card-grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
            <div class="surface" style="grid-column:span 2">
              <label class="stat-label" for="create-name">NAME</label>
              <input id="create-name" name="name" value="${escapeHtml(draft.name)}" placeholder="Enter character name..." />
            </div>
            <div class="surface">
              <label class="stat-label" for="create-race">RACE</label>
              <select id="create-race" name="race">${DND_RACES.map((race) => `<option value="${race}" ${draft.race === race ? 'selected' : ''}>${race}</option>`).join('')}</select>
            </div>
            <div class="surface">
              <label class="stat-label" for="create-class">CLASS</label>
              <select id="create-class" name="dndClass">${DND_CLASSES.map((dndClass) => `<option value="${dndClass}" ${draft.dndClass === dndClass ? 'selected' : ''}>${dndClass}</option>`).join('')}</select>
            </div>
            <div class="surface">
              <label class="stat-label">LEVEL</label>
              <div class="inline-actions">
                <button class="icon-button" type="button" data-action="adjust-create-level" data-step="-1">−</button>
                <span class="big-number" style="font-size:1.6rem">${draft.level}</span>
                <button class="icon-button" type="button" data-action="adjust-create-level" data-step="1">+</button>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">COMPUTED</h2>
          <div class="stats-grid">
            <div class="surface inline-stat"><span class="stat-label">MAX HP</span><span class="big-number" style="font-size:1.3rem">${maxHp}</span></div>
            <div class="surface inline-stat"><span class="stat-label">AC</span><span class="big-number" style="font-size:1.3rem">${baseAc}</span></div>
            <div class="surface inline-stat"><span class="stat-label">HIT DIE</span><span class="big-number" style="font-size:1.3rem">d${hitDie}</span></div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">ABILITY SCORES</h2>
          <div class="ability-grid">
            ${draft.abilities.map((ability, index) => renderAbilityCard(ability, true, `create-ability`, index)).join('')}
          </div>
        </section>

        <section class="section">
          <div class="section-header">
            <h2 class="section-title" style="margin:0">EQUIPMENT</h2>
            <button class="button button--ghost" type="button" data-action="open-equipment-drawer" data-mode="create">${ICONS.create} ADD ITEM</button>
          </div>
          ${renderEquipmentList(draft.equipment, true, 'create')}
        </section>

        <button class="button button--primary" type="submit" ${draft.name.trim() ? '' : 'disabled'}>FINALIZE BUILD</button>
      </form>
    </section>
  `;
}

function renderAbilityCard(ability, editable, actionPrefix, index) {
  return `
    <div class="surface stat-card">
      <div class="stat-label">${ability.name}</div>
      <div class="stat-value">${formatModifier(ability.score)}</div>
      <div class="adjusters">
        ${editable ? `<button class="stat-adjust" data-action="${actionPrefix}" data-index="${index}" data-step="-1" type="button">−</button>` : ''}
        <span class="mono">${ability.score}</span>
        ${editable ? `<button class="stat-adjust" data-action="${actionPrefix}" data-index="${index}" data-step="1" type="button">+</button>` : ''}
      </div>
    </div>
  `;
}

function renderEquipmentList(equipment, editable, scope) {
  if (!equipment.length) {
    return `<div class="empty-state" style="padding:1.2rem"><p class="empty-title" style="margin-bottom:0">No equipment${scope === 'create' ? '. Click ADD ITEM to browse catalog.' : '.'}</p></div>`;
  }
  return `
    <div class="item-list">
      ${equipment.map((item) => renderEquipmentRow(item, editable, scope)).join('')}
    </div>
    <div style="margin-top:0.45rem;text-align:right" class="helper-text">TOTAL WEIGHT: ${totalWeight(equipment)} lb</div>
  `;
}

function renderEquipmentRow(item, editable, scope) {
  return `
    <div class="item-row">
      <div class="item-main">
        <div class="mono">${item.quantity}× ${escapeHtml(item.name)}
          ${item.damageDie && item.category === 'weapon' ? `<span class="item-meta">(1d${item.damageDie}${(item.damageBonus || 0) > 0 ? `+${item.damageBonus}` : ''})</span>` : ''}
          ${item.acBonus && item.category === 'armor' ? `<span class="item-meta">(+${item.acBonus} AC)</span>` : ''}
        </div>
        <div class="item-meta">${item.category} · ${item.weight} lb ${item.equipped ? '· equipped' : ''}</div>
      </div>
      ${
        editable
          ? `<div class="item-actions">
              <button class="icon-button ${item.equipped ? 'button--secondary' : ''}" data-action="toggle-equip" data-scope="${scope}" data-id="${item.id}" type="button">✓</button>
              <button class="icon-button icon-button--danger" data-action="remove-equipment" data-scope="${scope}" data-id="${item.id}" type="button">✕</button>
            </div>`
          : ''
      }
    </div>
  `;
}

function renderCharacterPage(characterId) {
  const character = getCharacters().find((entry) => entry.id === characterId);
  if (!character) {
    return renderNotFoundPage('Character not found.');
  }
  state.view.selectedCharacterId = characterId;
  const editing = state.view.characterEditing;
  const xpNext = xpForLevel(character.level + 1);
  const progress = xpNext > 0 ? Math.min(100, (character.xp / xpNext) * 100) : 100;
  return `
    <section class="page-body">
      <div class="character-header" style="margin-bottom:0.75rem">
        <div class="character-card__body" style="flex:1;min-width:0">
          <button class="icon-button" data-action="navigate" data-path="/" aria-label="Back">${ICONS.back}</button>
          <div class="detail-avatar">
            ${renderAvatar(character.icon, character.name, 'avatar')}
          </div>
          <div class="meta-stack" style="flex:1;min-width:0">
            <h1 class="page-title">${escapeHtml(character.name)}</h1>
            <p class="kicker">LVL ${character.level} ${escapeHtml(character.race)} ${escapeHtml(character.class)}</p>
          </div>
        </div>
        <div class="detail-actions">
          <button class="button" data-action="toggle-character-edit">${editing ? `${ICONS.save} DONE` : `${ICONS.edit} EDIT`}</button>
          <button class="button button--danger" data-action="delete-character" data-id="${character.id}">${ICONS.delete} DELETE</button>
        </div>
      </div>

      <div class="xp-bar">
        <div class="progress-track"><div class="progress-fill xp-fill" style="width:${progress}%"></div></div>
      </div>

      <div class="detail-grid">
        <section>
          <h2 class="section-title">ABILITIES</h2>
          <div class="ability-grid" style="grid-template-columns:repeat(3,minmax(0,1fr))">
            ${character.abilities.map((ability, index) => renderAbilityCard(ability, editing, 'character-ability', index)).join('')}
          </div>
        </section>
        <section>
          <h2 class="section-title">COMBAT</h2>
          <div class="surface">
            <div class="hp-bar">
              <div class="row-between"><span class="stat-label">HIT POINTS</span><span class="hp-numbers"><span>${character.hp}</span><span style="color:var(--muted-foreground)">/${character.maxHp}</span></span></div>
              <div class="hp-track"><div class="hp-fill" style="width:${percent(character.hp, character.maxHp)}%;background:${hslHealthColor(character.hp, character.maxHp)}"></div></div>
            </div>
            ${
              editing
                ? `<div class="button-group" style="margin-top:0.8rem"><button class="button button--danger" data-action="adjust-hp" data-step="-1">DAMAGE</button><button class="button button--secondary" data-action="adjust-hp" data-step="1">HEAL</button></div>`
                : ''
            }
          </div>
          <div class="stats-grid" style="margin-top:0.5rem">
            <div class="surface stat-card"><div class="stat-value">${character.ac}</div><div class="stat-label">AC</div></div>
            <div class="surface stat-card"><div class="stat-value">${character.speed}</div><div class="stat-label">SPEED</div></div>
            <div class="surface stat-card"><div class="stat-value">${character.level}</div><div class="stat-label">LEVEL</div></div>
          </div>
        </section>
        <section>
          <h2 class="section-title">INFO</h2>
          <div class="surface panel-stack">
            <div class="inline-stat"><span class="stat-label">RACE</span><span class="mono">${escapeHtml(character.race)}</span></div>
            <div class="inline-stat"><span class="stat-label">CLASS</span><span class="mono">${escapeHtml(character.class)}</span></div>
            <div class="inline-stat"><span class="stat-label">XP</span><span class="mono">${character.xp} / ${xpNext}</span></div>
            ${editing ? `<button class="button button--ghost" data-action="level-up">LEVEL UP</button>` : ''}
            ${editing ? `<div><label class="stat-label" for="character-icon">PORTRAIT</label><input id="character-icon" type="file" accept="image/*" data-action="upload-character-icon" /></div>` : ''}
          </div>
        </section>
      </div>

      <section class="section">
        <div class="section-header">
          <h2 class="section-title" style="margin:0">EQUIPMENT</h2>
          ${editing ? `<button class="button button--ghost" data-action="open-equipment-drawer" data-mode="character">${ICONS.create} ADD ITEM</button>` : ''}
        </div>
        ${renderEquipmentList(character.equipment, editing, 'character')}
      </section>
    </section>
  `;
}

function renderResourcesPage() {
  const resources = getResources();
  const allTags = [...new Set(resources.flatMap((resource) => resource.tags))];
  const filterTag = state.view.resourcesFilterTag;
  const filtered = filterTag === 'all' ? resources : resources.filter((resource) => resource.tags.includes(filterTag));
  const typeIcons = { map: '🗺', lore: '📜', rules: '📘', handout: '📄' };
  return `
    <section class="page-body">
      <div class="page-header">
        <div>
          <h1 class="page-title">CAMPAIGN RESOURCES</h1>
          <p class="kicker">${resources.length} ASSET${resources.length === 1 ? '' : 'S'} INDEXED</p>
        </div>
        <button class="button" data-action="toggle-resource-form">${state.view.resourcesAdding ? '✕ CANCEL' : `${ICONS.create} ADD RESOURCE`}</button>
      </div>

      ${allTags.length ? `<div class="filter-row" style="margin-bottom:1rem">
        <button class="filter-pill ${filterTag === 'all' ? 'is-active' : ''}" data-action="set-resource-filter" data-tag="all">ALL</button>
        ${allTags.map((tag) => `<button class="filter-pill ${filterTag === tag ? 'is-active' : ''}" data-action="set-resource-filter" data-tag="${escapeHtml(tag)}">🏷 ${escapeHtml(tag)}</button>`).join('')}
      </div>` : ''}

      ${state.view.resourcesAdding ? renderResourceForm() : ''}

      <div class="resource-list">
        ${filtered.map((resource) => `
          <article class="resource-card">
            <div class="resource-head">
              <div>
                <h3 class="name" style="font-size:0.95rem">${escapeHtml(resource.title)}</h3>
                <p class="helper-text">${escapeHtml(resource.description)}</p>
              </div>
              <button class="icon-button icon-button--danger" data-action="delete-resource" data-id="${resource.id}">✕</button>
            </div>
            <p class="resource-card__content">${escapeHtml(resource.content)}</p>
            <div class="filter-row" style="margin-top:0.75rem">
              ${resource.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
              <span class="type-pill" style="margin-left:auto">${typeIcons[resource.type] || '📄'} ${resource.type}</span>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderResourceForm() {
  const draft = state.view.resourceDraft || { title: '', description: '', content: '', type: 'rules', tags: '' };
  state.view.resourceDraft = draft;
  return `
    <div class="inline-form" style="margin-bottom:1rem">
      <div class="form-row">
        <div style="flex:2">
          <label class="stat-label" for="resource-title">TITLE</label>
          <input id="resource-title" name="title" value="${escapeHtml(draft.title)}" />
        </div>
        <div style="flex:1">
          <label class="stat-label" for="resource-type">TYPE</label>
          <select id="resource-type" name="type">
            ${['rules', 'lore', 'map', 'handout'].map((type) => `<option value="${type}" ${draft.type === type ? 'selected' : ''}>${type}</option>`).join('')}
          </select>
        </div>
      </div>
      <div>
        <label class="stat-label" for="resource-description">DESCRIPTION</label>
        <input id="resource-description" name="description" value="${escapeHtml(draft.description)}" />
      </div>
      <div>
        <label class="stat-label" for="resource-content">CONTENT</label>
        <textarea id="resource-content" name="content" rows="4">${escapeHtml(draft.content)}</textarea>
      </div>
      <div>
        <label class="stat-label" for="resource-tags">TAGS (comma separated)</label>
        <input id="resource-tags" name="tags" value="${escapeHtml(draft.tags)}" />
      </div>
      <button class="button button--primary" data-action="save-resource" ${draft.title.trim() ? '' : 'disabled'}>REGISTER RESOURCE</button>
    </div>
  `;
}

function renderDicePage() {
  const diceState = state.dicePage;
  return `
    <section class="page-body">
      <div class="page-header">
        <div>
          <h1 class="page-title">DICE ROLLER</h1>
          <p class="kicker">${diceState.history.length} ROLL${diceState.history.length === 1 ? '' : 'S'} THIS SESSION</p>
        </div>
      </div>

      <section class="section">
        <h2 class="section-title">QUICK ROLL</h2>
        <div class="quick-dice-grid">
          ${DICE.map((die) => `
            <button class="surface stat-card" data-action="quick-roll" data-sides="${die.sides}" type="button">
              <span class="dice-icon" style="font-size:1.8rem">${die.icon}</span>
              <span class="mono">${die.label}</span>
            </button>
          `).join('')}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">CUSTOM EXPRESSION</h2>
        <div class="surface panel-stack">
          <div class="form-row">
            <div style="flex:1">
              <label class="stat-label" for="dice-expression">EXPRESSION</label>
              <input id="dice-expression" value="${escapeHtml(diceState.expression)}" placeholder="2d6+3" />
            </div>
            <button class="button" data-action="roll-expression" ${diceState.rolling ? 'disabled' : ''}>${ICONS.dice} ROLL</button>
          </div>
          <div class="tab-row">
            ${['normal', 'advantage', 'disadvantage'].map((mode) => `<button class="tab-button ${diceState.advMode === mode ? 'is-active' : ''}" data-action="set-adv-mode" data-mode="${mode}">${mode}</button>`).join('')}
          </div>
        </div>
      </section>

      ${diceState.lastRoll ? renderDiceResult(diceState.lastRoll) : ''}

      ${diceState.history.length ? `
        <section class="section">
          <div class="history-header">
            <h2 class="section-title" style="margin:0">ROLL HISTORY</h2>
            <button class="button button--ghost" data-action="clear-dice-history">↺ CLEAR</button>
          </div>
          <div class="history-list">
            ${diceState.history.map((roll) => `
              <div class="surface history-row">
                <div>
                  <div class="mono">${escapeHtml(roll.expression)}</div>
                  ${roll.advantage ? `<div class="helper-text">${roll.advantage}</div>` : ''}
                </div>
                <div class="history-total">${roll.total}</div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}
    </section>
  `;
}

function renderDiceResult(result) {
  const crit = isCrit(result);
  const fumble = isFumble(result);
  return `
    <section class="section">
      <h2 class="section-title">RESULT</h2>
      <div class="result-panel ${crit ? 'is-crit' : fumble ? 'is-fumble' : ''}">
        <span class="result-number ${crit ? 'is-crit' : fumble ? 'is-fumble' : ''}">${result.total}</span>
        ${crit ? '<p class="page-title" style="font-size:0.9rem;color:var(--gold)">NATURAL 20! CRITICAL HIT!</p>' : ''}
        ${fumble ? '<p class="page-title" style="font-size:0.9rem;color:#ff7c7c">NATURAL 1! CRITICAL FAIL!</p>' : ''}
        <p class="helper-text">${escapeHtml(result.expression)}${result.rolls.length > 1 ? ` → [${result.rolls.map((roll) => roll.result).join(', ')}]` : ''}${result.modifier !== 0 ? ` ${result.modifier >= 0 ? '+' : ''}${result.modifier}` : ''}${result.advantage ? ` (${result.advantage})` : ''}</p>
      </div>
    </section>
  `;
}

function renderMapsPage(route) {
  const maps = getMaps();
  const activeMapId = route.match(/^\/maps\/([^/]+)$/)?.[1];
  if (activeMapId) {
    const map = maps.find((entry) => entry.id === decodeURIComponent(activeMapId));
    if (!map) return renderNotFoundPage('Map not found.');
    return renderMapDetailPage(map);
  }
  return `
    <section class="page-body">
      <div class="page-header">
        <div>
          <h1 class="page-title">CAMPAIGN MAPS</h1>
          <p class="kicker">${maps.length} MAP${maps.length === 1 ? '' : 'S'} UPLOADED</p>
        </div>
        <button class="button" data-action="toggle-map-upload">${state.view.mapsUploading ? '✕ CANCEL' : `${ICONS.create} UPLOAD MAP`}</button>
      </div>

      ${state.view.mapsUploading ? renderMapUploadPanel() : ''}

      ${maps.length === 0 ? `<div class="empty-state"><p class="empty-title">NO MAPS UPLOADED.</p><button class="button button--ghost" data-action="toggle-map-upload">UPLOAD YOUR FIRST MAP →</button></div>` : `
        <div class="map-grid">
          ${maps.map((map) => `
            <article class="map-card">
              <a href="#/maps/${encodeURIComponent(map.id)}">
                <img class="map-card-image" src="${map.image}" alt="${escapeHtml(map.name)}" />
              </a>
              <div class="map-card-footer">
                <div>
                  <h3 class="name" style="font-size:0.95rem">${escapeHtml(map.name)}</h3>
                  <p class="helper-text">${new Date(map.createdAt).toLocaleDateString()}</p>
                </div>
                <div class="inline-actions">
                  <a class="button button--ghost" href="#/maps/${encodeURIComponent(map.id)}">OPEN</a>
                  <button class="icon-button icon-button--danger" data-action="delete-map" data-id="${map.id}">✕</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      `}
    </section>
  `;
}

function renderMapUploadPanel() {
  return `
    <div class="inline-form" style="margin-bottom:1rem">
      <div>
        <label class="stat-label" for="map-name">MAP NAME</label>
        <input id="map-name" value="${escapeHtml(state.view.mapName || '')}" placeholder="Dungeon Level 1..." />
      </div>
      <div>
        <label class="stat-label">IMAGE (Max 5MB)</label>
        <input id="map-file" type="file" accept="image/*" />
      </div>
      ${state.view.mapPreview ? `<img class="map-upload-preview" src="${state.view.mapPreview}" alt="Map preview" />` : ''}
      <button class="button button--primary" data-action="save-map" ${(state.view.mapPreview && state.view.mapName.trim()) ? '' : 'disabled'}>UPLOAD MAP</button>
    </div>
  `;
}

function renderMapDetailPage(map) {
  const mapState = getMapViewState(map.id);
  const tokens = getMapTokens(map.id);
  const obstacles = getMapObstacles(map.id);
  const selectedToken = tokens.find((token) => token.id === mapState.selectedTokenId) || null;
  const currentTurnId = mapState.combatActive && mapState.initiativeEntries.length ? mapState.initiativeEntries[mapState.currentTurnIndex]?.tokenId : null;
  const currentTurnToken = tokens.find((token) => token.id === currentTurnId) || null;
  const viewerTokens = tokens.filter((token) => token.type === 'character');
  return `
    <section class="page-body">
      <div class="map-detail-header">
        <button class="button button--ghost" data-action="navigate" data-path="/maps">${ICONS.back} BACK</button>
        <div>
          <h1 class="page-title">${escapeHtml(map.name)}</h1>
          <p class="kicker">DM tools, player fog of war, initiative, token movement, and browser-only persistence</p>
        </div>
      </div>
      <div class="map-layout">
        <div class="map-stage">
          ${renderMapToolbar(map, mapState)}
          <div class="canvas-wrap ${mapState.obstacleTool === 'line' || mapState.obstacleTool === 'rect' || mapState.combatMoving ? 'is-crosshair' : ''}" data-map-wrap="${map.id}">
            <div class="canvas-scene" id="canvas-scene" style="transform:translate(${mapState.panX}px, ${mapState.panY}px) scale(${mapState.zoom})">
              <img class="canvas-map" id="map-image" src="${map.image}" alt="${escapeHtml(map.name)}" />
              <svg class="grid-overlay" id="grid-overlay"></svg>
              <svg class="obstacle-overlay" id="obstacle-overlay"></svg>
              <div class="fog-overlay" id="fog-overlay"></div>
              <div class="token-layer" id="token-layer">
                ${tokens.map((token) => renderTokenNode(token, mapState, viewerTokens, obstacles, currentTurnId)).join('')}
              </div>
            </div>
          </div>
          ${tokens.length ? `<div class="token-strip">${tokens.map((token) => renderTokenStrip(token, mapState.selectedTokenId)).join('')}</div>` : ''}
        </div>
        <aside class="map-sidebar">
          ${renderInitiativePanel(map.id, tokens, mapState, currentTurnId)}
          ${mapState.combatActive && currentTurnToken ? renderCombatPanel(map.id, currentTurnToken, tokens, mapState) : ''}
          ${state.role === 'dm' && selectedToken && selectedToken.type === 'character' ? renderVisionPanel(map.id, selectedToken, mapState) : ''}
          ${state.role === 'dm' ? renderObstacleInfo(obstacles) : ''}
        </aside>
      </div>
    </section>
  `;
}

function renderMapToolbar(map, mapState) {
  const characters = getCharacters();
  return `
    <div class="toolbar">
      <div class="toolbar-group">
        <button class="toolbar-button" data-action="map-zoom" data-map-id="${map.id}" data-step="0.2">${ICONS.zoomIn} Zoom</button>
        <button class="toolbar-button" data-action="map-zoom" data-map-id="${map.id}" data-step="-0.2">${ICONS.zoomOut} Zoom</button>
        <button class="toolbar-button" data-action="map-reset-view" data-map-id="${map.id}">${ICONS.reset} Reset</button>
        <span class="toolbar-note">${Math.round(mapState.zoom * 100)}%</span>
      </div>
      <div class="toolbar-group">
        <button class="toolbar-button ${mapState.showGrid ? 'is-active' : ''}" data-action="toggle-map-grid" data-map-id="${map.id}">${ICONS.grid} Grid</button>
        ${mapState.showGrid ? `<button class="toolbar-button" data-action="adjust-grid-size" data-map-id="${map.id}" data-step="-5">−</button><span class="toolbar-note">${mapState.gridSize}px</span><button class="toolbar-button" data-action="adjust-grid-size" data-map-id="${map.id}" data-step="5">+</button>` : ''}
        ${state.role === 'dm' && mapState.showGrid ? `<button class="toolbar-button" data-action="adjust-ft-per-cell" data-map-id="${map.id}" data-step="-5">− ft</button><span class="toolbar-note">${mapState.ftPerCell}ft</span><button class="toolbar-button" data-action="adjust-ft-per-cell" data-map-id="${map.id}" data-step="5">+ ft</button>` : ''}
      </div>
      ${state.role === 'dm' ? `
        <div class="toolbar-group">
          <button class="toolbar-button ${mapState.obstacleTool === 'select' ? 'is-active' : ''}" data-action="set-obstacle-tool" data-map-id="${map.id}" data-tool="select">${ICONS.pointer}</button>
          <button class="toolbar-button ${mapState.obstacleTool === 'line' ? 'is-active' : ''}" data-action="set-obstacle-tool" data-map-id="${map.id}" data-tool="line">${ICONS.line}</button>
          <button class="toolbar-button ${mapState.obstacleTool === 'rect' ? 'is-active' : ''}" data-action="set-obstacle-tool" data-map-id="${map.id}" data-tool="rect">${ICONS.rect}</button>
          <button class="toolbar-button ${mapState.showPlayerPreview ? 'is-active' : ''}" data-action="toggle-player-preview" data-map-id="${map.id}">${ICONS.player} Player View</button>
        </div>
        <div class="toolbar-group" style="margin-left:auto;position:relative">
          <button class="toolbar-button" data-action="toggle-add-token-menu" data-map-id="${map.id}">${ICONS.create} Token</button>
          ${mapState.showAddMenu ? renderAddTokenMenu(map.id, characters) : ''}
        </div>
      ` : '<div style="margin-left:auto"></div>'}
    </div>
  `;
}

function renderAddTokenMenu(mapId, characters) {
  return `
    <div class="add-menu" style="position:absolute;right:0;top:calc(100% + 0.35rem);width:220px;padding:0.5rem;z-index:40">
      <div class="section-title" style="margin-bottom:0.35rem">CHARACTERS</div>
      ${characters.length ? characters.map((character) => `<button class="list-button" style="width:100%;text-align:left;margin-bottom:0.25rem" data-action="add-character-token" data-map-id="${mapId}" data-character-id="${character.id}">${character.icon ? '' : '● '} ${escapeHtml(character.name)}</button>`).join('') : '<div class="helper-text">No characters</div>'}
      <div class="section-title" style="margin:0.5rem 0 0.35rem">MONSTERS</div>
      ${MONSTER_PRESETS.map((preset) => `<button class="list-button" style="width:100%;text-align:left;margin-bottom:0.25rem" data-action="add-monster-token" data-map-id="${mapId}" data-monster-label="${preset.label}">${escapeHtml(preset.label)}</button>`).join('')}
    </div>
  `;
}

function renderTokenNode(token, mapState, viewers, obstacles, currentTurnId) {
  if (!isTokenVisible(token, viewers, obstacles, mapState)) return '';
  return `
    <div class="token-node ${token.id === mapState.selectedTokenId ? 'is-selected' : ''} ${token.id === currentTurnId ? 'is-current' : ''}" data-token-id="${token.id}" style="left:${token.x}px;top:${token.y}px">
      ${token.icon ? `<img class="token" style="border-color:${token.color}" src="${token.icon}" alt="${escapeHtml(token.label)}" />` : `<div class="token" style="background:${token.color}">${escapeHtml(token.label.slice(0, 2).toUpperCase())}</div>`}
      ${token.hp !== undefined && token.maxHp !== undefined ? `<div class="token-health"><span style="width:${percent(token.hp, token.maxHp)}%;background:${hslHealthColor(token.hp, token.maxHp)}"></span></div>` : ''}
      <div class="token-label">${escapeHtml(token.label)}</div>
      ${state.role === 'dm' ? `<button class="icon-button icon-button--small delete-token" data-action="remove-token" data-token-id="${token.id}">✕</button>` : ''}
    </div>
  `;
}

function renderTokenStrip(token, selectedTokenId) {
  return `
    <button class="token-pill ${token.id === selectedTokenId ? 'is-selected' : ''}" data-action="select-token" data-token-id="${token.id}">
      <span class="color-dot" style="background:${token.color}"></span>
      <span class="mono">${escapeHtml(token.label)}</span>
      ${token.hp !== undefined ? `<span class="helper-text">(${token.hp}HP)</span>` : ''}
    </button>
  `;
}

function renderInitiativePanel(mapId, tokens, mapState, currentTurnId) {
  return `
    <div class="sidebar-panel">
      <div class="section-header">
        <h2 class="section-title" style="margin:0">INITIATIVE</h2>
        ${state.role === 'dm' ? `
          <div class="inline-actions">
            ${!mapState.combatActive ? `<button class="button button--ghost" data-action="roll-initiative" data-map-id="${mapId}">▶ Roll</button>${mapState.initiativeEntries.length ? `<button class="button button--secondary" data-action="start-combat" data-map-id="${mapId}">⚔ Start</button>` : ''}` : `<button class="button button--ghost" data-action="next-turn" data-map-id="${mapId}">» Next</button><button class="button button--ghost" data-action="reset-combat" data-map-id="${mapId}">↺</button>`}
          </div>
        ` : ''}
      </div>
      ${tokens.length === 0 ? '<p class="helper-text">Add tokens to roll initiative.</p>' : ''}
      <div class="initiative-list">
        ${mapState.initiativeEntries.map((entry, index) => `
          <div class="initiative-row ${mapState.combatActive && entry.tokenId === currentTurnId ? 'is-current' : ''}">
            <div class="row-between">
              <span class="mono">${index + 1}. ${escapeHtml(entry.label)}</span>
              <span class="mono">${entry.total}</span>
            </div>
            <div class="helper-text">(${entry.roll}${entry.modifier >= 0 ? '+' : ''}${entry.modifier})</div>
          </div>
        `).join('') || '<p class="helper-text">Click Roll to begin.</p>'}
      </div>
    </div>
  `;
}

function renderCombatPanel(mapId, token, allTokens, mapState) {
  const characters = getCharacters();
  const character = characters.find((entry) => entry.name === token.label);
  const maxMovement = character?.speed || 30;
  const remaining = Math.max(0, maxMovement - mapState.combatMovementUsed);
  const availableWeapons = character && getEquippedWeapons(character).length
    ? getEquippedWeapons(character)
    : [{ id: 'unarmed', name: 'Unarmed Strike', category: 'weapon', damageDie: 1, attackBonus: 0, damageBonus: 0, properties: [] }];
  const selectedWeaponId = mapState.lastAttackState.selectedWeaponId || availableWeapons[0]?.id;
  const enemies = allTokens.filter((entry) => entry.id !== token.id && entry.type !== token.type);
  const weaponOptions = availableWeapons.map((weapon) => `<option value="${weapon.id}" ${selectedWeaponId === weapon.id ? 'selected' : ''}>${escapeHtml(weapon.name)} · 1d${weapon.damageDie || 1}${(weapon.damageBonus || 0) > 0 ? `+${weapon.damageBonus}` : ''}</option>`).join('');
  return `
    <div class="sidebar-panel">
      <div class="section-header">
        <h2 class="section-title" style="margin:0">${escapeHtml(token.label)}'S TURN</h2>
      </div>
      <div class="notice">
        <div class="inline-stat"><span class="stat-label">Movement</span><span class="mono">${remaining}ft / ${maxMovement}ft</span></div>
        <div class="progress-track" style="margin-top:0.35rem"><div class="progress-fill" style="width:${Math.max(0, (remaining / maxMovement) * 100)}%;background:var(--secondary)"></div></div>
      </div>
      <div class="combat-actions">
        <button class="button ${mapState.combatMoving ? 'button--secondary' : ''}" data-action="toggle-combat-move" data-map-id="${mapId}" ${remaining <= 0 ? 'disabled' : ''}>${ICONS.move} ${mapState.combatMoving ? 'Click map to move' : `Move (${remaining}ft left)`}</button>
        <button class="button" data-action="end-turn" data-map-id="${mapId}">${ICONS.next} End Turn</button>
      </div>
      <div>
        <label class="stat-label" for="combat-weapon">WEAPON</label>
        <select id="combat-weapon" data-map-id="${mapId}" data-action="select-combat-weapon">${weaponOptions}</select>
      </div>
      <div>
        <label class="stat-label" for="combat-target">TARGET</label>
        <select id="combat-target" data-map-id="${mapId}">${enemies.map((enemy) => `<option value="${enemy.id}">${escapeHtml(enemy.label)}${enemy.hp !== undefined ? ` · ${enemy.hp}HP` : ''}</option>`).join('')}</select>
      </div>
      <button class="button button--primary" data-action="perform-attack" data-map-id="${mapId}" ${mapState.lastAttackState.hasAttacked || enemies.length === 0 ? 'disabled' : ''}>${ICONS.attack} ${mapState.lastAttackState.hasAttacked ? 'Already attacked' : 'Attack'}</button>
      ${mapState.lastCombatResult ? renderCombatResult(mapState.lastCombatResult) : ''}
    </div>
  `;
}

function renderCombatResult(result) {
  return `
    <div class="combat-result">
      <div class="mono" style="color:${result.hit ? 'var(--secondary)' : 'var(--accent)'}">${result.natural20 ? 'CRITICAL HIT!' : result.natural1 ? 'CRITICAL MISS!' : result.hit ? 'HIT!' : 'MISS!'}</div>
      <div class="helper-text">${escapeHtml(result.weaponName)}: ${result.attackRoll} vs AC ${result.targetAC} (${escapeHtml(result.targetName)})</div>
      ${result.hit ? `<div class="mono">${result.damageRoll} damage${result.natural20 ? ' (crit!)' : ''}</div>` : ''}
    </div>
  `;
}

function renderVisionPanel(mapId, token, mapState) {
  const radiusCells = Math.round((token.visionRadius ?? mapState.gridSize * 12) / mapState.gridSize);
  return `
    <div class="sidebar-panel">
      <h2 class="section-title">VISION — ${escapeHtml(token.label)}</h2>
      <div class="inline-actions">
        <button class="icon-button" data-action="adjust-token-vision" data-map-id="${mapId}" data-token-id="${token.id}" data-step="-2">−</button>
        <span class="mono">${radiusCells * mapState.ftPerCell}ft</span>
        <button class="icon-button" data-action="adjust-token-vision" data-map-id="${mapId}" data-token-id="${token.id}" data-step="2">+</button>
      </div>
    </div>
  `;
}

function renderObstacleInfo(obstacles) {
  return `
    <div class="sidebar-panel">
      <h2 class="section-title">OBSTACLES</h2>
      <p class="helper-text">${obstacles.length} obstacle${obstacles.length === 1 ? '' : 's'} · ${obstacles.filter((obstacle) => obstacle.blocksVision).length} vision · ${obstacles.filter((obstacle) => obstacle.blocksMovement).length} movement</p>
      ${obstacles.length ? '<p class="helper-text">Select an obstacle on the map to toggle vision or movement blocking.</p>' : ''}
    </div>
  `;
}

function renderNotFoundPage(message = 'Oops! Page not found.') {
  return `
    <section class="page-body">
      <div class="empty-state">
        <p class="big-number">404</p>
        <p class="empty-title">${escapeHtml(message)}</p>
        <a class="button action-link" href="#/">Return to Home</a>
      </div>
    </section>
  `;
}

function renderDrawer() {
  if (!state.drawer) return '';
  if (state.drawer.type === 'equipment') {
    const { mode, search = '', filter = 'all' } = state.drawer;
    const filtered = EQUIPMENT_CATALOG.filter((item) => {
      const searchMatch = item.name.toLowerCase().includes(search.toLowerCase());
      const filterMatch = filter === 'all' || item.category === filter;
      return searchMatch && filterMatch;
    });
    return `
      <div class="drawer-backdrop" data-action="close-drawer"></div>
      <aside class="drawer">
        <div class="drawer-header">
          <div class="section-title" style="margin:0">EQUIPMENT CATALOG</div>
          <button class="icon-button" data-action="close-drawer">✕</button>
        </div>
        <div class="drawer-body">
          <div class="search-row"><span>⌕</span><input id="equipment-search" value="${escapeHtml(search)}" placeholder="Search equipment..." /></div>
          <div class="filter-row">
            ${['all', 'weapon', 'armor', 'gear', 'consumable'].map((category) => `<button class="filter-pill ${filter === category ? 'is-active' : ''}" data-action="equipment-filter" data-filter="${category}">${category}</button>`).join('')}
          </div>
          ${filtered.map((item, index) => `
            <button class="equipment-entry" data-action="add-equipment-item" data-mode="${mode}" data-index="${index}" data-name="${escapeHtml(item.name)}">
              <span>${ICONS.create}</span>
              <div class="item-main">
                <div class="mono">${escapeHtml(item.name)}</div>
                <div class="item-meta">${item.category} · ${item.weight} lb</div>
              </div>
            </button>
          `).join('') || '<p class="helper-text">No items match the current filter.</p>'}
        </div>
      </aside>
    `;
  }
  return '';
}

function renderDiceFab() {
  const result = state.fabResult;
  return `
    <div class="fab-stack">
      ${result ? `<div class="floating-toast ${isCrit(result) ? 'is-crit' : isFumble(result) ? 'is-fumble' : ''}"><div class="big-number" style="font-size:1.8rem;color:${isCrit(result) ? 'var(--gold)' : isFumble(result) ? '#ff7c7c' : 'var(--foreground)'}">${result.total}</div><div class="helper-text">${escapeHtml(result.expression)}</div></div>` : ''}
      ${state.diceFabOpen ? `<div class="fab-menu">${DICE.filter((die) => die.sides !== 100).map((die) => `<button class="surface stat-card" style="width:3rem;height:3rem;padding:0.3rem" data-action="fab-roll" data-sides="${die.sides}"><span>${die.icon}</span><span class="helper-text">${die.label}</span></button>`).join('')}</div>` : ''}
      <button class="fab" data-action="toggle-fab">${state.diceFabOpen ? '✕' : ICONS.dice}</button>
    </div>
  `;
}

function render() {
  const activeElement = document.activeElement;
  const focusSnapshot = activeElement && activeElement.id ? {
    id: activeElement.id,
    start: typeof activeElement.selectionStart === 'number' ? activeElement.selectionStart : null,
    end: typeof activeElement.selectionEnd === 'number' ? activeElement.selectionEnd : null,
  } : null;
  const route = getRoute();
  let pageHtml = '';
  if (route === ROUTES.roster) pageHtml = renderRosterPage();
  else if (route === ROUTES.create) pageHtml = renderCreatePage();
  else if (route.startsWith('/character/')) pageHtml = renderCharacterPage(activeCharacterIdFromRoute(route));
  else if (route === ROUTES.resources) pageHtml = renderResourcesPage();
  else if (route === ROUTES.dice) pageHtml = renderDicePage();
  else if (route === ROUTES.maps || route.startsWith('/maps/')) pageHtml = renderMapsPage(route);
  else pageHtml = renderNotFoundPage();

  app.innerHTML = `
    <div class="app-shell">
      ${renderSidebar(route)}
      <div class="page">
        ${renderMobileNav(route)}
        ${pageHtml}
      </div>
    </div>
    ${renderDrawer()}
    ${renderDiceFab()}
  `;
  bindPageHandlers(route);
  if (focusSnapshot) {
    const next = document.getElementById(focusSnapshot.id);
    if (next) {
      next.focus();
      if (focusSnapshot.start !== null && typeof next.setSelectionRange === 'function') {
        next.setSelectionRange(focusSnapshot.start, focusSnapshot.end ?? focusSnapshot.start);
      }
    }
  }
}

function bindPageHandlers(route) {
  bindCommonHandlers();
  if (route === ROUTES.create) bindCreateHandlers();
  if (route.startsWith('/character/')) bindCharacterHandlers(activeCharacterIdFromRoute(route));
  if (route === ROUTES.resources) bindResourceHandlers();
  if (route === ROUTES.dice) bindDiceHandlers();
  if (route === ROUTES.maps) bindMapsHandlers();
  if (route.startsWith('/maps/')) bindMapDetailHandlers(route.match(/^\/maps\/([^/]+)$/)?.[1]);
  if (state.drawer?.type === 'equipment') bindDrawerHandlers();
}

function bindCommonHandlers() {
  app.querySelectorAll('[data-action="toggle-role"]').forEach((button) => {
    button.addEventListener('click', () => {
      saveRole(state.role === 'dm' ? 'player' : 'dm');
      render();
    });
  });
  app.querySelectorAll('[data-action="toggle-mobile-menu"]').forEach((button) => {
    button.addEventListener('click', () => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
      render();
    });
  });
  app.querySelectorAll('[data-action="close-mobile-menu"]').forEach((anchor) => {
    anchor.addEventListener('click', () => {
      state.mobileMenuOpen = false;
    });
  });
  app.querySelectorAll('[data-action="navigate"]').forEach((button) => {
    button.addEventListener('click', () => navigate(button.dataset.path));
  });
  app.querySelectorAll('[data-action="toggle-fab"]').forEach((button) => {
    button.addEventListener('click', () => {
      state.diceFabOpen = !state.diceFabOpen;
      render();
    });
  });
  app.querySelectorAll('[data-action="fab-roll"]').forEach((button) => {
    button.addEventListener('click', () => {
      const result = quickRoll(Number(button.dataset.sides));
      state.fabResult = result;
      render();
      clearTimeout(state.fabResultTimeout);
      state.fabResultTimeout = setTimeout(() => {
        state.fabResult = null;
        render();
      }, 2000);
    });
  });
  document.querySelectorAll('[data-action="close-drawer"]').forEach((node) => {
    node.addEventListener('click', () => {
      state.drawer = null;
      render();
    });
  });
}

function bindCreateHandlers() {
  const form = document.getElementById('create-character-form');
  const draft = state.view.createDraft;
  document.getElementById('create-name')?.addEventListener('input', (event) => {
    draft.name = event.target.value;
    render();
  });
  document.getElementById('create-race')?.addEventListener('change', (event) => {
    draft.race = event.target.value;
    render();
  });
  document.getElementById('create-class')?.addEventListener('change', (event) => {
    draft.dndClass = event.target.value;
    render();
  });
  app.querySelectorAll('[data-action="adjust-create-level"]').forEach((button) => {
    button.addEventListener('click', () => {
      draft.level = Math.max(1, Math.min(20, draft.level + Number(button.dataset.step)));
      render();
    });
  });
  app.querySelectorAll('[data-action="create-ability"]').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      const step = Number(button.dataset.step);
      draft.abilities[index].score = Math.max(1, Math.min(20, draft.abilities[index].score + step));
      render();
    });
  });
  app.querySelectorAll('[data-action="open-equipment-drawer"]').forEach((button) => {
    button.addEventListener('click', () => openEquipmentDrawer(button.dataset.mode));
  });
  app.querySelectorAll('[data-action="toggle-equip"]').forEach((button) => {
    button.addEventListener('click', () => {
      draft.equipment = draft.equipment.map((item) => item.id === button.dataset.id ? { ...item, equipped: !item.equipped } : item);
      render();
    });
  });
  app.querySelectorAll('[data-action="remove-equipment"]').forEach((button) => {
    button.addEventListener('click', () => {
      draft.equipment = draft.equipment.filter((item) => item.id !== button.dataset.id);
      render();
    });
  });
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!draft.name.trim()) return;
    const conMod = getModifier(draft.abilities.find((ability) => ability.name === 'CON')?.score ?? 10);
    const hitDie = CLASS_HIT_DIE[draft.dndClass];
    const maxHp = Math.max(1, hitDie + conMod + (draft.level - 1) * (Math.floor(hitDie / 2) + 1 + conMod));
    const character = {
      id: uid('char'),
      name: draft.name.trim(),
      race: draft.race,
      class: draft.dndClass,
      level: draft.level,
      xp: 0,
      hp: maxHp,
      maxHp,
      ac: 10 + getModifier(draft.abilities.find((ability) => ability.name === 'DEX')?.score ?? 10),
      speed: 30,
      abilities: draft.abilities.map((ability) => ({ ...ability })),
      equipment: draft.equipment.map((item) => ({ ...item })),
      createdAt: new Date().toISOString(),
    };
    const characters = getCharacters();
    characters.push(character);
    saveCharacters(characters);
    state.view.createDraft = null;
    navigate(`/character/${encodeURIComponent(character.id)}`);
  });
}

function bindCharacterHandlers(characterId) {
  const characters = getCharacters();
  const character = characters.find((entry) => entry.id === characterId);
  if (!character) return;
  app.querySelectorAll('[data-action="toggle-character-edit"]').forEach((button) => {
    button.addEventListener('click', () => {
      state.view.characterEditing = !state.view.characterEditing;
      render();
    });
  });
  app.querySelectorAll('[data-action="delete-character"]').forEach((button) => {
    button.addEventListener('click', () => {
      saveCharacters(getCharacters().filter((entry) => entry.id !== button.dataset.id));
      navigate('/');
    });
  });
  app.querySelectorAll('[data-action="character-ability"]').forEach((button) => {
    button.addEventListener('click', () => {
      const currentCharacters = getCharacters();
      const current = currentCharacters.find((entry) => entry.id === characterId);
      if (!current) return;
      const index = Number(button.dataset.index);
      const step = Number(button.dataset.step);
      current.abilities[index].score = Math.max(1, Math.min(20, current.abilities[index].score + step));
      current.ac = getEquippedAC(current);
      saveCharacters(currentCharacters);
      render();
    });
  });
  app.querySelectorAll('[data-action="adjust-hp"]').forEach((button) => {
    button.addEventListener('click', () => {
      const currentCharacters = getCharacters();
      const current = currentCharacters.find((entry) => entry.id === characterId);
      if (!current) return;
      const step = Number(button.dataset.step);
      current.hp = step > 0 ? Math.min(current.maxHp, current.hp + 1) : Math.max(0, current.hp - 1);
      saveCharacters(currentCharacters);
      render();
    });
  });
  app.querySelectorAll('[data-action="level-up"]').forEach((button) => {
    button.addEventListener('click', () => {
      const currentCharacters = getCharacters();
      const current = currentCharacters.find((entry) => entry.id === characterId);
      if (!current) return;
      current.level = Math.min(20, current.level + 1);
      saveCharacters(currentCharacters);
      render();
    });
  });
  app.querySelectorAll('[data-action="open-equipment-drawer"]').forEach((button) => {
    button.addEventListener('click', () => openEquipmentDrawer(button.dataset.mode));
  });
  app.querySelectorAll('[data-action="toggle-equip"]').forEach((button) => {
    button.addEventListener('click', () => {
      const currentCharacters = getCharacters();
      const current = currentCharacters.find((entry) => entry.id === characterId);
      if (!current) return;
      current.equipment = current.equipment.map((item) => item.id === button.dataset.id ? { ...item, equipped: !item.equipped } : item);
      current.ac = getEquippedAC(current);
      saveCharacters(currentCharacters);
      render();
    });
  });
  app.querySelectorAll('[data-action="remove-equipment"]').forEach((button) => {
    button.addEventListener('click', () => {
      const currentCharacters = getCharacters();
      const current = currentCharacters.find((entry) => entry.id === characterId);
      if (!current) return;
      current.equipment = current.equipment.filter((item) => item.id !== button.dataset.id);
      current.ac = getEquippedAC(current);
      saveCharacters(currentCharacters);
      render();
    });
  });
  document.getElementById('character-icon')?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Max 2MB');
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    const currentCharacters = getCharacters();
    const current = currentCharacters.find((entry) => entry.id === characterId);
    if (!current) return;
    current.icon = dataUrl;
    saveCharacters(currentCharacters);
    render();
  });
}

function bindResourceHandlers() {
  const draft = state.view.resourceDraft || { title: '', description: '', content: '', type: 'rules', tags: '' };
  app.querySelectorAll('[data-action="toggle-resource-form"]').forEach((button) => {
    button.addEventListener('click', () => {
      state.view.resourcesAdding = !state.view.resourcesAdding;
      if (state.view.resourcesAdding && !state.view.resourceDraft) state.view.resourceDraft = { title: '', description: '', content: '', type: 'rules', tags: '' };
      render();
    });
  });
  app.querySelectorAll('[data-action="set-resource-filter"]').forEach((button) => {
    button.addEventListener('click', () => {
      state.view.resourcesFilterTag = button.dataset.tag;
      render();
    });
  });
  document.getElementById('resource-title')?.addEventListener('input', (event) => {
    draft.title = event.target.value;
    render();
  });
  document.getElementById('resource-description')?.addEventListener('input', (event) => {
    draft.description = event.target.value;
    render();
  });
  document.getElementById('resource-content')?.addEventListener('input', (event) => {
    draft.content = event.target.value;
    render();
  });
  document.getElementById('resource-type')?.addEventListener('change', (event) => {
    draft.type = event.target.value;
    render();
  });
  document.getElementById('resource-tags')?.addEventListener('input', (event) => {
    draft.tags = event.target.value;
    render();
  });
  app.querySelectorAll('[data-action="save-resource"]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!draft.title.trim()) return;
      const resources = getResources();
      resources.push({
        id: uid('res'),
        title: draft.title.trim(),
        description: draft.description.trim(),
        content: draft.content.trim(),
        type: draft.type,
        tags: draft.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        createdAt: new Date().toISOString(),
      });
      saveResources(resources);
      state.view.resourceDraft = { title: '', description: '', content: '', type: 'rules', tags: '' };
      state.view.resourcesAdding = false;
      render();
    });
  });
  app.querySelectorAll('[data-action="delete-resource"]').forEach((button) => {
    button.addEventListener('click', () => {
      saveResources(getResources().filter((resource) => resource.id !== button.dataset.id));
      render();
    });
  });
}

function bindDiceHandlers() {
  const diceState = state.dicePage;
  document.getElementById('dice-expression')?.addEventListener('input', (event) => {
    diceState.expression = event.target.value;
  });
  document.getElementById('dice-expression')?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      performPageRoll();
    }
  });
  app.querySelectorAll('[data-action="quick-roll"]').forEach((button) => button.addEventListener('click', () => performQuickPageRoll(Number(button.dataset.sides))));
  app.querySelectorAll('[data-action="roll-expression"]').forEach((button) => button.addEventListener('click', performPageRoll));
  app.querySelectorAll('[data-action="set-adv-mode"]').forEach((button) => button.addEventListener('click', () => {
    diceState.advMode = button.dataset.mode;
    render();
  }));
  app.querySelectorAll('[data-action="clear-dice-history"]').forEach((button) => button.addEventListener('click', () => {
    diceState.history = [];
    diceState.lastRoll = null;
    render();
  }));
}

function performPageRoll() {
  const diceState = state.dicePage;
  const adv = diceState.advMode === 'normal' ? undefined : diceState.advMode;
  const result = rollExpression(diceState.expression, adv);
  if (!result) return;
  diceState.lastRoll = result;
  diceState.history = [result, ...diceState.history].slice(0, 50);
  render();
}

function performQuickPageRoll(sides) {
  const diceState = state.dicePage;
  const result = quickRoll(sides);
  diceState.lastRoll = result;
  diceState.history = [result, ...diceState.history].slice(0, 50);
  render();
}

function bindMapsHandlers() {
  app.querySelectorAll('[data-action="toggle-map-upload"]').forEach((button) => {
    button.addEventListener('click', () => {
      state.view.mapsUploading = !state.view.mapsUploading;
      if (!state.view.mapsUploading) {
        state.view.mapName = '';
        state.view.mapPreview = '';
      }
      render();
    });
  });
  document.getElementById('map-name')?.addEventListener('input', (event) => {
    state.view.mapName = event.target.value;
    render();
  });
  document.getElementById('map-file')?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Max file size is 5MB');
      return;
    }
    state.view.mapPreview = await fileToDataUrl(file);
    if (!state.view.mapName) state.view.mapName = file.name.replace(/\.[^.]+$/, '');
    render();
  });
  app.querySelectorAll('[data-action="save-map"]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!state.view.mapPreview || !state.view.mapName.trim()) return;
      const maps = getMaps();
      maps.push({ id: uid('map'), name: state.view.mapName.trim(), image: state.view.mapPreview, createdAt: new Date().toISOString() });
      saveMaps(maps);
      state.view.mapsUploading = false;
      state.view.mapName = '';
      state.view.mapPreview = '';
      render();
    });
  });
  app.querySelectorAll('[data-action="delete-map"]').forEach((button) => {
    button.addEventListener('click', () => {
      const mapId = button.dataset.id;
      saveMaps(getMaps().filter((map) => map.id !== mapId));
      localStorage.removeItem(`map-tokens-${mapId}`);
      localStorage.removeItem(`map-obstacles-${mapId}`);
      delete state.mapUi[mapId];
      render();
    });
  });
}

function bindMapDetailHandlers(rawMapId) {
  const mapId = decodeURIComponent(rawMapId);
  const mapState = getMapViewState(mapId);
  const wrap = document.querySelector('[data-map-wrap]');
  const image = document.getElementById('map-image');
  if (image) {
    image.addEventListener('load', () => {
      mapState.imgWidth = image.naturalWidth || image.clientWidth || mapState.imgWidth;
      mapState.imgHeight = image.naturalHeight || image.clientHeight || mapState.imgHeight;
      drawMapOverlays(mapId);
    });
    if (image.complete) {
      mapState.imgWidth = image.naturalWidth || image.clientWidth || mapState.imgWidth;
      mapState.imgHeight = image.naturalHeight || image.clientHeight || mapState.imgHeight;
      drawMapOverlays(mapId);
    }
  }
  drawMapOverlays(mapId);

  app.querySelectorAll('[data-action="map-zoom"]').forEach((button) => button.addEventListener('click', () => {
    mapState.zoom = clamp(mapState.zoom + Number(button.dataset.step), 0.2, 5);
    render();
  }));
  app.querySelectorAll('[data-action="map-reset-view"]').forEach((button) => button.addEventListener('click', () => {
    mapState.zoom = 1;
    mapState.panX = 0;
    mapState.panY = 0;
    render();
  }));
  app.querySelectorAll('[data-action="toggle-map-grid"]').forEach((button) => button.addEventListener('click', () => {
    mapState.showGrid = !mapState.showGrid;
    render();
  }));
  app.querySelectorAll('[data-action="adjust-grid-size"]').forEach((button) => button.addEventListener('click', () => {
    mapState.gridSize = clamp(mapState.gridSize + Number(button.dataset.step), 20, 100);
    render();
  }));
  app.querySelectorAll('[data-action="adjust-ft-per-cell"]').forEach((button) => button.addEventListener('click', () => {
    mapState.ftPerCell = clamp(mapState.ftPerCell + Number(button.dataset.step), 5, 30);
    render();
  }));
  app.querySelectorAll('[data-action="set-obstacle-tool"]').forEach((button) => button.addEventListener('click', () => {
    mapState.obstacleTool = mapState.obstacleTool === button.dataset.tool ? null : button.dataset.tool;
    render();
  }));
  app.querySelectorAll('[data-action="toggle-player-preview"]').forEach((button) => button.addEventListener('click', () => {
    mapState.showPlayerPreview = !mapState.showPlayerPreview;
    render();
  }));
  app.querySelectorAll('[data-action="toggle-add-token-menu"]').forEach((button) => button.addEventListener('click', () => {
    mapState.showAddMenu = !mapState.showAddMenu;
    render();
  }));
  app.querySelectorAll('[data-action="add-character-token"]').forEach((button) => button.addEventListener('click', () => {
    const character = getCharacters().find((entry) => entry.id === button.dataset.characterId);
    if (!character) return;
    const tokens = getMapTokens(mapId);
    tokens.push({
      id: uid('token'),
      label: character.name,
      x: 200 + Math.random() * 100,
      y: 200 + Math.random() * 100,
      color: 'hsl(217, 91%, 60%)',
      icon: character.icon,
      type: 'character',
      hp: character.hp,
      maxHp: character.maxHp,
      visionRadius: mapState.gridSize * 12,
    });
    saveMapTokens(mapId, tokens);
    mapState.showAddMenu = false;
    render();
  }));
  app.querySelectorAll('[data-action="add-monster-token"]').forEach((button) => button.addEventListener('click', () => {
    const preset = MONSTER_PRESETS.find((entry) => entry.label === button.dataset.monsterLabel);
    if (!preset) return;
    const tokens = getMapTokens(mapId);
    tokens.push({ id: uid('token'), label: preset.label, x: 200 + Math.random() * 100, y: 200 + Math.random() * 100, color: preset.color, type: 'monster', hp: preset.hp, maxHp: preset.hp });
    saveMapTokens(mapId, tokens);
    mapState.showAddMenu = false;
    render();
  }));
  app.querySelectorAll('[data-action="remove-token"]').forEach((button) => button.addEventListener('click', (event) => {
    event.stopPropagation();
    saveMapTokens(mapId, getMapTokens(mapId).filter((token) => token.id !== button.dataset.tokenId));
    if (mapState.selectedTokenId === button.dataset.tokenId) mapState.selectedTokenId = null;
    render();
  }));
  app.querySelectorAll('[data-action="select-token"]').forEach((button) => button.addEventListener('click', () => {
    mapState.selectedTokenId = button.dataset.tokenId;
    render();
  }));
  app.querySelectorAll('.token-node').forEach((node) => {
    node.addEventListener('pointerdown', (event) => tokenPointerDown(event, mapId, node.dataset.tokenId));
    node.addEventListener('click', (event) => {
      event.stopPropagation();
      mapState.selectedTokenId = node.dataset.tokenId;
      render();
    });
  });
  app.querySelectorAll('[data-action="roll-initiative"]').forEach((button) => button.addEventListener('click', () => {
    const tokens = getMapTokens(mapId);
    const characters = getCharacters();
    mapState.initiativeEntries = tokens.map((token) => {
      const roll = Math.floor(Math.random() * 20) + 1;
      let modifier = 0;
      if (token.type === 'character') {
        const character = characters.find((entry) => entry.name === token.label);
        modifier = character ? getModifier(character.abilities.find((ability) => ability.name === 'DEX')?.score ?? 10) : 0;
      } else {
        modifier = Math.floor(Math.random() * 5) - 1;
      }
      return { tokenId: token.id, label: token.label, roll, modifier, total: roll + modifier, color: token.color, icon: token.icon };
    }).sort((a, b) => b.total - a.total);
    render();
  }));
  app.querySelectorAll('[data-action="start-combat"]').forEach((button) => button.addEventListener('click', () => {
    if (!mapState.initiativeEntries.length) return;
    mapState.combatActive = true;
    mapState.currentTurnIndex = 0;
    mapState.combatMovementUsed = 0;
    mapState.combatMoving = false;
    mapState.lastAttackState = { hasAttacked: false, selectedWeaponId: mapState.lastAttackState.selectedWeaponId };
    render();
  }));
  app.querySelectorAll('[data-action="next-turn"]').forEach((button) => button.addEventListener('click', () => advanceTurn(mapState)));
  app.querySelectorAll('[data-action="reset-combat"]').forEach((button) => button.addEventListener('click', () => {
    mapState.combatActive = false;
    mapState.currentTurnIndex = 0;
    mapState.initiativeEntries = [];
    mapState.combatMovementUsed = 0;
    mapState.combatMoving = false;
    mapState.lastCombatResult = null;
    mapState.lastAttackState = { hasAttacked: false, selectedWeaponId: null };
    render();
  }));
  app.querySelectorAll('[data-action="toggle-combat-move"]').forEach((button) => button.addEventListener('click', () => {
    mapState.combatMoving = !mapState.combatMoving;
    render();
  }));
  app.querySelectorAll('[data-action="end-turn"]').forEach((button) => button.addEventListener('click', () => advanceTurn(mapState)));
  document.getElementById('combat-weapon')?.addEventListener('change', (event) => {
    mapState.lastAttackState.selectedWeaponId = event.target.value;
  });
  app.querySelectorAll('[data-action="perform-attack"]').forEach((button) => button.addEventListener('click', () => performAttack(mapId, mapState)));
  app.querySelectorAll('[data-action="adjust-token-vision"]').forEach((button) => button.addEventListener('click', () => {
    const tokens = getMapTokens(mapId);
    const token = tokens.find((entry) => entry.id === button.dataset.tokenId);
    if (!token) return;
    const currentCells = Math.round((token.visionRadius ?? mapState.gridSize * 12) / mapState.gridSize);
    token.visionRadius = Math.max(1, currentCells + Number(button.dataset.step)) * mapState.gridSize;
    saveMapTokens(mapId, tokens);
    render();
  }));

  wrap?.addEventListener('wheel', (event) => {
    event.preventDefault();
    mapState.zoom = clamp(mapState.zoom + (event.deltaY > 0 ? -0.1 : 0.1), 0.2, 5);
    render();
  }, { passive: false });
  wrap?.addEventListener('pointerdown', (event) => stagePointerDown(event, mapId));
  wrap?.addEventListener('pointermove', (event) => stagePointerMove(event, mapId));
  wrap?.addEventListener('pointerup', () => stagePointerUp(mapId));
  wrap?.addEventListener('pointerleave', () => stagePointerUp(mapId));
  wrap?.addEventListener('click', (event) => stageClick(event, mapId));
}

function drawMapOverlays(mapId) {
  const mapState = getMapViewState(mapId);
  const gridOverlay = document.getElementById('grid-overlay');
  const obstacleOverlay = document.getElementById('obstacle-overlay');
  const fogOverlay = document.getElementById('fog-overlay');
  if (!gridOverlay || !obstacleOverlay || !fogOverlay) return;
  const width = mapState.imgWidth;
  const height = mapState.imgHeight;
  gridOverlay.setAttribute('width', width);
  gridOverlay.setAttribute('height', height);
  obstacleOverlay.setAttribute('width', width);
  obstacleOverlay.setAttribute('height', height);
  Object.assign(gridOverlay.style, { width: `${width}px`, height: `${height}px`, opacity: mapState.showGrid ? '0.25' : '0', pointerEvents: 'none' });
  Object.assign(obstacleOverlay.style, { width: `${width}px`, height: `${height}px`, pointerEvents: state.role === 'dm' ? 'auto' : 'none' });
  Object.assign(fogOverlay.style, { width: `${width}px`, height: `${height}px`, pointerEvents: 'none' });

  gridOverlay.innerHTML = mapState.showGrid ? renderGridSvg(width, height, mapState.gridSize) : '';
  obstacleOverlay.innerHTML = renderObstacleSvg(mapId, mapState, getMapObstacles(mapId));
  fogOverlay.innerHTML = renderFog(mapId, mapState);

  obstacleOverlay.querySelectorAll('[data-action="select-obstacle"]').forEach((node) => {
    node.addEventListener('click', (event) => {
      event.stopPropagation();
      mapState.selectedObstacleId = node.dataset.id;
      render();
    });
  });
  obstacleOverlay.querySelectorAll('[data-action="toggle-obstacle-prop"]').forEach((node) => {
    node.addEventListener('click', (event) => {
      event.stopPropagation();
      const obstacles = getMapObstacles(mapId);
      const obstacle = obstacles.find((entry) => entry.id === node.dataset.id);
      if (!obstacle) return;
      obstacle[node.dataset.prop] = !obstacle[node.dataset.prop];
      saveMapObstacles(mapId, obstacles);
      render();
    });
  });
}

function renderGridSvg(width, height, gridSize) {
  const cols = Math.ceil(width / gridSize);
  const rows = Math.ceil(height / gridSize);
  let lines = '';
  for (let column = 0; column <= cols; column += 1) {
    lines += `<line x1="${column * gridSize}" y1="0" x2="${column * gridSize}" y2="${height}" stroke="rgba(255,255,255,0.7)" stroke-width="0.5"></line>`;
  }
  for (let row = 0; row <= rows; row += 1) {
    lines += `<line x1="0" y1="${row * gridSize}" x2="${width}" y2="${row * gridSize}" stroke="rgba(255,255,255,0.7)" stroke-width="0.5"></line>`;
  }
  return lines;
}

function renderObstacleSvg(mapId, mapState, obstacles) {
  const selected = mapState.selectedObstacleId;
  const showPreview = mapState.drawPreview && state.role === 'dm';
  const obstacleMarkup = obstacles.map((obstacle) => {
    const stroke = obstacle.blocksVision ? 'rgba(239,68,68,0.8)' : 'rgba(242,201,76,0.75)';
    if (obstacle.type === 'line') {
      return `<g>
        <line data-action="select-obstacle" data-id="${obstacle.id}" x1="${obstacle.x1}" y1="${obstacle.y1}" x2="${obstacle.x2}" y2="${obstacle.y2}" stroke="${stroke}" stroke-width="${selected === obstacle.id ? 4 : 3}" stroke-dasharray="${obstacle.blocksMovement ? '' : '6 3'}"></line>
      </g>`;
    }
    return `<g>
      <rect data-action="select-obstacle" data-id="${obstacle.id}" x="${obstacle.x}" y="${obstacle.y}" width="${obstacle.w}" height="${obstacle.h}" fill="rgba(239,68,68,0.08)" stroke="${stroke}" stroke-width="${selected === obstacle.id ? 3 : 2}" stroke-dasharray="${obstacle.blocksMovement ? '' : '6 3'}"></rect>
    </g>`;
  }).join('');

  const selectedObstacle = obstacles.find((obstacle) => obstacle.id === selected);
  const controls = selectedObstacle && state.role === 'dm'
    ? `<foreignObject x="10" y="10" width="210" height="110">
        <div xmlns="http://www.w3.org/1999/xhtml" class="surface" style="padding:0.65rem;font-size:12px;background:#111117;border:1px solid #262631;border-radius:4px">
          <div class="helper-text" style="margin-bottom:0.45rem">${selectedObstacle.type === 'line' ? 'Line' : 'Rectangle'} obstacle</div>
          <button class="inline-button" data-action="toggle-obstacle-prop" data-id="${selectedObstacle.id}" data-prop="blocksVision">${selectedObstacle.blocksVision ? '✓' : '○'} Blocks Vision</button>
          <button class="inline-button" data-action="toggle-obstacle-prop" data-id="${selectedObstacle.id}" data-prop="blocksMovement">${selectedObstacle.blocksMovement ? '✓' : '○'} Blocks Movement</button>
        </div>
      </foreignObject>`
    : '';
  const preview = showPreview
    ? mapState.obstacleTool === 'line'
      ? `<line x1="${mapState.drawPreview.x1}" y1="${mapState.drawPreview.y1}" x2="${mapState.drawPreview.x2}" y2="${mapState.drawPreview.y2}" stroke="rgba(239,68,68,0.65)" stroke-width="2" stroke-dasharray="4 4"></line>`
      : `<rect x="${Math.min(mapState.drawPreview.x1, mapState.drawPreview.x2)}" y="${Math.min(mapState.drawPreview.y1, mapState.drawPreview.y2)}" width="${Math.abs(mapState.drawPreview.x2 - mapState.drawPreview.x1)}" height="${Math.abs(mapState.drawPreview.y2 - mapState.drawPreview.y1)}" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.65)" stroke-width="2" stroke-dasharray="4 4"></rect>`
    : '';
  return `${obstacleMarkup}${preview}${controls}`;
}

function renderFog(mapId, mapState) {
  if (state.role === 'dm' && !mapState.showPlayerPreview) return '';
  const width = mapState.imgWidth;
  const height = mapState.imgHeight;
  const gridSize = mapState.gridSize;
  const cols = Math.ceil(width / gridSize);
  const rows = Math.ceil(height / gridSize);
  const tokens = getMapTokens(mapId);
  const viewers = tokens.filter((token) => token.type === 'character').map((token) => ({ x: token.x, y: token.y, visionRadius: token.visionRadius ?? 12 * gridSize }));
  const obstacles = getMapObstacles(mapId);
  let cells = '';
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < cols; column += 1) {
      const x = column * gridSize;
      const y = row * gridSize;
      const visible = isCellVisible(column, row, gridSize, viewers, obstacles);
      if (!visible) cells += `<div style="position:absolute;left:${x}px;top:${y}px;width:${gridSize}px;height:${gridSize}px;background:${state.role === 'dm' ? 'rgba(10,10,15,0.6)' : 'rgba(10,10,15,0.95)'}"></div>`;
    }
  }
  return cells;
}

function bindDrawerHandlers() {
  const drawer = state.drawer;
  document.getElementById('equipment-search')?.addEventListener('input', (event) => {
    drawer.search = event.target.value;
    render();
  });
  document.querySelectorAll('[data-action="equipment-filter"]').forEach((button) => button.addEventListener('click', () => {
    drawer.filter = button.dataset.filter;
    render();
  }));
  document.querySelectorAll('[data-action="add-equipment-item"]').forEach((button) => button.addEventListener('click', () => {
    const item = EQUIPMENT_CATALOG.find((entry) => entry.name === button.dataset.name);
    if (!item) return;
    const equipmentItem = { ...item, id: uid('eq'), equipped: false };
    if (button.dataset.mode === 'create') {
      state.view.createDraft.equipment = [...state.view.createDraft.equipment, equipmentItem];
    } else if (button.dataset.mode === 'character') {
      const characters = getCharacters();
      const character = characters.find((entry) => entry.id === state.view.selectedCharacterId);
      if (!character) return;
      character.equipment = [...character.equipment, equipmentItem];
      character.ac = getEquippedAC(character);
      saveCharacters(characters);
    }
    state.drawer = null;
    render();
  }));
}

function openEquipmentDrawer(mode) {
  state.drawer = { type: 'equipment', mode, search: '', filter: 'all' };
  render();
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function stagePointerDown(event, mapId) {
  const mapState = getMapViewState(mapId);
  if (event.target.closest('.token-node') || event.target.closest('.surface')) return;
  const point = eventToScenePoint(event, mapId);
  if (state.role === 'dm' && (mapState.obstacleTool === 'line' || mapState.obstacleTool === 'rect')) {
    mapState.drawObstacleStart = point;
    mapState.drawPreview = { x1: point.x, y1: point.y, x2: point.x, y2: point.y };
    return;
  }
  if (state.role === 'dm' && mapState.obstacleTool === 'select') {
    const hit = hitObstacle(point, getMapObstacles(mapId));
    mapState.selectedObstacleId = hit?.id || null;
    if (hit) {
      mapState.draggingObstacleId = hit.id;
      mapState.dragObstacleStart = { point, obstacle: JSON.parse(JSON.stringify(hit)) };
    }
    render();
    return;
  }
  mapState.isPanning = true;
  mapState.panStartX = event.clientX - mapState.panX;
  mapState.panStartY = event.clientY - mapState.panY;
}

function stagePointerMove(event, mapId) {
  const mapState = getMapViewState(mapId);
  if (mapState.draggingTokenId) {
    const tokens = getMapTokens(mapId);
    const token = tokens.find((entry) => entry.id === mapState.draggingTokenId);
    if (!token) return;
    const point = eventToScenePoint(event, mapId);
    let newX = point.x - mapState.dragOffsetX;
    let newY = point.y - mapState.dragOffsetY;
    if (mapState.showGrid) {
      newX = snapToGrid(newX, mapState.gridSize);
      newY = snapToGrid(newY, mapState.gridSize);
    }
    token.x = newX;
    token.y = newY;
    saveMapTokens(mapId, tokens);
    render();
    return;
  }
  if (mapState.draggingObstacleId && mapState.dragObstacleStart) {
    const obstacles = getMapObstacles(mapId);
    const obstacle = obstacles.find((entry) => entry.id === mapState.draggingObstacleId);
    if (!obstacle) return;
    const point = eventToScenePoint(event, mapId);
    const dx = point.x - mapState.dragObstacleStart.point.x;
    const dy = point.y - mapState.dragObstacleStart.point.y;
    const origin = mapState.dragObstacleStart.obstacle;
    if (obstacle.type === 'line') {
      obstacle.x1 = origin.x1 + dx;
      obstacle.y1 = origin.y1 + dy;
      obstacle.x2 = origin.x2 + dx;
      obstacle.y2 = origin.y2 + dy;
    } else {
      obstacle.x = origin.x + dx;
      obstacle.y = origin.y + dy;
    }
    saveMapObstacles(mapId, obstacles);
    render();
    return;
  }
  if (mapState.drawObstacleStart && mapState.drawPreview) {
    const point = eventToScenePoint(event, mapId);
    mapState.drawPreview = { x1: mapState.drawObstacleStart.x, y1: mapState.drawObstacleStart.y, x2: point.x, y2: point.y };
    drawMapOverlays(mapId);
    return;
  }
  if (mapState.isPanning) {
    mapState.panX = event.clientX - mapState.panStartX;
    mapState.panY = event.clientY - mapState.panStartY;
    render();
  }
}

function stagePointerUp(mapId) {
  const mapState = getMapViewState(mapId);
  if (mapState.drawObstacleStart && mapState.drawPreview) {
    const dx = mapState.drawPreview.x2 - mapState.drawPreview.x1;
    const dy = mapState.drawPreview.y2 - mapState.drawPreview.y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 5) {
      const obstacles = getMapObstacles(mapId);
      if (mapState.obstacleTool === 'line') {
        obstacles.push({ id: uid('obs'), type: 'line', x1: mapState.drawPreview.x1, y1: mapState.drawPreview.y1, x2: mapState.drawPreview.x2, y2: mapState.drawPreview.y2, blocksVision: true, blocksMovement: false });
      } else if (mapState.obstacleTool === 'rect') {
        obstacles.push({ id: uid('obs'), type: 'rect', x: Math.min(mapState.drawPreview.x1, mapState.drawPreview.x2), y: Math.min(mapState.drawPreview.y1, mapState.drawPreview.y2), w: Math.abs(dx), h: Math.abs(dy), blocksVision: true, blocksMovement: false });
      }
      saveMapObstacles(mapId, obstacles);
    }
  }
  mapState.isPanning = false;
  mapState.draggingTokenId = null;
  mapState.draggingObstacleId = null;
  mapState.dragObstacleStart = null;
  mapState.drawObstacleStart = null;
  mapState.drawPreview = null;
  render();
}

function tokenPointerDown(event, mapId, tokenId) {
  const mapState = getMapViewState(mapId);
  event.stopPropagation();
  const tokens = getMapTokens(mapId);
  const token = tokens.find((entry) => entry.id === tokenId);
  if (!token) return;
  if (state.role !== 'dm' && token.type === 'monster') return;
  if (mapState.combatActive) {
    mapState.selectedTokenId = tokenId;
    render();
    return;
  }
  const point = eventToScenePoint(event, mapId);
  mapState.draggingTokenId = tokenId;
  mapState.dragOffsetX = point.x - token.x;
  mapState.dragOffsetY = point.y - token.y;
  mapState.selectedTokenId = tokenId;
}

function stageClick(event, mapId) {
  const mapState = getMapViewState(mapId);
  if (!mapState.combatMoving || !mapState.combatActive) return;
  if (event.target.closest('.token-node') || event.target.closest('.surface')) return;
  const currentTurnId = mapState.initiativeEntries[mapState.currentTurnIndex]?.tokenId;
  const tokens = getMapTokens(mapId);
  const currentToken = tokens.find((entry) => entry.id === currentTurnId);
  if (!currentToken) return;
  const point = eventToScenePoint(event, mapId);
  let newX = point.x;
  let newY = point.y;
  if (mapState.showGrid) {
    newX = snapToGrid(newX, mapState.gridSize);
    newY = snapToGrid(newY, mapState.gridSize);
  }
  const obstacles = getMapObstacles(mapId);
  if (isMovementBlocked(currentToken.x, currentToken.y, newX, newY, obstacles)) return;
  const cellsMoved = Math.max(Math.abs(newX - currentToken.x), Math.abs(newY - currentToken.y)) / mapState.gridSize;
  const ftMoved = Math.round(cellsMoved) * mapState.ftPerCell;
  const character = getCharacters().find((entry) => entry.name === currentToken.label);
  const remaining = (character?.speed || 30) - mapState.combatMovementUsed;
  if (ftMoved > remaining) return;
  currentToken.x = newX;
  currentToken.y = newY;
  mapState.combatMovementUsed += ftMoved;
  saveMapTokens(mapId, tokens);
  render();
}

function advanceTurn(mapState) {
  if (!mapState.initiativeEntries.length) return;
  mapState.currentTurnIndex = (mapState.currentTurnIndex + 1) % mapState.initiativeEntries.length;
  mapState.combatMovementUsed = 0;
  mapState.combatMoving = false;
  mapState.lastCombatResult = null;
  mapState.lastAttackState = { hasAttacked: false, selectedWeaponId: mapState.lastAttackState.selectedWeaponId };
  render();
}

function performAttack(mapId, mapState) {
  const targetId = document.getElementById('combat-target')?.value;
  if (!targetId) return;
  const currentTurnId = mapState.initiativeEntries[mapState.currentTurnIndex]?.tokenId;
  const tokens = getMapTokens(mapId);
  const attacker = tokens.find((token) => token.id === currentTurnId);
  const target = tokens.find((token) => token.id === targetId);
  if (!attacker || !target) return;
  const characters = getCharacters();
  const character = characters.find((entry) => entry.name === attacker.label);
  const availableWeapons = character && getEquippedWeapons(character).length ? getEquippedWeapons(character) : [{ id: 'unarmed', name: 'Unarmed Strike', category: 'weapon', damageDie: 1, attackBonus: 0, damageBonus: 0, properties: [] }];
  const weapon = availableWeapons.find((entry) => entry.id === (mapState.lastAttackState.selectedWeaponId || availableWeapons[0].id)) || availableWeapons[0];
  const targetCharacter = characters.find((entry) => entry.name === target.label);
  const targetAC = targetCharacter ? getEquippedAC(targetCharacter) : (target.type === 'monster' ? 10 + Math.floor(Math.random() * 6) : 10);
  const attackDie = Math.floor(Math.random() * 20) + 1;
  let attackMod = 0;
  if (character) {
    const str = character.abilities.find((ability) => ability.name === 'STR');
    const dex = character.abilities.find((ability) => ability.name === 'DEX');
    const strMod = str ? getModifier(str.score) : 0;
    const dexMod = dex ? getModifier(dex.score) : 0;
    if (weapon.properties?.includes('ranged')) attackMod = dexMod;
    else if (weapon.properties?.includes('finesse')) attackMod = Math.max(strMod, dexMod);
    else attackMod = strMod;
  } else {
    attackMod = Math.floor(Math.random() * 4) + 1;
  }
  const attackTotal = attackDie + attackMod + (weapon.attackBonus || 0);
  const natural20 = attackDie === 20;
  const natural1 = attackDie === 1;
  const hit = natural20 || (!natural1 && attackTotal >= targetAC);
  let damageRoll = 0;
  if (hit) {
    damageRoll = Math.max(1, Math.floor(Math.random() * (weapon.damageDie || 4)) + 1 + attackMod + (weapon.damageBonus || 0));
    if (natural20) damageRoll *= 2;
    if (typeof target.hp === 'number') target.hp = Math.max(0, target.hp - damageRoll);
    saveMapTokens(mapId, tokens);
  }
  mapState.lastCombatResult = { attackRoll: attackTotal, targetAC, hit, damageRoll, targetName: target.label, natural20, natural1, weaponName: weapon.name };
  mapState.lastAttackState.hasAttacked = true;
  render();
}

function eventToScenePoint(event, mapId) {
  const mapState = getMapViewState(mapId);
  const wrap = document.querySelector('[data-map-wrap]');
  const rect = wrap.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left - mapState.panX) / mapState.zoom,
    y: (event.clientY - rect.top - mapState.panY) / mapState.zoom,
  };
}

function snapToGrid(value, gridSize) {
  return Math.round(value / gridSize) * gridSize + gridSize / 2;
}

function hitObstacle(point, obstacles) {
  return obstacles.find((obstacle) => {
    if (obstacle.type === 'rect') {
      return point.x >= obstacle.x && point.x <= obstacle.x + obstacle.w && point.y >= obstacle.y && point.y <= obstacle.y + obstacle.h;
    }
    return distanceToSegment(point.x, point.y, obstacle.x1, obstacle.y1, obstacle.x2, obstacle.y2) < 8;
  });
}

function distanceToSegment(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
  if (!l2) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  const projectionX = x1 + t * (x2 - x1);
  const projectionY = y1 + t * (y2 - y1);
  return Math.hypot(px - projectionX, py - projectionY);
}

function segmentsIntersect(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  const d1x = ax2 - ax1;
  const d1y = ay2 - ay1;
  const d2x = bx2 - bx1;
  const d2y = by2 - by1;
  const cross = d1x * d2y - d1y * d2x;
  if (Math.abs(cross) < 1e-10) return false;
  const dx = bx1 - ax1;
  const dy = by1 - ay1;
  const t = (dx * d2y - dy * d2x) / cross;
  const u = (dx * d1y - dy * d1x) / cross;
  return t > 0.001 && t < 0.999 && u > 0.001 && u < 0.999;
}

function getObstacleSegments(obstacle) {
  if (obstacle.type === 'line') return [[obstacle.x1, obstacle.y1, obstacle.x2, obstacle.y2]];
  return [
    [obstacle.x, obstacle.y, obstacle.x + obstacle.w, obstacle.y],
    [obstacle.x + obstacle.w, obstacle.y, obstacle.x + obstacle.w, obstacle.y + obstacle.h],
    [obstacle.x + obstacle.w, obstacle.y + obstacle.h, obstacle.x, obstacle.y + obstacle.h],
    [obstacle.x, obstacle.y + obstacle.h, obstacle.x, obstacle.y],
  ];
}

function isBlocked(ox, oy, tx, ty, obstacles) {
  for (const obstacle of obstacles) {
    if (!obstacle.blocksVision) continue;
    for (const [x1, y1, x2, y2] of getObstacleSegments(obstacle)) {
      if (segmentsIntersect(ox, oy, tx, ty, x1, y1, x2, y2)) return true;
    }
  }
  return false;
}

function isVisible(px, py, viewers, obstacles) {
  for (const viewer of viewers) {
    const distance = Math.sqrt((px - viewer.x) ** 2 + (py - viewer.y) ** 2);
    if (distance > viewer.visionRadius) continue;
    if (!isBlocked(viewer.x, viewer.y, px, py, obstacles)) return true;
  }
  return false;
}

function isCellVisible(column, row, gridSize, viewers, obstacles) {
  const cx = column * gridSize + gridSize / 2;
  const cy = row * gridSize + gridSize / 2;
  return isVisible(cx, cy, viewers, obstacles);
}

function isMovementBlocked(ox, oy, tx, ty, obstacles) {
  for (const obstacle of obstacles) {
    if (!obstacle.blocksMovement) continue;
    for (const [x1, y1, x2, y2] of getObstacleSegments(obstacle)) {
      if (segmentsIntersect(ox, oy, tx, ty, x1, y1, x2, y2)) return true;
    }
  }
  return false;
}

function isTokenVisible(token, viewers, obstacles, mapState) {
  if (state.role === 'dm' && !mapState.showPlayerPreview) return true;
  if (token.type === 'character') return true;
  return isVisible(token.x, token.y, viewers.map((viewer) => ({ x: viewer.x, y: viewer.y, visionRadius: viewer.visionRadius ?? mapState.gridSize * 12 })), obstacles);
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
if (!window.location.hash) navigate('/');
