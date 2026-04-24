import React, { useState, useEffect } from 'react';

const SlaBar = ({ fechaCreacion, fechaVencimiento, estado }) => {
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState('');
    const [status, setStatus] = useState('normal'); // normal, warning, danger, stopped

    useEffect(() => {
        if (!fechaCreacion || !fechaVencimiento) return;

        const start = new Date(fechaCreacion).getTime();
        const end = new Date(fechaVencimiento).getTime();
        const total = end - start;

        const updateSla = () => {
            if (estado === 'Resuelto' || estado === 'Cerrado') {
                setStatus('stopped');
                return;
            }

            const now = new Date().getTime();
            const elapsed = now - start;
            
            let currentProgress = (elapsed / total) * 100;
            if (currentProgress > 100) currentProgress = 100;
            
            setProgress(currentProgress);

            const remaining = end - now;
            if (remaining <= 0) {
                setTimeLeft('SLA Vencido');
                setStatus('danger');
            } else {
                const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                const secs = Math.floor((remaining % (1000 * 60)) / 1000);
                setTimeLeft(`${mins}m ${secs}s restantes`);
                
                if (currentProgress > 80) {
                    setStatus('danger');
                } else if (currentProgress > 50) {
                    setStatus('warning');
                } else {
                    setStatus('normal');
                }
            }
        };

        const timer = setInterval(updateSla, 1000);
        updateSla();

        return () => clearInterval(timer);
    }, [fechaCreacion, fechaVencimiento, estado]);

    const getBarColor = () => {
        if (status === 'stopped') return '#10b981'; // emerald for stopped (resolved)
        if (status === 'danger') return '#ef4444'; // red
        if (status === 'warning') return '#f59e0b'; // amber
        return '#3b82f6'; // blue
    };

    return (
        <div className="sla-container">
            <div className="sla-header">
                <span className="sla-title">SLA Status</span>
                <span className="sla-time" style={{ color: status === 'danger' ? '#ef4444' : 'inherit' }}>
                    {timeLeft}
                </span>
            </div>
            <div className="sla-track">
                <div 
                    className="sla-fill" 
                    style={{ 
                        width: `${progress}%`, 
                        backgroundColor: getBarColor() 
                    }}
                ></div>
            </div>
        </div>
    );
};

export default SlaBar;
