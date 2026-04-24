import React from 'react';
import { getStateColor } from '../../utils/stateColors';
import { ArrowRight } from 'lucide-react';

const StateFlow = ({ currentState }) => {
    const mainFlow = ['Abierto', 'Asignado', 'En Diagnóstico', 'Resuelto', 'Cerrado'];
    
    const isEscalado = currentState === 'Escalado';
    const isReabierto = currentState === 'Reabierto';
    const isCancelado = currentState === 'Cancelado';

    return (
        <div className="state-flow-container">
            <h3 className="flow-title">Flujo del Ticket</h3>
            <div className="flow-nodes">
                {mainFlow.map((state, index) => {
                    const isActive = currentState === state;
                    const color = getStateColor(state);
                    
                    return (
                        <React.Fragment key={state}>
                            <div 
                                className={`flow-node ${isActive ? 'active' : ''}`}
                                style={{ 
                                    borderColor: color,
                                    backgroundColor: isActive ? color : 'transparent',
                                    color: isActive ? '#fff' : '#e5e7eb',
                                    opacity: isCancelado ? 0.5 : 1
                                }}
                            >
                                {state}
                            </div>
                            
                            {index < mainFlow.length - 1 && (
                                <ArrowRight className="flow-arrow" size={16} style={{opacity: isCancelado ? 0.5 : 1}} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
            
            {(isEscalado || isReabierto || isCancelado) && (
                <div className="flow-alternative">
                    <span className="alt-label">Estado Excepcional Actual:</span>
                    <div 
                        className="flow-node active"
                        style={{ 
                            borderColor: getStateColor(currentState),
                            backgroundColor: getStateColor(currentState),
                            color: '#fff'
                        }}
                    >
                        {currentState}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StateFlow;
