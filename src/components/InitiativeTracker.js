import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, SkipForward, RotateCcw, Swords } from 'lucide-react';
import { getCharacters } from '@/lib/store.js';
import { getModifier } from '@/lib/types.js';
export function InitiativeTracker({ tokens, currentTurnId, entries, setEntries, onStartCombat, onNextTurn, onResetCombat, combatActive, isDM, }) {
    const [rolling, setRolling] = useState(false);
    const rollInitiative = () => {
        const characters = getCharacters();
        setRolling(true);
        const newEntries = tokens.map(token => {
            const roll = Math.floor(Math.random() * 20) + 1;
            let mod = 0;
            if (token.type === 'character') {
                const char = characters.find(c => c.name === token.label);
                if (char) {
                    const dex = char.abilities.find(a => a.name === 'DEX');
                    if (dex)
                        mod = getModifier(dex.score);
                }
            }
            else {
                // Monsters get a random DEX mod between -1 and +3
                mod = Math.floor(Math.random() * 5) - 1;
            }
            return {
                tokenId: token.id,
                label: token.label,
                roll,
                modifier: mod,
                total: roll + mod,
                color: token.color,
                icon: token.icon,
            };
        });
        // Sort descending by total
        newEntries.sort((a, b) => b.total - a.total);
        setEntries(newEntries);
        setTimeout(() => setRolling(false), 300);
    };
    if (tokens.length === 0) {
        return (_jsx("div", { className: "p-3 text-center", children: _jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "Add tokens to roll initiative" }) }));
    }
    return (_jsxs("div", { className: "bg-card border border-border rounded-sm overflow-hidden", children: [_jsxs("div", { className: "p-2 border-b border-border flex items-center gap-2", children: [_jsx(Swords, { className: "w-3 h-3 text-muted-foreground" }), _jsx("span", { className: "text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex-1", children: "Initiative" }), isDM && (_jsx("div", { className: "flex gap-1", children: !combatActive ? (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: rollInitiative, className: "tactical-card !p-1 px-2 text-[9px] uppercase tracking-wider font-bold flex items-center gap-1", disabled: rolling, children: [_jsx(Play, { className: "w-3 h-3" }), " Roll"] }), entries.length > 0 && (_jsxs("button", { onClick: onStartCombat, className: "tactical-card !p-1 px-2 text-[9px] uppercase tracking-wider font-bold flex items-center gap-1 border-secondary text-secondary", children: [_jsx(Swords, { className: "w-3 h-3" }), " Start"] }))] })) : (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: onNextTurn, className: "tactical-card !p-1 px-2 text-[9px] uppercase tracking-wider font-bold flex items-center gap-1", children: [_jsx(SkipForward, { className: "w-3 h-3" }), " Next"] }), _jsx("button", { onClick: onResetCombat, className: "tactical-card !p-1 px-2 text-[9px] uppercase tracking-wider font-bold flex items-center gap-1", children: _jsx(RotateCcw, { className: "w-3 h-3" }) })] })) }))] }), _jsx(AnimatePresence, { mode: "popLayout", children: entries.map((entry, i) => {
                    const isCurrent = combatActive && entry.tokenId === currentTurnId;
                    return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 10 }, className: `flex items-center gap-2 px-3 py-2 border-b border-border last:border-0 transition-colors ${isCurrent ? 'bg-secondary/20 border-l-2 border-l-secondary' : ''}`, children: [_jsx("span", { className: "font-mono text-[10px] text-muted-foreground w-4", children: i + 1 }), entry.icon ? (_jsx("img", { src: entry.icon, className: "w-5 h-5 rounded-full object-cover", alt: "" })) : (_jsx("div", { className: "w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-background", style: { backgroundColor: entry.color }, children: entry.label.slice(0, 2).toUpperCase() })), _jsx("span", { className: "text-[11px] font-mono text-foreground flex-1 truncate", children: entry.label }), _jsx("span", { className: "font-mono text-sm font-bold text-foreground", children: entry.total }), _jsxs("span", { className: "text-[9px] text-muted-foreground font-mono", children: ["(", entry.roll, entry.modifier >= 0 ? '+' : '', entry.modifier, ")"] })] }, entry.tokenId));
                }) }), entries.length === 0 && (_jsx("div", { className: "p-4 text-center", children: _jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: isDM ? 'Click Roll to begin' : 'Waiting for DM...' }) }))] }));
}
