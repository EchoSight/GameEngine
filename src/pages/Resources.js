import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getResources, addResource, deleteResource } from '@/lib/store';
import { Plus, X, Tag, FileText, Map, BookOpen, ScrollText } from 'lucide-react';
const typeIcons = {
    map: Map,
    lore: BookOpen,
    rules: ScrollText,
    handout: FileText,
};
export default function Resources() {
    const [resources, setResources] = useState([]);
    const [adding, setAdding] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('rules');
    const [tags, setTags] = useState('');
    const [filterTag, setFilterTag] = useState('all');
    useEffect(() => {
        setResources(getResources());
    }, []);
    const allTags = Array.from(new Set(resources.flatMap(r => r.tags)));
    const filtered = filterTag === 'all' ? resources : resources.filter(r => r.tags.includes(filterTag));
    const handleAdd = () => {
        if (!title.trim())
            return;
        const res = {
            id: `res-${Date.now()}`,
            title: title.trim(),
            description: desc.trim(),
            content: content.trim(),
            type,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            createdAt: new Date().toISOString(),
        };
        addResource(res);
        setResources(getResources());
        setTitle('');
        setDesc('');
        setContent('');
        setTags('');
        setAdding(false);
    };
    const handleDelete = (id) => {
        deleteResource(id);
        setResources(getResources());
    };
    return (_jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "font-display text-lg text-foreground", children: "CAMPAIGN RESOURCES" }), _jsxs("p", { className: "text-[11px] text-muted-foreground uppercase tracking-widest", children: [resources.length, " ASSET", resources.length !== 1 ? 'S' : '', " INDEXED"] })] }), _jsx(motion.button, { onClick: () => setAdding(!adding), className: "tactical-card py-2 px-4 flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold", whileTap: { scale: 0.98 }, children: adding ? _jsxs(_Fragment, { children: [_jsx(X, { className: "w-3 h-3" }), " CANCEL"] }) : _jsxs(_Fragment, { children: [_jsx(Plus, { className: "w-3 h-3" }), " ADD RESOURCE"] }) })] }), allTags.length > 0 && (_jsxs("div", { className: "flex gap-1 mb-4 flex-wrap", children: [_jsx("button", { onClick: () => setFilterTag('all'), className: `text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm transition-colors ${filterTag === 'all' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`, children: "ALL" }), allTags.map(tag => (_jsxs("button", { onClick: () => setFilterTag(tag), className: `text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm transition-colors flex items-center gap-1 ${filterTag === tag ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`, children: [_jsx(Tag, { className: "w-2 h-2" }), " ", tag] }, tag)))] })), adding && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, className: "tactical-card mb-4 space-y-3", children: [_jsxs("div", { className: "grid grid-cols-12 gap-2", children: [_jsxs("div", { className: "col-span-8", children: [_jsx("label", { className: "stat-label block mb-1", children: "TITLE" }), _jsx("input", { value: title, onChange: e => setTitle(e.target.value), className: "w-full bg-transparent font-mono text-sm text-foreground outline-none border-b border-border pb-1 placeholder:text-muted-foreground/50", placeholder: "Resource title..." })] }), _jsxs("div", { className: "col-span-4", children: [_jsx("label", { className: "stat-label block mb-1", children: "TYPE" }), _jsxs("select", { value: type, onChange: e => setType(e.target.value), className: "w-full bg-transparent font-mono text-sm text-foreground outline-none", children: [_jsx("option", { value: "rules", className: "bg-card", children: "Rules" }), _jsx("option", { value: "lore", className: "bg-card", children: "Lore" }), _jsx("option", { value: "map", className: "bg-card", children: "Map" }), _jsx("option", { value: "handout", className: "bg-card", children: "Handout" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "stat-label block mb-1", children: "DESCRIPTION" }), _jsx("input", { value: desc, onChange: e => setDesc(e.target.value), className: "w-full bg-transparent font-mono text-sm text-foreground outline-none border-b border-border pb-1 placeholder:text-muted-foreground/50", placeholder: "Brief description..." })] }), _jsxs("div", { children: [_jsx("label", { className: "stat-label block mb-1", children: "CONTENT" }), _jsx("textarea", { value: content, onChange: e => setContent(e.target.value), rows: 3, className: "w-full bg-transparent font-mono text-sm text-foreground outline-none border border-border rounded-sm p-2 placeholder:text-muted-foreground/50 resize-none", placeholder: "Resource content..." })] }), _jsxs("div", { children: [_jsx("label", { className: "stat-label block mb-1", children: "TAGS (comma separated)" }), _jsx("input", { value: tags, onChange: e => setTags(e.target.value), className: "w-full bg-transparent font-mono text-sm text-foreground outline-none border-b border-border pb-1 placeholder:text-muted-foreground/50", placeholder: "rules, combat, starter" })] }), _jsx(motion.button, { onClick: handleAdd, disabled: !title.trim(), className: "w-full text-center text-[11px] uppercase tracking-widest font-bold border border-border rounded-sm py-2 hover:bg-foreground hover:text-background transition-colors disabled:opacity-30", whileTap: { scale: 0.98 }, children: "REGISTER RESOURCE" })] })), _jsx("div", { className: "space-y-1", children: filtered.map(res => {
                    const Icon = typeIcons[res.type] || FileText;
                    return (_jsx(motion.div, { className: "tactical-card", initial: { opacity: 0 }, animate: { opacity: 1 }, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Icon, { className: "w-4 h-4 text-muted-foreground mt-0.5 shrink-0" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-display text-sm text-foreground", children: res.title }), _jsxs("button", { onClick: () => handleDelete(res.id), className: "text-muted-foreground hover:text-destructive transition-colors shrink-0", children: [_jsx(X, { className: "w-3 h-3" }), _jsx("span", { className: "sr-only", children: "DELETE" })] })] }), _jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: res.description }), _jsx("p", { className: "font-body text-sm text-foreground/80 mt-2", children: res.content }), _jsxs("div", { className: "flex gap-1 mt-2", children: [res.tags.map(tag => (_jsx("span", { className: "text-[9px] uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm", children: tag }, tag))), _jsx("span", { className: "text-[9px] uppercase tracking-wider text-tactical-blue ml-auto", children: res.type })] })] })] }) }, res.id));
                }) })] }));
}
