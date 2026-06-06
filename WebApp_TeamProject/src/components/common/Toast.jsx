import '../../styles/common/Toast.css';

const ICONS = { success: '✓', error: '✕', warning: '!', info: 'i' };

export default function Toast({ toasts, onRemove }) {
    if (toasts.length === 0) return null;
    return (
        <div className="toast-stack">
            {toasts.map(({ id, message, type }) => (
                <div key={id} className={`toast toast--${type}`}>
                    <span className="toast__icon">{ICONS[type] ?? ICONS.info}</span>
                    <span className="toast__message">{message}</span>
                    <button className="toast__close" onClick={() => onRemove(id)}>×</button>
                </div>
            ))}
        </div>
    );
}
