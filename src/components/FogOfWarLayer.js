import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { isCellVisible } from '@/lib/visibility.js';
export function FogOfWarLayer({ gridSize, gridCols, gridRows, viewers, obstacles, isDM, showPlayerPreview, }) {
    const visibleCells = useMemo(() => {
        const visible = new Set();
        for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols; c++) {
                if (isCellVisible(c, r, gridSize, viewers, obstacles)) {
                    visible.add(`${c},${r}`);
                }
            }
        }
        return visible;
    }, [gridSize, gridCols, gridRows, viewers, obstacles]);
    // DM sees everything unless previewing player vision
    const showFog = !isDM || showPlayerPreview;
    if (!showFog)
        return null;
    return (_jsx("div", { className: "absolute inset-0", style: { pointerEvents: 'none', zIndex: 25 }, children: Array.from({ length: gridRows }, (_, row) => Array.from({ length: gridCols }, (_, col) => {
            const key = `${col},${row}`;
            const visible = visibleCells.has(key);
            if (visible)
                return null;
            return (_jsx("div", { className: "absolute", style: {
                    left: col * gridSize,
                    top: row * gridSize,
                    width: gridSize,
                    height: gridSize,
                    backgroundColor: showPlayerPreview
                        ? 'hsl(var(--background) / 0.6)'
                        : 'hsl(var(--background) / 0.95)',
                } }, key));
        })) }));
}
