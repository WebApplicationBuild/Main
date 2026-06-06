import { createContext, useCallback, useContext, useState } from 'react';
import Toast from '../components/common/Toast';
import ConfirmDialog from '../components/common/ConfirmDialog';

const ToastCtx = createContext(null);
const ConfirmCtx = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const [confirmState, setConfirmState] = useState(null);

    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const showConfirm = useCallback((message) => {
        return new Promise(resolve => setConfirmState({ message, resolve }));
    }, []);

    const handleConfirm = () => { confirmState?.resolve(true);  setConfirmState(null); };
    const handleCancel  = () => { confirmState?.resolve(false); setConfirmState(null); };

    return (
        <ToastCtx.Provider value={showToast}>
            <ConfirmCtx.Provider value={showConfirm}>
                {children}
                <Toast toasts={toasts} onRemove={removeToast} />
                {confirmState && (
                    <ConfirmDialog
                        message={confirmState.message}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                )}
            </ConfirmCtx.Provider>
        </ToastCtx.Provider>
    );
}

export function useToast()   { return useContext(ToastCtx); }
export function useConfirm() { return useContext(ConfirmCtx); }
