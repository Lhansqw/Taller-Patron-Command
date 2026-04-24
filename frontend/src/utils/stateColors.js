export const stateColors = {
    'Abierto': '#3b82f6', // blue
    'Asignado': '#8b5cf6', // purple
    'En Diagnóstico': '#f59e0b', // amber
    'Escalado': '#ef4444', // red
    'Resuelto': '#10b981', // emerald
    'Cerrado': '#6b7280', // gray
    'Reabierto': '#f97316', // orange
    'Cancelado': '#475569' // dark gray
};

export const getStateColor = (stateName) => {
    return stateColors[stateName] || '#9ca3af';
};
