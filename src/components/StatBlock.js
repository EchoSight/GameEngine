import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { formatModifier } from '@/lib/types.js';
export function StatBlock({ ability, onScoreChange, editable }) {
    return (_jsxs(motion.div, { className: "tactical-card flex flex-col items-center justify-center gap-1 min-w-[80px] aspect-square", whileHover: { backgroundColor: 'rgba(255,255,255,0.03)' }, transition: { duration: 0.15 }, children: [_jsx("span", { className: "stat-label", children: ability.name }), _jsx("span", { className: "stat-value", children: formatModifier(ability.score) }), _jsxs("div", { className: "flex items-center gap-1", children: [editable && (_jsx("button", { onClick: () => onScoreChange?.(Math.max(1, ability.score - 1)), className: "text-muted-foreground hover:text-foreground text-xs font-mono px-1", children: "\u2212" })), _jsx("span", { className: "text-xs font-mono text-muted-foreground", children: ability.score }), editable && (_jsx("button", { onClick: () => onScoreChange?.(Math.min(20, ability.score + 1)), className: "text-muted-foreground hover:text-foreground text-xs font-mono px-1", children: "+" }))] })] }));
}
