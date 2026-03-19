import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DICE, rollExpression, quickRoll } from '@/lib/dice.js';
import { Dices, RotateCcw, ChevronUp, ChevronDown } from 'lucide-react';
export default function DiceRoller() {
    const [history, setHistory] = useState([]);
    const [expression, setExpression] = useState('1d20');
    const [advMode, setAdvMode] = useState('normal');
    const [lastRoll, setLastRoll] = useState(null);
    const [rolling, setRolling] = useState(false);
    const inputRef = useRef(null);
    const doRoll = (expr) => {
        const adv = advMode === 'normal' ? undefined : advMode;
        const result = expr
            ? rollExpression(expr, adv)
            : rollExpression(expression, adv);
        if (!result)
            return;
        setRolling(true);
        setTimeout(() => {
            setLastRoll(result);
            setHistory(prev => [result, ...prev].slice(0, 50));
            setRolling(false);
        }, 300);
    };
    const doQuickRoll = (sides) => {
        setRolling(true);
        setTimeout(() => {
            const result = quickRoll(sides);
            setLastRoll(result);
            setHistory(prev => [result, ...prev].slice(0, 50));
            setRolling(false);
        }, 300);
    };
    const isCrit = lastRoll && lastRoll.rolls.length === 1 && lastRoll.rolls[0].die === 20 && lastRoll.rolls[0].result === 20;
    const isFumble = lastRoll && lastRoll.rolls.length === 1 && lastRoll.rolls[0].die === 20 && lastRoll.rolls[0].result === 1;
    return (_jsxs("div", { className: "flex-1 overflow-y-auto p-4 md:p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h1", { className: "font-display text-lg text-foreground", children: "DICE ROLLER" }), _jsxs("p", { className: "text-[11px] text-muted-foreground uppercase tracking-widest", children: [history.length, " ROLL", history.length !== 1 ? 'S' : '', " THIS SESSION"] })] }), _jsxs("section", { className: "mb-6", children: [_jsx("p", { className: "tactical-header mb-3", children: "QUICK ROLL" }), _jsx("div", { className: "grid grid-cols-4 sm:grid-cols-7 gap-1", children: DICE.map(die => (_jsxs(motion.button, { onClick: () => doQuickRoll(die.sides), className: "tactical-card text-center py-3 md:py-4 cursor-pointer", whileTap: { scale: 0.95 }, whileHover: { borderColor: 'rgba(255,255,255,0.2)' }, children: [_jsx("span", { className: "text-xl md:text-2xl block mb-1", children: die.icon }), _jsx("span", { className: "font-mono text-xs uppercase tracking-wider text-muted-foreground", children: die.label })] }, die.sides))) })] }), _jsxs("section", { className: "mb-6", children: [_jsx("p", { className: "tactical-header mb-3", children: "CUSTOM EXPRESSION" }), _jsxs("div", { className: "tactical-card", children: [_jsxs("div", { className: "flex gap-2 items-end", children: [_jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "stat-label block mb-1", children: "EXPRESSION" }), _jsx("input", { ref: inputRef, value: expression, onChange: e => setExpression(e.target.value), onKeyDown: e => e.key === 'Enter' && doRoll(), placeholder: "2d6+3", className: "w-full bg-transparent font-mono text-lg text-foreground outline-none border-b border-border pb-1 placeholder:text-muted-foreground/50" })] }), _jsxs(motion.button, { onClick: () => doRoll(), disabled: rolling, className: "px-4 py-2 font-mono text-[11px] uppercase tracking-widest border border-border rounded-sm hover:bg-foreground hover:text-background transition-colors disabled:opacity-50", whileTap: { scale: 0.95 }, children: [_jsx(Dices, { className: "w-4 h-4 inline mr-2" }), "ROLL"] })] }), _jsx("div", { className: "flex gap-1 mt-3", children: ['normal', 'advantage', 'disadvantage'].map(mode => (_jsxs("button", { onClick: () => setAdvMode(mode), className: `text-[10px] uppercase tracking-wider px-3 py-1 rounded-sm transition-colors ${advMode === mode
                                        ? 'bg-foreground text-background'
                                        : 'text-muted-foreground hover:text-foreground'}`, children: [mode === 'advantage' && _jsx(ChevronUp, { className: "w-3 h-3 inline mr-1" }), mode === 'disadvantage' && _jsx(ChevronDown, { className: "w-3 h-3 inline mr-1" }), mode] }, mode))) })] })] }), _jsx(AnimatePresence, { mode: "wait", children: lastRoll && (_jsxs(motion.section, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, className: "mb-6", children: [_jsx("p", { className: "tactical-header mb-3", children: "RESULT" }), _jsxs("div", { className: `tactical-card text-center py-6 md:py-8 ${isCrit ? 'border-tactical-gold' : isFumble ? 'border-destructive' : ''}`, children: [_jsx(motion.span, { className: `font-mono text-5xl md:text-7xl tabular-nums ${isCrit ? 'text-tactical-gold' : isFumble ? 'text-destructive' : 'text-foreground'}`, initial: { scale: 1.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { type: 'spring', bounce: 0.5 }, children: lastRoll.total }), isCrit && (_jsx("p", { className: "font-display text-sm text-tactical-gold mt-2 tracking-widest", children: "NATURAL 20! CRITICAL HIT!" })), isFumble && (_jsx("p", { className: "font-display text-sm text-destructive mt-2 tracking-widest", children: "NATURAL 1! CRITICAL FAIL!" })), _jsxs("p", { className: "font-mono text-xs text-muted-foreground mt-2", children: [lastRoll.expression, lastRoll.rolls.length > 1 && ` → [${lastRoll.rolls.map(r => r.result).join(', ')}]`, lastRoll.modifier !== 0 && ` ${lastRoll.modifier >= 0 ? '+' : ''}${lastRoll.modifier}`, lastRoll.advantage && ` (${lastRoll.advantage})`] })] })] }, lastRoll.id)) }), history.length > 0 && (_jsxs("section", { children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("p", { className: "tactical-header", children: "ROLL HISTORY" }), _jsxs("button", { onClick: () => { setHistory([]); setLastRoll(null); }, className: "text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-wider flex items-center gap-1", children: [_jsx(RotateCcw, { className: "w-3 h-3" }), " CLEAR"] })] }), _jsx("div", { className: "space-y-1 max-h-[300px] overflow-y-auto", children: history.map(roll => (_jsxs("div", { className: "tactical-card py-2 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("span", { className: "font-mono text-sm text-foreground", children: roll.expression }), roll.advantage && (_jsx("span", { className: "text-[9px] ml-2 text-muted-foreground uppercase", children: roll.advantage }))] }), _jsx("span", { className: "font-mono text-lg tabular-nums text-foreground", children: roll.total })] }, roll.id))) })] }))] }));
}
