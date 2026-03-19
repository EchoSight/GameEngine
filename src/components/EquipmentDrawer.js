import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EQUIPMENT_CATALOG } from '@/lib/types.js';
import { X, Search, Plus } from 'lucide-react';
export function EquipmentDrawer({ open, onClose, onAdd, existingIds }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const filtered = useMemo(() => {
        return EQUIPMENT_CATALOG.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === 'all' || item.category === filter;
            return matchesSearch && matchesFilter;
        });
    }, [search, filter]);
    const categories = ['all', 'weapon', 'armor', 'gear', 'consumable'];
    return (_jsx(AnimatePresence, { children: open && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-background/60 z-40", onClick: onClose }), _jsxs(motion.div, { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' }, transition: { type: 'spring', duration: 0.3, bounce: 0 }, className: "fixed right-0 top-0 h-full w-full sm:w-[360px] bg-card border-l border-border z-50 flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-border", children: [_jsx("span", { className: "tactical-header", children: "EQUIPMENT CATALOG" }), _jsxs("button", { onClick: onClose, className: "text-muted-foreground hover:text-foreground", children: [_jsx(X, { className: "w-4 h-4" }), _jsx("span", { className: "sr-only", children: "CLOSE" })] })] }), _jsxs("div", { className: "p-4 border-b border-border space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 bg-muted rounded-sm px-3 py-2", children: [_jsx(Search, { className: "w-3 h-3 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "Search equipment...", value: search, onChange: e => setSearch(e.target.value), className: "bg-transparent text-sm font-mono text-foreground outline-none flex-1 placeholder:text-muted-foreground" })] }), _jsx("div", { className: "flex gap-1", children: categories.map(cat => (_jsx("button", { onClick: () => setFilter(cat), className: `text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm transition-colors ${filter === cat ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`, children: cat }, cat))) })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: filtered.map((item, i) => (_jsxs(motion.button, { className: "w-full flex items-center gap-3 px-4 py-3 border-b border-border text-left hover:bg-muted/30 transition-colors", whileTap: { scale: 0.98 }, onClick: () => {
                                    const id = `eq-${Date.now()}-${i}`;
                                    onAdd({ ...item, id, equipped: false });
                                }, children: [_jsx(Plus, { className: "w-3 h-3 text-muted-foreground" }), _jsxs("div", { className: "flex-1", children: [_jsx("span", { className: "text-sm font-mono text-foreground", children: item.name }), _jsxs("div", { className: "flex gap-3 mt-0.5", children: [_jsx("span", { className: "text-[10px] text-muted-foreground uppercase", children: item.category }), _jsxs("span", { className: "text-[10px] text-muted-foreground tabular-nums", children: [item.weight, " lb"] })] })] })] }, item.name))) })] })] })) }));
}
