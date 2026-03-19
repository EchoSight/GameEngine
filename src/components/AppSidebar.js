import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, BookOpen, Menu, X, Dices, Map, Shield, Eye } from 'lucide-react';
import { useGame } from '@/lib/GameContext.js';
export function AppSidebar() {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const { role, setRole, isDM } = useGame();
    const links = [
        { to: '/', label: 'CHARACTERS', icon: Users },
        { to: '/create', label: 'NEW BUILD', icon: Plus },
        { to: '/dice', label: 'DICE ROLLER', icon: Dices },
        { to: '/maps', label: 'MAPS', icon: Map },
        { to: '/resources', label: 'RESOURCES', icon: BookOpen },
    ];
    const roleToggle = (_jsx("div", { className: "p-3 border-b border-sidebar-border", children: _jsxs("button", { onClick: () => setRole(isDM ? 'player' : 'dm'), className: `w-full flex items-center gap-2 px-3 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-colors ${isDM
                ? 'bg-accent/20 text-accent border border-accent/30'
                : 'bg-secondary/20 text-secondary border border-secondary/30'}`, children: [isDM ? _jsx(Shield, { className: "w-3 h-3" }) : _jsx(Eye, { className: "w-3 h-3" }), isDM ? 'DUNGEON MASTER' : 'PLAYER VIEW'] }) }));
    const nav = (_jsx("nav", { className: "flex-1 p-2", children: links.map(link => {
            const active = location.pathname === link.to;
            return (_jsx(Link, { to: link.to, onClick: () => setOpen(false), children: _jsxs(motion.div, { className: `flex items-center gap-3 px-3 py-2 rounded-sm text-[11px] uppercase tracking-widest font-bold transition-colors ${active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/50'}`, whileTap: { scale: 0.98 }, children: [_jsx(link.icon, { className: "w-4 h-4" }), link.label] }) }, link.to));
        }) }));
    return (_jsxs(_Fragment, { children: [_jsxs("aside", { className: "hidden md:flex w-[240px] min-h-screen bg-sidebar border-r border-sidebar-border flex-col shrink-0", children: [_jsxs("div", { className: "p-4 border-b border-sidebar-border", children: [_jsxs("h1", { className: "font-display text-sm tracking-widest text-foreground", children: ["TACTICAL", _jsx("br", {}), "SLATE"] }), _jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest mt-1", children: "CHARACTER ENGINE" })] }), roleToggle, nav, _jsx("div", { className: "p-4 border-t border-sidebar-border", children: _jsxs("p", { className: "text-[9px] text-muted-foreground uppercase tracking-widest", children: ["v1.1 // ", isDM ? 'DM MODE' : 'PLAYER MODE'] }) })] }), _jsxs("div", { className: "md:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4 py-3", children: [_jsx("span", { className: "font-display text-xs tracking-widest text-foreground", children: "TACTICAL SLATE" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setRole(isDM ? 'player' : 'dm'), className: `text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm ${isDM ? 'text-accent' : 'text-secondary'}`, children: isDM ? 'DM' : 'PLR' }), _jsxs("button", { onClick: () => setOpen(!open), className: "text-foreground", children: [open ? _jsx(X, { className: "w-5 h-5" }) : _jsx(Menu, { className: "w-5 h-5" }), _jsx("span", { className: "sr-only", children: "MENU" })] })] })] }), _jsx(AnimatePresence, { children: open && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "md:hidden fixed inset-0 bg-background/60 z-40 pt-12", onClick: () => setOpen(false) }), _jsxs(motion.div, { initial: { y: -10, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -10, opacity: 0 }, transition: { duration: 0.15 }, className: "md:hidden fixed top-12 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border", children: [roleToggle, nav] })] })) })] }));
}
