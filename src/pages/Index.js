import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getCharacters } from '@/lib/store.js';
import { CharacterCard } from '@/components/CharacterCard.js';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
export default function CharacterList() {
    const [characters, setCharacters] = useState([]);
    useEffect(() => {
        setCharacters(getCharacters());
    }, []);
    return (_jsxs("div", { className: "flex-1 overflow-y-auto p-4 md:p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "font-display text-lg text-foreground", children: "CHARACTER ROSTER" }), _jsxs("p", { className: "text-[11px] text-muted-foreground uppercase tracking-widest", children: [characters.length, " BUILD", characters.length !== 1 ? 'S' : '', " REGISTERED"] })] }), _jsx(Link, { to: "/create", children: _jsxs(motion.div, { className: "tactical-card py-2 px-4 flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold cursor-pointer", whileTap: { scale: 0.98 }, children: [_jsx(Plus, { className: "w-3 h-3" }), " NEW BUILD"] }) })] }), characters.length === 0 ? (_jsxs("div", { className: "tactical-card text-center py-16", children: [_jsx("p", { className: "font-display text-muted-foreground text-sm tracking-widest mb-4", children: "NO CHARACTERS FOUND." }), _jsx(Link, { to: "/create", children: _jsx(motion.span, { className: "text-[11px] uppercase tracking-widest text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors", whileTap: { scale: 0.98 }, children: "INITIATE FIRST BUILD \u2192" }) })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1", children: characters.map(char => (_jsx(CharacterCard, { character: char }, char.id))) }))] }));
}
