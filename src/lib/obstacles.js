// Obstacle types and persistence for map tools
export function loadObstacles(mapId) {
    const data = localStorage.getItem(`map-obstacles-${mapId}`);
    return data ? JSON.parse(data) : [];
}
export function saveObstacles(mapId, obstacles) {
    localStorage.setItem(`map-obstacles-${mapId}`, JSON.stringify(obstacles));
}
export function makeId() {
    return `obs-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
/** Get all line segments from an obstacle (rects produce 4 edges) */
export function getObstacleSegments(obs) {
    if (obs.type === 'line') {
        return [[obs.x1, obs.y1, obs.x2, obs.y2]];
    }
    const { x, y, w, h } = obs;
    return [
        [x, y, x + w, y],
        [x + w, y, x + w, y + h],
        [x + w, y + h, x, y + h],
        [x, y + h, x, y],
    ];
}
