import { useCallback, useState } from 'react';
import Toast from '../components/common/Toast';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { ConfirmCtx, ToastCtx } from './toastContexts';

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const [confirmState, setConfirmState] = useState(null);

    const showToast = useCallback((message, type = 'info') => {
        // 같은 밀리초에 여러 토스트가 떠도 id가 겹치지 않도록 Math.random()을 함께 사용
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
        // 3.5초 뒤 자동으로 사라지도록 예약 (사용자가 직접 닫지 않아도 됨)
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // 호출부에서 `await showConfirm(...)`처럼 사용할 수 있도록 Promise로 감싼다.
    // resolve를 confirmState에 저장해두었다가 사용자가 확인/취소를 누르면 그때 resolve한다.
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
