import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { xpForLevel, getEquippedAC } from '@/lib/types.js';
import { getCharacters, updateCharacter, deleteCharacter } from '@/lib/store.js';
import { StatBlock } from '@/components/StatBlock.js';
import { HpBar } from '@/components/HpBar.js';
import { EquipmentRow } from '@/components/EquipmentRow.js';
import { EquipmentDrawer } from '@/components/EquipmentDrawer.js';
import { ArrowLeft, Plus, Trash2, Edit2, Save, Camera } from 'lucide-react';
import { useRef } from 'react';
export default function CharacterView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [char, setChar] = useState(null);
    const [editing, setEditing] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const iconInputRef = useRef(null);
    const handleIconUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file || !char)
            return;
        if (file.size > 2 * 1024 * 1024) {
            alert('Max 2MB');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            save({ ...char, icon: reader.result });
        };
        reader.readAsDataURL(file);
    };
    useEffect(() => {
        const found = getCharacters().find(c => c.id === id);
        if (!found)
            navigate('/');
        else
            setChar(found);
    }, [id]);
    if (!char)
        return null;
    const save = (updated) => {
        setChar(updated);
        updateCharacter(updated);
    };
    const handleDelete = () => {
        deleteCharacter(char.id);
        navigate('/');
    };
    const xpNext = xpForLevel(char.level + 1);
    return (_jsxs("div", { className: "flex-1 overflow-y-auto p-4 md:p-6", children: [_jsxs("div", { className: "flex items-center gap-3 md:gap-4 mb-2", children: [_jsxs("button", { onClick: () => navigate('/'), className: "text-muted-foreground hover:text-foreground transition-colors", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), _jsx("span", { className: "sr-only", children: "BACK" })] }), _jsxs("div", { className: "relative shrink-0", children: [char.icon ? (_jsx("img", { src: char.icon, className: "w-12 h-12 rounded-full object-cover border border-border", alt: "" })) : (_jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: _jsx("span", { className: "font-mono text-lg text-muted-foreground", children: char.name[0] }) })), editing && (_jsx("button", { onClick: () => iconInputRef.current?.click(), className: "absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-foreground text-background flex items-center justify-center", children: _jsx(Camera, { className: "w-3 h-3" }) })), _jsx("input", { ref: iconInputRef, type: "file", accept: "image/*", onChange: handleIconUpload, className: "hidden" })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h1", { className: "font-display text-base md:text-xl text-foreground truncate", children: char.name }), _jsxs("p", { className: "text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-widest", children: ["LVL ", char.level, " ", char.race, " ", char.class] })] }), _jsxs("div", { className: "flex gap-1 md:gap-2 shrink-0", children: [_jsx(motion.button, { onClick: () => setEditing(!editing), className: "tactical-card py-1.5 md:py-2 px-2 md:px-3 flex items-center gap-1 md:gap-2 text-[9px] md:text-[10px] uppercase tracking-widest", whileTap: { scale: 0.98 }, children: editing ? _jsxs(_Fragment, { children: [_jsx(Save, { className: "w-3 h-3" }), " ", _jsx("span", { className: "hidden sm:inline", children: "DONE" })] }) : _jsxs(_Fragment, { children: [_jsx(Edit2, { className: "w-3 h-3" }), " ", _jsx("span", { className: "hidden sm:inline", children: "EDIT" })] }) }), _jsxs(motion.button, { onClick: handleDelete, className: "tactical-card py-1.5 md:py-2 px-2 md:px-3 flex items-center gap-1 md:gap-2 text-[9px] md:text-[10px] uppercase tracking-widest text-destructive", whileTap: { scale: 0.98 }, children: [_jsx(Trash2, { className: "w-3 h-3" }), " ", _jsx("span", { className: "hidden sm:inline", children: "DELETE" })] })] })] }), _jsx("div", { className: "h-[2px] w-full bg-muted mb-4 md:mb-6 overflow-hidden rounded-sm", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: xpNext > 0 ? `${(char.xp / xpNext) * 100}%` : '100%' }, className: "h-full bg-tactical-gold", transition: { type: 'spring', duration: 0.3, bounce: 0 } }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-1 mb-4 md:mb-6", children: [_jsxs("div", { className: "md:col-span-4", children: [_jsx("p", { className: "tactical-header mb-2", children: "ABILITIES" }), _jsx("div", { className: "grid grid-cols-3 gap-1", children: char.abilities.map(ab => (_jsx(StatBlock, { ability: ab, editable: editing, onScoreChange: score => {
                                        const updated = {
                                            ...char,
                                            abilities: char.abilities.map(a => a.name === ab.name ? { ...a, score } : a)
                                        };
                                        updated.ac = getEquippedAC(updated);
                                        save(updated);
                                    } }, ab.name))) })] }), _jsxs("div", { className: "md:col-span-4 space-y-1", children: [_jsx("p", { className: "tactical-header mb-2", children: "COMBAT" }), _jsxs("div", { className: "tactical-card", children: [_jsx(HpBar, { current: char.hp, max: char.maxHp }), editing && (_jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx("button", { onClick: () => save({ ...char, hp: Math.max(0, char.hp - 1) }), className: "flex-1 text-center text-[10px] uppercase tracking-widest text-destructive border border-border rounded-sm py-1 hover:bg-destructive/10", children: "DAMAGE" }), _jsx("button", { onClick: () => save({ ...char, hp: Math.min(char.maxHp, char.hp + 1) }), className: "flex-1 text-center text-[10px] uppercase tracking-widest text-tactical-blue border border-border rounded-sm py-1 hover:bg-tactical-blue/10", children: "HEAL" })] }))] }), _jsxs("div", { className: "grid grid-cols-3 gap-1", children: [_jsxs("div", { className: "tactical-card text-center", children: [_jsx("span", { className: "font-mono text-xl md:text-2xl tabular-nums text-foreground", children: char.ac }), _jsx("p", { className: "stat-label", children: "AC" })] }), _jsxs("div", { className: "tactical-card text-center", children: [_jsx("span", { className: "font-mono text-xl md:text-2xl tabular-nums text-foreground", children: char.speed }), _jsx("p", { className: "stat-label", children: "SPEED" })] }), _jsxs("div", { className: "tactical-card text-center", children: [_jsx("span", { className: "font-mono text-xl md:text-2xl tabular-nums text-foreground", children: char.level }), _jsx("p", { className: "stat-label", children: "LEVEL" })] })] })] }), _jsxs("div", { className: "md:col-span-4", children: [_jsx("p", { className: "tactical-header mb-2", children: "INFO" }), _jsxs("div", { className: "tactical-card space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "stat-label", children: "RACE" }), _jsx("span", { className: "font-mono text-sm text-foreground", children: char.race })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "stat-label", children: "CLASS" }), _jsx("span", { className: "font-mono text-sm text-foreground", children: char.class })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "stat-label", children: "XP" }), _jsxs("span", { className: "font-mono text-sm tabular-nums text-foreground", children: [char.xp, " / ", xpNext] })] }), editing && (_jsx("div", { className: "flex gap-2 pt-1", children: _jsx("button", { onClick: () => save({ ...char, level: Math.min(20, char.level + 1) }), className: "flex-1 text-center text-[10px] uppercase tracking-widest text-tactical-gold border border-border rounded-sm py-1 hover:bg-tactical-gold/10", children: "LEVEL UP" }) }))] })] })] }), _jsxs("section", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "tactical-header", children: "EQUIPMENT" }), editing && (_jsxs(motion.button, { onClick: () => setDrawerOpen(true), className: "flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-muted-foreground hover:text-foreground transition-colors", whileTap: { scale: 0.98 }, children: [_jsx(Plus, { className: "w-3 h-3" }), " ADD ITEM"] }))] }), _jsx("div", { className: "tactical-card p-0 overflow-hidden", children: char.equipment.length === 0 ? (_jsx("p", { className: "p-4 text-sm text-muted-foreground font-mono", children: "No equipment." })) : (char.equipment.map(item => (_jsx(EquipmentRow, { item: item, editable: editing, onToggleEquip: id => {
                                const updated = { ...char, equipment: char.equipment.map(i => i.id === id ? { ...i, equipped: !i.equipped } : i) };
                                updated.ac = getEquippedAC(updated);
                                save(updated);
                            }, onRemove: id => {
                                save({ ...char, equipment: char.equipment.filter(i => i.id !== id) });
                            } }, item.id)))) }), _jsx("div", { className: "flex justify-end mt-1", children: _jsxs("span", { className: "text-[10px] text-muted-foreground font-mono tabular-nums", children: ["TOTAL WEIGHT: ", char.equipment.reduce((s, i) => s + i.weight * i.quantity, 0), " lb"] }) })] }), _jsx(EquipmentDrawer, { open: drawerOpen, onClose: () => setDrawerOpen(false), onAdd: item => {
                    save({ ...char, equipment: [...char.equipment, item] });
                }, existingIds: char.equipment.map(e => e.id) })] }));
}
