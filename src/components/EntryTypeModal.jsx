import React from 'react';

export default function EntryTypeModal({ open, onClose, onChoose }) {
    if (!open) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000
        }}>
            <div style={{
                background: 'white', padding: 20, borderRadius: 8,
                width: 320, boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}>
                <h3>Confirmar registro</h3>
                <p style={{
                padding: '24px 0', textAlign: 'center'
            }}>¿Desea registrar la cantidad en el <strong>Debe</strong> o en el <strong>Haber</strong>?</p>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button type='submit' id='cancelar' onClick={() => onClose()} style={{ padding: '8px 12px' }}>Cancelar</button>
                    <button type='submit' id='debe' onClick={() => onChoose('debe')} style={{ padding: '8px 12px' }}>Debe</button>
                    <button type='submit' id='haber' onClick={() => onChoose('haber')} style={{ padding: '8px 12px' }}>Haber</button>
                </div>
            </div>
        </div>
    );
}