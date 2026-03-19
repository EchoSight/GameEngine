import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices, X } from 'lucide-react';
import { DICE, quickRoll } from '@/lib/dice.js';
export function DiceFloatingButton() {
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState(null);
    const handleRoll = (sides) => {
        const r = quickRoll(sides);
        setResult(r);
        setTimeout(() => setResult(null), 2000);
    };
    const isCrit = result && result.rolls[0].die === 20 && result.rolls[0].result === 20;
    const isFumble = result && result.rolls[0].die === 20 && result.rolls[0].result === 1;
    return (_jsxs("div", { className: "fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2", children: [_jsx(AnimatePresence, { children: result && (_jsxs(motion.div, { initial: { opacity: 0, y: 10, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 10, scale: 0.9 }, className: `tactical-card px-4 py-3 text-center mb-1 ${isCrit ? 'border-tactical-gold' : isFumble ? 'border-destructive' : ''}`, children: [_jsx("span", { className: `font-mono text-2xl tabular-nums ${isCrit ? 'text-tactical-gold' : isFumble ? 'text-destructive' : 'text-foreground'}`, children: result.total }), _jsx("p", { className: "font-mono text-[10px] text-muted-foreground", children: result.expression })] })) }), _jsx(AnimatePresence, { children: open && (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 }, className: "flex flex-col gap-1 mb-1", children: DICE.filter(d => d.sides !== 100).map(die => (_jsxs(motion.button, { onClick: () => handleRoll(die.sides), className: "tactical-card w-12 h-12 flex flex-col items-center justify-center cursor-pointer", whileTap: { scale: 0.9 }, whileHover: { borderColor: 'rgba(255,255,255,0.2)' }, children: [_jsx("span", { className: "text-sm", children: die.icon }), _jsx("span", { className: "font-mono text-[9px] text-muted-foreground", children: die.label })] }, die.sides))) })) }), _jsx(motion.button, { onClick: () => setOpen(!open), className: "w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg", whileTap: { scale: 0.9 }, whileHover: { scale: 1.05 }, children: open ? _jsx(X, { className: "w-5 h-5" }) : _jsx(Dices, { className: "w-5 h-5" }) })] }));
}
