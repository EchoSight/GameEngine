import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function HpBar({ current, max }) {
    const pct = max > 0 ? (current / max) * 100 : 0;
    const color = pct > 50 ? 'bg-tactical-red' : pct > 25 ? 'bg-tactical-gold' : 'bg-destructive';
    return (_jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex justify-between items-baseline mb-1", children: [_jsx("span", { className: "stat-label", children: "HIT POINTS" }), _jsxs("span", { className: "font-mono text-sm tabular-nums", children: [_jsx("span", { className: "text-foreground", children: current }), _jsxs("span", { className: "text-muted-foreground", children: ["/", max] })] })] }), _jsx("div", { className: "h-1 w-full bg-muted overflow-hidden rounded-sm", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${pct}%` }, transition: { type: 'spring', duration: 0.3, bounce: 0 }, className: `h-full ${color}` }) })] }));
}
