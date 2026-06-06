import { useEffect } from "react";
import "../../styles/common/ProfileDialog.css";

function ProfileDialog({ open, onClose, profile, error, onChange, onSave, loading }) {
    useEffect(() => {
        if (!open) return;
        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="profile-dialog__backdrop" onMouseDown={onClose}>
            <div className="profile-dialog" onMouseDown={(e) => e.stopPropagation()}>
                <div className="profile-dialog__header">
                    <h2 className="profile-dialog__title">프로필 수정</h2>
                    <button className="profile-dialog__close" onClick={onClose}>×</button>
                </div>

                {error && (
                    <p className="profile-dialog__error">{error}</p>
                )}

                <div className="profile-dialog__field">
                    <label className="profile-dialog__label">닉네임</label>
                    <input
                        className="profile-dialog__input"
                        name="nickname"
                        value={profile.nickname}
                        onChange={onChange}
                    />
                </div>

                <div className="profile-dialog__field">
                    <label className="profile-dialog__label">학과</label>
                    <input
                        className="profile-dialog__input"
                        name="department"
                        value={profile.department}
                        onChange={onChange}
                    />
                </div>

                <div className="profile-dialog__field">
                    <label className="profile-dialog__label">MBTI</label>
                    <input
                        className="profile-dialog__input"
                        name="mbti"
                        value={profile.mbti}
                        onChange={onChange}
                    />
                </div>

                <div className="profile-dialog__field">
                    <label className="profile-dialog__label">기술스택</label>
                    <input
                        className="profile-dialog__input"
                        name="techStack"
                        value={profile.techStack}
                        onChange={onChange}
                        placeholder="React, Firebase, Java"
                    />
                </div>

                <div className="profile-dialog__footer">
                    <button
                        className="profile-dialog__save"
                        onClick={onSave}
                        disabled={loading}
                    >
                        {loading ? "저장 중..." : "저장"}
                    </button>
                    <button className="profile-dialog__cancel" onClick={onClose}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileDialog;
