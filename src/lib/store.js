const CHARACTERS_KEY = 'dnd_characters';
const RESOURCES_KEY = 'dnd_resources';
export function getCharacters() {
    const data = localStorage.getItem(CHARACTERS_KEY);
    return data ? JSON.parse(data) : [];
}
export function saveCharacters(chars) {
    localStorage.setItem(CHARACTERS_KEY, JSON.stringify(chars));
}
export function addCharacter(char) {
    const chars = getCharacters();
    chars.push(char);
    saveCharacters(chars);
}
export function updateCharacter(char) {
    const chars = getCharacters().map(c => c.id === char.id ? char : c);
    saveCharacters(chars);
}
export function deleteCharacter(id) {
    saveCharacters(getCharacters().filter(c => c.id !== id));
}
export function getResources() {
    const data = localStorage.getItem(RESOURCES_KEY);
    if (data)
        return JSON.parse(data);
    // Seed with default resources
    const defaults = [
        {
            id: 'res-1', title: 'Standard Array',
            description: 'The standard ability score array for quick character creation.',
            tags: ['rules', 'character-creation'],
            type: 'rules',
            content: '15, 14, 13, 12, 10, 8 — Assign one to each ability score.',
            createdAt: new Date().toISOString(),
        },
        {
            id: 'res-2', title: 'Conditions Reference',
            description: 'Quick reference for all combat conditions.',
            tags: ['rules', 'combat'],
            type: 'handout',
            content: 'Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Incapacitated, Invisible, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned, Unconscious.',
            createdAt: new Date().toISOString(),
        },
        {
            id: 'res-3', title: 'Starter Dungeon Map',
            description: 'A simple 5-room dungeon for level 1 parties.',
            tags: ['maps', 'starter'],
            type: 'map',
            content: 'Room 1: Entry Hall (2 Goblins) → Room 2: Trapped Corridor (DC 12 Perception) → Room 3: Armory (Loot) → Room 4: Boss Chamber (Bugbear) → Room 5: Treasure Vault.',
            createdAt: new Date().toISOString(),
        },
        {
            id: 'res-4', title: 'Town of Willowmere',
            description: 'A small frontier town for campaign starting point.',
            tags: ['lore', 'setting'],
            type: 'lore',
            content: 'Pop: ~200. Notable NPCs: Mayor Elda Thornwick (Human, LG), Blacksmith Grok (Half-Orc), Innkeeper Mira (Halfling). Tavern: The Rusty Lantern. Quest Board available.',
            createdAt: new Date().toISOString(),
        },
    ];
    localStorage.setItem(RESOURCES_KEY, JSON.stringify(defaults));
    return defaults;
}
export function saveResources(resources) {
    localStorage.setItem(RESOURCES_KEY, JSON.stringify(resources));
}
export function addResource(resource) {
    const resources = getResources();
    resources.push(resource);
    saveResources(resources);
}
export function deleteResource(id) {
    saveResources(getResources().filter(r => r.id !== id));
}
