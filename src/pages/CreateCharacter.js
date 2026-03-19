import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DND_CLASSES, DND_RACES, ABILITY_NAMES, CLASS_HIT_DIE, getModifier } from '@/lib/types';
import { addCharacter } from '@/lib/store';
import { StatBlock } from '@/components/StatBlock';
import { EquipmentDrawer } from '@/components/EquipmentDrawer';
import { EquipmentRow } from '@/components/EquipmentRow';
import { Plus } from 'lucide-react';
export default function CreateCharacter() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [race, setRace] = useState(DND_RACES[0]);
    const [dndClass, setDndClass] = useState(DND_CLASSES[0]);
    const [level, setLevel] = useState(1);
    const [abilities, setAbilities] = useState(ABILITY_NAMES.map(n => ({ name: n, score: 10 })));
    const [equipment, setEquipment] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const conMod = getModifier(abilities.find(a => a.name === 'CON')?.score ?? 10);
    const hitDie = CLASS_HIT_DIE[dndClass];
    const maxHp = hitDie + conMod + (level - 1) * (Math.floor(hitDie / 2) + 1 + conMod);
    const baseAc = 10 + getModifier(abilities.find(a => a.name === 'DEX')?.score ?? 10);
    const handleCreate = () => {
        if (!name.trim())
            return;
        const char = {
            id: `char-${Date.now()}`,
            name: name.trim(),
            race,
            class: dndClass,
            level,
            xp: 0,
            hp: Math.max(1, maxHp),
            maxHp: Math.max(1, maxHp),
            ac: baseAc,
            speed: 30,
            abilities,
            equipment,
            createdAt: new Date().toISOString(),
        };
        addCharacter(char);
        navigate(`/character/${char.id}`);
    };
    const updateAbility = (name, score) => {
        setAbilities(prev => prev.map(a => a.name === name ? { ...a, score } : a));
    };
    return (_jsxs("div", { className: "flex-1 overflow-y-auto p-4 md:p-6", children: [_jsx("h1", { className: "font-display text-base md:text-lg mb-4 md:mb-6 text-foreground", children: "INITIATE CHARACTER BUILD." }), _jsxs("section", { className: "mb-4 md:mb-6", children: [_jsx("p", { className: "tactical-header mb-3", children: "IDENTITY" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-1", children: [_jsxs("div", { className: "lg:col-span-6 tactical-card", children: [_jsx("label", { className: "stat-label block mb-2", children: "NAME" }), _jsx("input", { type: "text", value: name, onChange: e => setName(e.target.value), placeholder: "Enter character name...", className: "w-full bg-transparent font-display text-base md:text-lg text-foreground outline-none border-b border-border pb-1 placeholder:text-muted-foreground/50" })] }), _jsxs("div", { className: "lg:col-span-2 tactical-card", children: [_jsx("label", { className: "stat-label block mb-2", children: "RACE" }), _jsx("select", { value: race, onChange: e => setRace(e.target.value), className: "w-full bg-transparent font-mono text-sm text-foreground outline-none", children: DND_RACES.map(r => _jsx("option", { value: r, className: "bg-card", children: r }, r)) })] }), _jsxs("div", { className: "lg:col-span-2 tactical-card", children: [_jsx("label", { className: "stat-label block mb-2", children: "CLASS" }), _jsx("select", { value: dndClass, onChange: e => setDndClass(e.target.value), className: "w-full bg-transparent font-mono text-sm text-foreground outline-none", children: DND_CLASSES.map(c => _jsx("option", { value: c, className: "bg-card", children: c }, c)) })] }), _jsxs("div", { className: "lg:col-span-2 tactical-card", children: [_jsx("label", { className: "stat-label block mb-2", children: "LEVEL" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setLevel(Math.max(1, level - 1)), className: "text-muted-foreground hover:text-foreground font-mono", children: "\u2212" }), _jsx("span", { className: "font-mono text-lg tabular-nums text-foreground", children: level }), _jsx("button", { onClick: () => setLevel(Math.min(20, level + 1)), className: "text-muted-foreground hover:text-foreground font-mono", children: "+" })] })] })] })] }), _jsxs("section", { className: "mb-4 md:mb-6", children: [_jsx("p", { className: "tactical-header mb-3", children: "COMPUTED" }), _jsxs("div", { className: "grid grid-cols-3 gap-1", children: [_jsxs("div", { className: "tactical-card flex items-center justify-between", children: [_jsx("span", { className: "stat-label", children: "MAX HP" }), _jsx("span", { className: "font-mono text-lg md:text-xl tabular-nums text-foreground", children: Math.max(1, maxHp) })] }), _jsxs("div", { className: "tactical-card flex items-center justify-between", children: [_jsx("span", { className: "stat-label", children: "AC" }), _jsx("span", { className: "font-mono text-lg md:text-xl tabular-nums text-foreground", children: baseAc })] }), _jsxs("div", { className: "tactical-card flex items-center justify-between", children: [_jsx("span", { className: "stat-label", children: "HIT DIE" }), _jsxs("span", { className: "font-mono text-lg md:text-xl tabular-nums text-foreground", children: ["d", hitDie] })] })] })] }), _jsxs("section", { className: "mb-4 md:mb-6", children: [_jsx("p", { className: "tactical-header mb-3", children: "ABILITY SCORES" }), _jsx("div", { className: "grid grid-cols-3 sm:grid-cols-6 gap-1", children: abilities.map(ab => (_jsx(StatBlock, { ability: ab, editable: true, onScoreChange: score => updateAbility(ab.name, score) }, ab.name))) })] }), _jsxs("section", { className: "mb-4 md:mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("p", { className: "tactical-header", children: "EQUIPMENT" }), _jsxs(motion.button, { onClick: () => setDrawerOpen(true), className: "flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-muted-foreground hover:text-foreground transition-colors", whileTap: { scale: 0.98 }, children: [_jsx(Plus, { className: "w-3 h-3" }), " ADD ITEM"] })] }), _jsx("div", { className: "tactical-card p-0 overflow-hidden", children: equipment.length === 0 ? (_jsx("p", { className: "p-4 text-sm text-muted-foreground font-mono", children: "No equipment. Click ADD ITEM to browse catalog." })) : (equipment.map(item => (_jsx(EquipmentRow, { item: item, editable: true, onToggleEquip: id => setEquipment(prev => prev.map(i => i.id === id ? { ...i, equipped: !i.equipped } : i)), onRemove: id => setEquipment(prev => prev.filter(i => i.id !== id)) }, item.id)))) })] }), _jsx(motion.button, { onClick: handleCreate, disabled: !name.trim(), className: "w-full tactical-card text-center font-display text-sm tracking-widest uppercase border-foreground/20 hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed py-3", whileTap: { scale: 0.98 }, children: "FINALIZE BUILD" }), _jsx(EquipmentDrawer, { open: drawerOpen, onClose: () => setDrawerOpen(false), onAdd: item => {
                    setEquipment(prev => [...prev, item]);
                }, existingIds: equipment.map(e => e.id) })] }));
}
