import '../../styles/common/ConfirmDialog.css';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
    return (
        <div className="confirm-backdrop" onMouseDown={onCancel}>
            <div className="confirm-dialog" onMouseDown={e => e.stopPropagation()}>
                <p className="confirm-dialog__message">{message}</p>
                <div className="confirm-dialog__footer">
                    <button className="confirm-dialog__cancel" onClick={onCancel}>취소</button>
                    <button className="confirm-dialog__confirm" onClick={onConfirm}>확인</button>
                </div>
            </div>
        </div>
    );
}
