import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Plus, Trash2, X, Grid3X3, Eye, EyeOff, Minus, MousePointer, Slash, Square, } from 'lucide-react';
import { getCharacters } from '@/lib/store';
import { useGame } from '@/lib/GameContext';
import { InitiativeTracker } from './InitiativeTracker';
import { CombatPanel } from './CombatPanel';
import { loadObstacles, saveObstacles } from '@/lib/obstacles';
import { ObstacleLayer } from './ObstacleLayer';
import { FogOfWarLayer } from './FogOfWarLayer';
import { isVisible, isMovementBlocked } from '@/lib/visibility';
const MONSTER_PRESETS = [
    { label: 'Goblin', color: 'hsl(120, 60%, 35%)', hp: 7 },
    { label: 'Orc', color: 'hsl(30, 70%, 35%)', hp: 15 },
    { label: 'Dragon', color: 'hsl(0, 70%, 40%)', hp: 195 },
    { label: 'Skeleton', color: 'hsl(0, 0%, 60%)', hp: 13 },
    { label: 'Wolf', color: 'hsl(30, 30%, 40%)', hp: 11 },
    { label: 'Bandit', color: 'hsl(45, 50%, 35%)', hp: 11 },
];
const DEFAULT_GRID_SIZE = 40;
const DEFAULT_FT_PER_CELL = 5;
const DEFAULT_VISION_CELLS = 12; // 12 cells = 60ft default vision
export function MapCanvas({ mapImage, mapId }) {
    const { isDM } = useGame();
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const [tokens, setTokens] = useState(() => {
        const saved = localStorage.getItem(`map-tokens-${mapId}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [draggingToken, setDraggingToken] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showGrid, setShowGrid] = useState(true);
    const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE);
    const [ftPerCell, setFtPerCell] = useState(DEFAULT_FT_PER_CELL);
    const [combatMovementUsed, setCombatMovementUsed] = useState(0);
    const [imgSize, setImgSize] = useState({ w: 800, h: 600 });
    const [selectedToken, setSelectedToken] = useState(null);
    // Obstacles
    const [obstacles, setObstacles] = useState(() => loadObstacles(mapId));
    const [obstacleTool, setObstacleTool] = useState(null);
    // DM preview player vision
    const [showPlayerPreview, setShowPlayerPreview] = useState(false);
    // Combat state
    const [initiativeEntries, setInitiativeEntries] = useState([]);
    const [combatActive, setCombatActive] = useState(false);
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
    const [combatMoving, setCombatMoving] = useState(false);
    const characters = useRef(getCharacters());
    const currentTurnId = combatActive && initiativeEntries.length > 0
        ? initiativeEntries[currentTurnIndex]?.tokenId
        : null;
    // Persist tokens & obstacles
    useEffect(() => {
        localStorage.setItem(`map-tokens-${mapId}`, JSON.stringify(tokens));
    }, [tokens, mapId]);
    useEffect(() => {
        saveObstacles(mapId, obstacles);
    }, [obstacles, mapId]);
    const handleImgLoad = () => {
        if (imgRef.current) {
            setImgSize({ w: imgRef.current.naturalWidth, h: imgRef.current.naturalHeight });
        }
    };
    const gridCols = Math.ceil(imgSize.w / gridSize);
    const gridRows = Math.ceil(imgSize.h / gridSize);
    // Vision viewers: all player character tokens
    const viewers = useMemo(() => {
        return tokens
            .filter(t => t.type === 'character')
            .map(t => ({
            x: t.x,
            y: t.y,
            visionRadius: t.visionRadius ?? (DEFAULT_VISION_CELLS * gridSize),
        }));
    }, [tokens, gridSize]);
    // Visibility check for tokens (player view)
    const isTokenVisible = useCallback((token) => {
        if (isDM && !showPlayerPreview)
            return true;
        if (token.type === 'character')
            return true; // Players always see their own tokens
        return isVisible(token.x, token.y, viewers, obstacles);
    }, [isDM, showPlayerPreview, viewers, obstacles]);
    const handleWheel = useCallback((e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom(z => Math.max(0.2, Math.min(5, z + delta)));
    }, []);
    const handlePointerDown = useCallback((e) => {
        if (draggingToken || obstacleTool)
            return;
        setIsPanning(true);
        setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
        e.target.setPointerCapture?.(e.pointerId);
    }, [pan, draggingToken, obstacleTool]);
    const handlePointerMove = useCallback((e) => {
        if (isPanning && !draggingToken) {
            setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
        }
    }, [isPanning, panStart, draggingToken]);
    const handlePointerUp = useCallback(() => {
        setIsPanning(false);
    }, []);
    const handleTokenPointerDown = (e, tokenId) => {
        if (obstacleTool)
            return; // Don't grab tokens while drawing obstacles
        e.stopPropagation();
        const token = tokens.find(t => t.id === tokenId);
        if (!token)
            return;
        if (!isDM && token.type === 'monster')
            return;
        if (combatActive) {
            setSelectedToken(tokenId);
            return;
        }
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect)
            return;
        const mouseX = (e.clientX - rect.left - pan.x) / zoom;
        const mouseY = (e.clientY - rect.top - pan.y) / zoom;
        setDragOffset({ x: mouseX - token.x, y: mouseY - token.y });
        setDraggingToken(tokenId);
        setSelectedToken(tokenId);
        e.target.setPointerCapture?.(e.pointerId);
    };
    const handleTokenPointerMove = (e) => {
        if (!draggingToken)
            return;
        if (combatActive && draggingToken !== currentTurnId) {
            setDraggingToken(null);
            return;
        }
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect)
            return;
        const mouseX = (e.clientX - rect.left - pan.x) / zoom;
        const mouseY = (e.clientY - rect.top - pan.y) / zoom;
        let newX = mouseX - dragOffset.x;
        let newY = mouseY - dragOffset.y;
        if (showGrid) {
            newX = Math.round(newX / gridSize) * gridSize + gridSize / 2;
            newY = Math.round(newY / gridSize) * gridSize + gridSize / 2;
        }
        setTokens(prev => prev.map(t => t.id === draggingToken ? { ...t, x: newX, y: newY } : t));
    };
    const handleTokenPointerUp = () => {
        setDraggingToken(null);
    };
    // Canvas click for combat movement
    const handleCanvasClick = (e) => {
        if (!combatMoving || !currentTurnId)
            return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect)
            return;
        const mouseX = (e.clientX - rect.left - pan.x) / zoom;
        const mouseY = (e.clientY - rect.top - pan.y) / zoom;
        let newX = mouseX;
        let newY = mouseY;
        if (showGrid) {
            newX = Math.round(newX / gridSize) * gridSize + gridSize / 2;
            newY = Math.round(newY / gridSize) * gridSize + gridSize / 2;
        }
        const currentToken = tokens.find(t => t.id === currentTurnId);
        if (currentToken) {
            // Check movement blocking
            if (isMovementBlocked(currentToken.x, currentToken.y, newX, newY, obstacles)) {
                return; // Path is blocked by an obstacle
            }
            const dx = Math.abs(newX - currentToken.x) / gridSize;
            const dy = Math.abs(newY - currentToken.y) / gridSize;
            const cellsMoved = Math.max(dx, dy);
            const ftMoved = Math.round(cellsMoved) * ftPerCell;
            const charData = characters.current.find(c => c.name === currentToken.label);
            const maxMovement = charData?.speed || 30;
            const remaining = maxMovement - combatMovementUsed;
            if (ftMoved > remaining) {
                return;
            }
            setCombatMovementUsed(prev => prev + ftMoved);
        }
        moveToken(currentTurnId, newX, newY);
    };
    const moveToken = (tokenId, newX, newY) => {
        setTokens(prev => prev.map(t => t.id === tokenId ? { ...t, x: newX, y: newY } : t));
    };
    const damageToken = (tokenId, damage) => {
        setTokens(prev => prev.map(t => {
            if (t.id !== tokenId)
                return t;
            const currentHp = t.hp ?? t.maxHp ?? 10;
            return { ...t, hp: Math.max(0, currentHp - damage) };
        }));
    };
    const addCharacterToken = (char) => {
        const token = {
            id: `token-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
            label: char.name,
            x: 200 + Math.random() * 100,
            y: 200 + Math.random() * 100,
            color: 'hsl(217, 91%, 60%)',
            icon: char.icon,
            type: 'character',
            hp: char.hp,
            maxHp: char.maxHp,
            visionRadius: DEFAULT_VISION_CELLS * gridSize,
        };
        setTokens(prev => [...prev, token]);
        setShowAddMenu(false);
    };
    const addMonsterToken = (preset) => {
        const token = {
            id: `token-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
            label: preset.label,
            x: 200 + Math.random() * 100,
            y: 200 + Math.random() * 100,
            color: preset.color,
            type: 'monster',
            hp: preset.hp,
            maxHp: preset.hp,
        };
        setTokens(prev => [...prev, token]);
        setShowAddMenu(false);
    };
    const removeToken = (id) => {
        setTokens(prev => prev.filter(t => t.id !== id));
        if (selectedToken === id)
            setSelectedToken(null);
    };
    const updateTokenVision = (id, radiusCells) => {
        setTokens(prev => prev.map(t => t.id === id ? { ...t, visionRadius: radiusCells * gridSize } : t));
    };
    const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
    const handleStartCombat = () => {
        if (initiativeEntries.length === 0)
            return;
        setCombatActive(true);
        setCurrentTurnIndex(0);
    };
    const handleNextTurn = () => {
        setCurrentTurnIndex(i => (i + 1) % initiativeEntries.length);
    };
    const handleResetCombat = () => {
        setCombatActive(false);
        setCurrentTurnIndex(0);
        setInitiativeEntries([]);
    };
    const currentToken = selectedToken ? tokens.find(t => t.id === selectedToken) : null;
    const currentTurnToken = currentTurnId ? tokens.find(t => t.id === currentTurnId) : null;
    return (_jsxs("div", { className: "relative w-full h-full flex", children: [_jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [_jsxs("div", { className: "flex items-center gap-1 p-2 bg-card border-b border-border flex-wrap shrink-0", children: [_jsx("button", { onClick: () => setZoom(z => Math.min(5, z + 0.2)), className: "tactical-card !p-1 px-2", title: "Zoom in", children: _jsx(ZoomIn, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => setZoom(z => Math.max(0.2, z - 0.2)), className: "tactical-card !p-1 px-2", title: "Zoom out", children: _jsx(ZoomOut, { className: "w-4 h-4" }) }), _jsx("button", { onClick: resetView, className: "tactical-card !p-1 px-2", title: "Reset", children: _jsx(RotateCcw, { className: "w-4 h-4" }) }), _jsxs("span", { className: "font-mono text-[10px] text-muted-foreground px-1", children: [Math.round(zoom * 100), "%"] }), _jsx("div", { className: "w-px h-5 bg-border mx-1" }), _jsxs("button", { onClick: () => setShowGrid(!showGrid), className: `tactical-card !p-1 px-2 flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold ${showGrid ? 'border-secondary text-secondary' : ''}`, children: [_jsx(Grid3X3, { className: "w-3 h-3" }), " Grid"] }), showGrid && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => setGridSize(s => Math.max(20, s - 5)), className: "tactical-card !p-1 px-1", children: _jsx(Minus, { className: "w-3 h-3" }) }), _jsxs("span", { className: "font-mono text-[9px] text-muted-foreground w-8 text-center", children: [gridSize, "px"] }), _jsx("button", { onClick: () => setGridSize(s => Math.min(100, s + 5)), className: "tactical-card !p-1 px-1", children: _jsx(Plus, { className: "w-3 h-3" }) }), isDM && (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-px h-4 bg-border mx-1" }), _jsx("button", { onClick: () => setFtPerCell(f => Math.max(5, f - 5)), className: "tactical-card !p-1 px-1", children: _jsx(Minus, { className: "w-3 h-3" }) }), _jsxs("span", { className: "font-mono text-[9px] text-muted-foreground w-10 text-center", children: [ftPerCell, "ft"] }), _jsx("button", { onClick: () => setFtPerCell(f => Math.min(30, f + 5)), className: "tactical-card !p-1 px-1", children: _jsx(Plus, { className: "w-3 h-3" }) })] }))] })), isDM && (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-px h-5 bg-border mx-1" }), _jsx("button", { onClick: () => setObstacleTool(obstacleTool === 'select' ? null : 'select'), className: `tactical-card !p-1 px-2 flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold ${obstacleTool === 'select' ? 'border-secondary text-secondary' : ''}`, title: "Select obstacle", children: _jsx(MousePointer, { className: "w-3 h-3" }) }), _jsx("button", { onClick: () => setObstacleTool(obstacleTool === 'line' ? null : 'line'), className: `tactical-card !p-1 px-2 flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold ${obstacleTool === 'line' ? 'border-secondary text-secondary' : ''}`, title: "Draw line obstacle", children: _jsx(Slash, { className: "w-3 h-3" }) }), _jsx("button", { onClick: () => setObstacleTool(obstacleTool === 'rect' ? null : 'rect'), className: `tactical-card !p-1 px-2 flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold ${obstacleTool === 'rect' ? 'border-secondary text-secondary' : ''}`, title: "Draw rectangle obstacle", children: _jsx(Square, { className: "w-3 h-3" }) }), _jsx("div", { className: "w-px h-5 bg-border mx-1" }), _jsxs("button", { onClick: () => setShowPlayerPreview(!showPlayerPreview), className: `tactical-card !p-1 px-2 flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold ${showPlayerPreview ? 'border-accent text-accent' : ''}`, title: "Preview player vision", children: [showPlayerPreview ? _jsx(EyeOff, { className: "w-3 h-3" }) : _jsx(Eye, { className: "w-3 h-3" }), "Player View"] })] })), _jsx("div", { className: "flex-1" }), isDM && (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowAddMenu(!showAddMenu), className: "tactical-card !p-1 px-3 flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold", children: [_jsx(Plus, { className: "w-3 h-3" }), " Token"] }), showAddMenu && (_jsxs("div", { className: "absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-sm shadow-xl z-50 max-h-64 overflow-y-auto", children: [_jsx("p", { className: "text-[9px] uppercase tracking-wider text-muted-foreground px-3 py-2 border-b border-border", children: "Characters" }), characters.current.length === 0 ? (_jsx("p", { className: "text-[10px] text-muted-foreground px-3 py-2", children: "No characters" })) : (characters.current.map(c => (_jsxs("button", { onClick: () => addCharacterToken(c), className: "w-full text-left px-3 py-2 text-xs font-mono text-foreground hover:bg-muted/50 flex items-center gap-2", children: [c.icon ? (_jsx("img", { src: c.icon, className: "w-5 h-5 rounded-full object-cover", alt: "" })) : (_jsx("div", { className: "w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[8px] text-secondary-foreground font-bold", children: c.name[0] })), c.name] }, c.id)))), _jsx("p", { className: "text-[9px] uppercase tracking-wider text-muted-foreground px-3 py-2 border-y border-border", children: "Monsters" }), MONSTER_PRESETS.map(m => (_jsxs("button", { onClick: () => addMonsterToken(m), className: "w-full text-left px-3 py-2 text-xs font-mono text-foreground hover:bg-muted/50 flex items-center gap-2", children: [_jsx("div", { className: "w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-background font-bold", style: { backgroundColor: m.color }, children: m.label[0] }), m.label] }, m.label)))] }))] }))] }), _jsx("div", { ref: containerRef, className: `flex-1 overflow-hidden relative bg-muted/30 ${obstacleTool === 'line' || obstacleTool === 'rect' ? 'cursor-crosshair' :
                            combatMoving ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'}`, onWheel: handleWheel, onPointerDown: handlePointerDown, onPointerMove: (e) => { handlePointerMove(e); handleTokenPointerMove(e); }, onPointerUp: () => { handlePointerUp(); handleTokenPointerUp(); }, onClick: handleCanvasClick, style: { touchAction: 'none' }, children: _jsxs("div", { style: {
                                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                                transformOrigin: '0 0',
                                position: 'relative',
                                width: 'fit-content',
                            }, children: [_jsx("img", { ref: imgRef, src: mapImage, alt: "Campaign map", className: "select-none pointer-events-none max-w-none", draggable: false, onLoad: handleImgLoad }), showGrid && (_jsxs("svg", { className: "absolute inset-0 pointer-events-none", width: imgSize.w, height: imgSize.h, style: { opacity: 0.25 }, children: [Array.from({ length: gridCols + 1 }, (_, i) => (_jsx("line", { x1: i * gridSize, y1: 0, x2: i * gridSize, y2: imgSize.h, stroke: "hsl(var(--foreground))", strokeWidth: 0.5 }, `v-${i}`))), Array.from({ length: gridRows + 1 }, (_, i) => (_jsx("line", { x1: 0, y1: i * gridSize, x2: imgSize.w, y2: i * gridSize, stroke: "hsl(var(--foreground))", strokeWidth: 0.5 }, `h-${i}`)))] })), _jsx(ObstacleLayer, { obstacles: obstacles, setObstacles: setObstacles, tool: obstacleTool, imgSize: imgSize, zoom: zoom, pan: pan, isDM: isDM, showForPlayer: showPlayerPreview }), _jsx(FogOfWarLayer, { gridSize: gridSize, gridCols: gridCols, gridRows: gridRows, imgSize: imgSize, viewers: viewers, obstacles: obstacles, isDM: isDM, showPlayerPreview: showPlayerPreview }), tokens.map(token => {
                                    // Hide tokens not visible to players
                                    if (!isTokenVisible(token))
                                        return null;
                                    const isCurrent = combatActive && token.id === currentTurnId;
                                    const isSelected = token.id === selectedToken;
                                    return (_jsxs("div", { className: "absolute group", style: {
                                            left: token.x - 18,
                                            top: token.y - 18,
                                            cursor: obstacleTool ? 'default' : 'move',
                                            zIndex: isCurrent ? 30 : 20,
                                        }, onPointerDown: (e) => handleTokenPointerDown(e, token.id), onClick: (e) => { e.stopPropagation(); setSelectedToken(token.id); }, children: [isCurrent && (_jsx("div", { className: "absolute -inset-1.5 rounded-full border-2 border-secondary animate-pulse" })), isSelected && !isCurrent && (_jsx("div", { className: "absolute -inset-1 rounded-full border border-foreground/50" })), token.icon ? (_jsx("img", { src: token.icon, className: "w-9 h-9 rounded-full object-cover border-2 select-none pointer-events-none", style: { borderColor: token.color }, alt: token.label, draggable: false })) : (_jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold text-background border-2 border-background/30 select-none", style: { backgroundColor: token.color }, children: token.label.slice(0, 2).toUpperCase() })), token.hp !== undefined && token.maxHp !== undefined && token.maxHp > 0 && (_jsx("div", { className: "w-9 h-1 bg-muted rounded-full mt-0.5 overflow-hidden", children: _jsx("div", { className: "h-full rounded-full transition-all", style: {
                                                        width: `${Math.max(0, (token.hp / token.maxHp) * 100)}%`,
                                                        backgroundColor: token.hp / token.maxHp > 0.5
                                                            ? 'hsl(120, 60%, 40%)'
                                                            : token.hp / token.maxHp > 0.25
                                                                ? 'hsl(45, 93%, 47%)'
                                                                : 'hsl(0, 72%, 51%)',
                                                    } }) })), _jsx("p", { className: "text-[8px] font-mono text-foreground text-center mt-0.5 whitespace-nowrap pointer-events-none select-none", children: token.label }), isDM && (_jsx("button", { onClick: (e) => { e.stopPropagation(); removeToken(token.id); }, className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(X, { className: "w-2 h-2" }) }))] }, token.id));
                                })] }) }), tokens.length > 0 && (_jsx("div", { className: "bg-card border-t border-border p-2 flex gap-2 flex-wrap shrink-0", children: tokens.map(t => (_jsxs("div", { className: `flex items-center gap-1 text-[10px] font-mono cursor-pointer rounded px-1 py-0.5 transition-colors ${t.id === selectedToken ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`, onClick: () => setSelectedToken(t.id), children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: t.color } }), t.label, t.hp !== undefined && _jsxs("span", { className: "text-[8px]", children: ["(", t.hp, "HP)"] }), isDM && (_jsx("button", { onClick: (e) => { e.stopPropagation(); removeToken(t.id); }, className: "hover:text-destructive", children: _jsx(Trash2, { className: "w-3 h-3" }) }))] }, t.id))) }))] }), _jsxs("div", { className: "w-56 shrink-0 bg-card border-l border-border overflow-y-auto hidden md:flex flex-col gap-2 p-2", children: [_jsx(InitiativeTracker, { tokens: tokens, currentTurnId: currentTurnId, entries: initiativeEntries, setEntries: setInitiativeEntries, onStartCombat: handleStartCombat, onNextTurn: handleNextTurn, onResetCombat: handleResetCombat, combatActive: combatActive, isDM: isDM }), combatActive && currentTurnToken && (_jsx(CombatPanel, { token: currentTurnToken, allTokens: tokens, gridSize: gridSize, ftPerCell: ftPerCell, onMoveToken: moveToken, onDamageToken: damageToken, onEndTurn: () => {
                            setCombatMovementUsed(0);
                            setCombatMoving(false);
                            handleNextTurn();
                        }, isCurrentTurn: true, movementUsed: combatMovementUsed, onSetMovementUsed: setCombatMovementUsed, onSetCombatMoving: setCombatMoving, combatMoving: combatMoving })), isDM && currentToken && currentToken.type === 'character' && (_jsxs("div", { className: "border border-border rounded p-2", children: [_jsxs("p", { className: "text-[9px] uppercase tracking-wider text-muted-foreground font-bold mb-1", children: ["Vision \u2014 ", currentToken.label] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => updateTokenVision(currentToken.id, Math.max(1, ((currentToken.visionRadius ?? DEFAULT_VISION_CELLS * gridSize) / gridSize) - 2)), className: "tactical-card !p-1 px-1", children: _jsx(Minus, { className: "w-3 h-3" }) }), _jsxs("span", { className: "font-mono text-[10px] text-foreground flex-1 text-center", children: [Math.round((currentToken.visionRadius ?? DEFAULT_VISION_CELLS * gridSize) / gridSize * ftPerCell), "ft"] }), _jsx("button", { onClick: () => updateTokenVision(currentToken.id, ((currentToken.visionRadius ?? DEFAULT_VISION_CELLS * gridSize) / gridSize) + 2), className: "tactical-card !p-1 px-1", children: _jsx(Plus, { className: "w-3 h-3" }) })] })] })), isDM && obstacles.length > 0 && (_jsxs("div", { className: "text-[9px] font-mono text-muted-foreground px-1", children: [obstacles.length, " obstacle", obstacles.length !== 1 ? 's' : '', " \u00B7 ", obstacles.filter(o => o.blocksVision).length, " vision \u00B7 ", obstacles.filter(o => o.blocksMovement).length, " movement"] }))] })] }));
}
