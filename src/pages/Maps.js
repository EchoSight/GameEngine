import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapCanvas } from '@/components/MapCanvas';
import { Plus, X, Upload, Maximize2, ArrowLeft } from 'lucide-react';
const MAPS_KEY = 'dnd_maps';
function getMaps() {
    const data = localStorage.getItem(MAPS_KEY);
    return data ? JSON.parse(data) : [];
}
function saveMaps(maps) {
    localStorage.setItem(MAPS_KEY, JSON.stringify(maps));
}
export default function Maps() {
    const [maps, setMaps] = useState(getMaps());
    const [activeMapId, setActiveMapId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [mapName, setMapName] = useState('');
    const [preview, setPreview] = useState(null);
    const fileRef = useRef(null);
    const activeMap = maps.find(m => m.id === activeMapId);
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        if (file.size > 5 * 1024 * 1024) {
            alert('Max file size is 5MB');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
            if (!mapName)
                setMapName(file.name.replace(/\.[^.]+$/, ''));
        };
        reader.readAsDataURL(file);
    };
    const handleUpload = () => {
        if (!preview || !mapName.trim())
            return;
        const entry = {
            id: `map-${Date.now()}`,
            name: mapName.trim(),
            image: preview,
            createdAt: new Date().toISOString(),
        };
        const updated = [...maps, entry];
        saveMaps(updated);
        setMaps(updated);
        setUploading(false);
        setMapName('');
        setPreview(null);
    };
    const handleDelete = (id) => {
        const updated = maps.filter(m => m.id !== id);
        saveMaps(updated);
        setMaps(updated);
        localStorage.removeItem(`map-tokens-${id}`);
        if (activeMapId === id)
            setActiveMapId(null);
    };
    // Active map view (full canvas)
    if (activeMap) {
        return (_jsxs("div", { className: "flex-1 flex flex-col h-screen md:h-auto overflow-hidden", children: [_jsxs("div", { className: "flex items-center gap-3 p-3 bg-card border-b border-border shrink-0", children: [_jsx("button", { onClick: () => setActiveMapId(null), className: "text-muted-foreground hover:text-foreground", children: _jsx(ArrowLeft, { className: "w-4 h-4" }) }), _jsx("h2", { className: "font-display text-sm text-foreground truncate", children: activeMap.name })] }), _jsx("div", { className: "flex-1 min-h-0", children: _jsx(MapCanvas, { mapImage: activeMap.image, mapId: activeMap.id }) })] }));
    }
    return (_jsxs("div", { className: "flex-1 overflow-y-auto p-4 md:p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "font-display text-lg text-foreground", children: "CAMPAIGN MAPS" }), _jsxs("p", { className: "text-[11px] text-muted-foreground uppercase tracking-widest", children: [maps.length, " MAP", maps.length !== 1 ? 'S' : '', " UPLOADED"] })] }), _jsx(motion.button, { onClick: () => setUploading(!uploading), className: "tactical-card py-2 px-4 flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold", whileTap: { scale: 0.98 }, children: uploading ? _jsxs(_Fragment, { children: [_jsx(X, { className: "w-3 h-3" }), " CANCEL"] }) : _jsxs(_Fragment, { children: [_jsx(Plus, { className: "w-3 h-3" }), " UPLOAD MAP"] }) })] }), _jsx(AnimatePresence, { children: uploading && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mb-4", children: _jsxs("div", { className: "tactical-card space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "stat-label block mb-1", children: "MAP NAME" }), _jsx("input", { value: mapName, onChange: e => setMapName(e.target.value), placeholder: "Dungeon Level 1...", className: "w-full bg-transparent font-mono text-sm text-foreground outline-none border-b border-border pb-1 placeholder:text-muted-foreground/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "stat-label block mb-1", children: "IMAGE (Max 5MB)" }), _jsx("input", { ref: fileRef, type: "file", accept: "image/*", onChange: handleFileChange, className: "hidden" }), _jsxs(motion.button, { onClick: () => fileRef.current?.click(), className: "w-full border border-dashed border-border rounded-sm py-6 text-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors", whileTap: { scale: 0.98 }, children: [_jsx(Upload, { className: "w-6 h-6 mx-auto mb-2" }), _jsx("span", { className: "text-[11px] uppercase tracking-widest font-bold", children: preview ? 'FILE SELECTED' : 'CLICK TO SELECT IMAGE' })] }), preview && (_jsx("img", { src: preview, alt: "Preview", className: "mt-2 max-h-32 rounded-sm border border-border" }))] }), _jsx(motion.button, { onClick: handleUpload, disabled: !preview || !mapName.trim(), className: "w-full text-center text-[11px] uppercase tracking-widest font-bold border border-border rounded-sm py-2 hover:bg-foreground hover:text-background transition-colors disabled:opacity-30", whileTap: { scale: 0.98 }, children: "UPLOAD MAP" })] }) })) }), maps.length === 0 ? (_jsxs("div", { className: "tactical-card text-center py-16", children: [_jsx("p", { className: "font-display text-muted-foreground text-sm tracking-widest mb-4", children: "NO MAPS UPLOADED." }), _jsx("button", { onClick: () => setUploading(true), className: "text-[11px] uppercase tracking-widest text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors", children: "UPLOAD YOUR FIRST MAP \u2192" })] })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2", children: maps.map(map => (_jsxs(motion.div, { className: "tactical-card p-0 overflow-hidden cursor-pointer group", whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "relative", onClick: () => setActiveMapId(map.id), children: [_jsx("img", { src: map.image, alt: map.name, className: "w-full h-40 object-cover" }), _jsx("div", { className: "absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: _jsx(Maximize2, { className: "w-6 h-6 text-foreground" }) })] }), _jsxs("div", { className: "p-3 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-display text-sm text-foreground", children: map.name }), _jsx("p", { className: "text-[10px] text-muted-foreground", children: new Date(map.createdAt).toLocaleDateString() })] }), _jsx("button", { onClick: (e) => { e.stopPropagation(); handleDelete(map.id); }, className: "text-muted-foreground hover:text-destructive transition-colors", children: _jsx(X, { className: "w-3 h-3" }) })] })] }, map.id))) }))] }));
}
