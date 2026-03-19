import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footprints, Swords, Shield, XCircle, Check, ChevronDown } from 'lucide-react';
import { getCharacters } from '@/lib/store';
import { getModifier, getEquippedAC, getEquippedWeapons } from '@/lib/types';
export function CombatPanel({ token, allTokens, gridSize, ftPerCell, onMoveToken, onDamageToken, onEndTurn, isCurrentTurn, movementUsed, onSetMovementUsed, onSetCombatMoving, combatMoving, }) {
    const [mode, setMode] = useState('idle');
    const [hasAttacked, setHasAttacked] = useState(false);
    const [lastAttack, setLastAttack] = useState(null);
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const [showWeaponSelect, setShowWeaponSelect] = useState(false);
    const characters = getCharacters();
    const charData = characters.find(c => c.name === token.label);
    const maxMovement = charData?.speed || 30;
    const remainingFt = Math.max(0, maxMovement - movementUsed);
    // Get equipped weapons for this character
    const equippedWeapons = charData ? getEquippedWeapons(charData) : [];
    // Unarmed strike fallback
    const unarmedStrike = {
        id: 'unarmed',
        name: 'Unarmed Strike',
        weight: 0,
        quantity: 1,
        equipped: true,
        category: 'weapon',
        damageDie: 1,
        attackBonus: 0,
        damageBonus: 0,
    };
    const availableWeapons = equippedWeapons.length > 0 ? equippedWeapons : [unarmedStrike];
    // Get enemies (opposite type)
    const enemies = allTokens.filter(t => t.id !== token.id && t.type !== token.type);
    const performAttack = (targetId) => {
        const weapon = selectedWeapon || availableWeapons[0];
        if (!weapon)
            return;
        const target = allTokens.find(t => t.id === targetId);
        if (!target)
            return;
        const targetChar = characters.find(c => c.name === target.label);
        const targetAC = targetChar ? getEquippedAC(targetChar) : (target.type === 'monster' ? 10 + Math.floor(Math.random() * 6) : 10);
        // Attack roll: d20 + ability mod + weapon bonus
        const attackDie = Math.floor(Math.random() * 20) + 1;
        let attackMod = 0;
        if (charData) {
            const isFinesse = weapon.properties?.includes('finesse');
            const isRanged = weapon.properties?.includes('ranged');
            const str = charData.abilities.find(a => a.name === 'STR');
            const dex = charData.abilities.find(a => a.name === 'DEX');
            if (isRanged) {
                attackMod = dex ? getModifier(dex.score) : 0;
            }
            else if (isFinesse) {
                const strMod = str ? getModifier(str.score) : 0;
                const dexMod = dex ? getModifier(dex.score) : 0;
                attackMod = Math.max(strMod, dexMod);
            }
            else {
                attackMod = str ? getModifier(str.score) : 0;
            }
        }
        else {
            attackMod = Math.floor(Math.random() * 4) + 1;
        }
        const weaponAttackBonus = weapon.attackBonus || 0;
        const attackTotal = attackDie + attackMod + weaponAttackBonus;
        const natural20 = attackDie === 20;
        const natural1 = attackDie === 1;
        const hit = natural20 || (!natural1 && attackTotal >= targetAC);
        let damageRoll = 0;
        if (hit) {
            const damageDieSides = weapon.damageDie || 4;
            damageRoll = Math.floor(Math.random() * damageDieSides) + 1;
            damageRoll += (weapon.damageBonus || 0) + attackMod;
            damageRoll = Math.max(1, damageRoll);
            if (natural20)
                damageRoll *= 2;
            onDamageToken(targetId, damageRoll);
        }
        setLastAttack({
            attackRoll: attackTotal,
            targetAC,
            hit,
            damageRoll,
            targetName: target.label,
            natural20,
            natural1,
            weaponName: weapon.name,
        });
        setHasAttacked(true);
        setSelectedWeapon(null);
        setShowWeaponSelect(false);
        setMode('idle');
    };
    if (!isCurrentTurn) {
        return (_jsxs("div", { className: "bg-card border border-border rounded-sm p-3 text-center", children: [_jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Waiting for turn..." }), _jsx("p", { className: "font-mono text-sm text-foreground mt-1", children: token.label })] }));
    }
    return (_jsxs("div", { className: "bg-card border border-border rounded-sm overflow-hidden", children: [_jsx("div", { className: "p-2 border-b border-border flex items-center gap-2", children: _jsxs("span", { className: "text-[10px] uppercase tracking-widest font-bold text-secondary flex-1", children: [token.label, "'s Turn"] }) }), _jsxs("div", { className: "px-3 py-2 border-b border-border", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[9px] uppercase tracking-widest text-muted-foreground", children: "Movement" }), _jsxs("span", { className: "font-mono text-xs text-foreground", children: [remainingFt, "ft / ", maxMovement, "ft"] })] }), _jsx("div", { className: "w-full bg-muted rounded-full h-1.5 mt-1", children: _jsx("div", { className: "bg-secondary rounded-full h-1.5 transition-all", style: { width: `${Math.max(0, (remainingFt / maxMovement)) * 100}%` } }) })] }), _jsxs("div", { className: "p-2 flex flex-col gap-1", children: [_jsxs("button", { onClick: () => {
                            const newMode = mode === 'moving' ? 'idle' : 'moving';
                            setMode(newMode);
                            onSetCombatMoving(newMode === 'moving');
                        }, disabled: remainingFt <= 0, className: `tactical-card !p-2 flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold transition-colors ${combatMoving ? 'border-secondary text-secondary' : ''} disabled:opacity-30`, children: [_jsx(Footprints, { className: "w-3 h-3" }), combatMoving ? 'Click map to move' : `Move (${remainingFt}ft left)`] }), _jsxs("button", { onClick: () => {
                            if (mode === 'attacking') {
                                setMode('idle');
                                setShowWeaponSelect(false);
                            }
                            else {
                                setMode('attacking');
                                setShowWeaponSelect(true);
                            }
                        }, disabled: hasAttacked, className: `tactical-card !p-2 flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold transition-colors ${mode === 'attacking' ? 'border-accent text-accent' : ''} disabled:opacity-30`, children: [_jsx(Swords, { className: "w-3 h-3" }), hasAttacked ? 'Already attacked' : mode === 'attacking' ? 'Select weapon & target' : 'Attack'] }), _jsx(AnimatePresence, { children: mode === 'attacking' && showWeaponSelect && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "space-y-1 pl-2", children: [_jsx("p", { className: "text-[9px] uppercase tracking-widest text-muted-foreground py-1", children: "Choose Weapon" }), availableWeapons.map(w => (_jsxs("button", { onClick: () => { setSelectedWeapon(w); setShowWeaponSelect(false); }, className: `w-full tactical-card !p-2 flex items-center gap-2 text-[10px] font-mono text-foreground hover:border-accent ${selectedWeapon?.id === w.id ? 'border-accent text-accent' : ''}`, children: [_jsx(Swords, { className: "w-3 h-3 text-muted-foreground" }), _jsx("span", { className: "flex-1 text-left", children: w.name }), _jsxs("span", { className: "text-[8px] text-muted-foreground", children: ["1d", w.damageDie || 1, (w.damageBonus || 0) > 0 ? `+${w.damageBonus}` : ''] })] }, w.id)))] })) }), _jsx(AnimatePresence, { children: mode === 'attacking' && !showWeaponSelect && (selectedWeapon || availableWeapons.length === 1) && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "space-y-1 pl-2", children: [_jsxs("div", { className: "flex items-center justify-between py-1", children: [_jsxs("p", { className: "text-[9px] uppercase tracking-widest text-muted-foreground", children: ["Attacking with: ", _jsx("span", { className: "text-foreground", children: (selectedWeapon || availableWeapons[0])?.name })] }), _jsx("button", { onClick: () => setShowWeaponSelect(true), className: "text-[8px] text-muted-foreground hover:text-foreground", children: _jsx(ChevronDown, { className: "w-3 h-3" }) })] }), enemies.length === 0 ? (_jsx("p", { className: "text-[9px] text-muted-foreground py-1", children: "No targets" })) : (enemies.map(enemy => (_jsxs("button", { onClick: () => performAttack(enemy.id), className: "w-full tactical-card !p-2 flex items-center gap-2 text-[10px] font-mono text-foreground hover:border-accent", children: [_jsx("div", { className: "w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-background", style: { backgroundColor: enemy.color }, children: enemy.label[0] }), enemy.label, enemy.hp !== undefined && (_jsxs("span", { className: "ml-auto text-[9px] text-muted-foreground", children: [enemy.hp, "HP"] }))] }, enemy.id))))] })) }), _jsx(AnimatePresence, { children: lastAttack && (_jsxs(motion.div, { initial: { opacity: 0, y: -5 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, className: `tactical-card !p-2 text-[10px] font-mono ${lastAttack.hit ? 'border-secondary' : 'border-destructive'}`, children: [_jsxs("div", { className: "flex items-center gap-1 mb-1", children: [lastAttack.hit ? (_jsx(Check, { className: "w-3 h-3 text-secondary" })) : (_jsx(XCircle, { className: "w-3 h-3 text-destructive" })), _jsx("span", { className: lastAttack.hit ? 'text-secondary' : 'text-destructive', children: lastAttack.natural20 ? 'CRITICAL HIT!' : lastAttack.natural1 ? 'CRITICAL MISS!' : lastAttack.hit ? 'HIT!' : 'MISS!' })] }), _jsxs("p", { className: "text-muted-foreground", children: [lastAttack.weaponName, ": ", lastAttack.attackRoll, " vs AC ", lastAttack.targetAC, " (", lastAttack.targetName, ")"] }), lastAttack.hit && (_jsxs("p", { className: "text-foreground font-bold", children: [lastAttack.damageRoll, " damage", lastAttack.natural20 ? ' (crit!)' : ''] }))] })) }), _jsxs("button", { onClick: () => {
                            setMode('idle');
                            onSetMovementUsed(0);
                            setHasAttacked(false);
                            setLastAttack(null);
                            setSelectedWeapon(null);
                            onSetCombatMoving(false);
                            onEndTurn();
                        }, className: "tactical-card !p-2 flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold border-muted-foreground/30 hover:border-foreground", children: [_jsx(Shield, { className: "w-3 h-3" }), "End Turn"] })] })] }));
}
