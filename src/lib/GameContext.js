import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const GameContext = createContext({
    role: 'player',
    setRole: () => { },
    isDM: false,
});
export function GameProvider({ children }) {
    const [role, setRole] = useState(() => {
        return localStorage.getItem('dnd_role') || 'player';
    });
    const handleSetRole = (r) => {
        setRole(r);
        localStorage.setItem('dnd_role', r);
    };
    return (_jsx(GameContext.Provider, { value: { role, setRole: handleSetRole, isDM: role === 'dm' }, children: children }));
}
export function useGame() {
    return useContext(GameContext);
}
