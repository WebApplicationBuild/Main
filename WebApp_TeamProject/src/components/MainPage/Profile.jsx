import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import ProfileButton from "./ProfileButton";
import ProfileDialog from "../ProfileDialog/ProfileDialog";
import "../../styles/main/Profile.css";

export default function Profile() {
    const { user, userInfo, logout, updateUserInfo } = useAuth();
    const [open, setOpen] = useState(false);

    const {
        profile,
        loading,
        error,
        handleChange,
        saveProfile,
    } = useProfile(user, userInfo, updateUserInfo); // AuthContext에 이미 로드된 userInfo를 그대로 넘겨 페이지 이동 시 재조회로 인한 깜빡임 방지

    function handleOpen()  { setOpen(true);  }
    function handleClose() { setOpen(false); }

    async function handleSave() {
        const result = await saveProfile();
        if (result) setOpen(false);
    }

    if (!user) {
        return (
            <div className="profile">
                <div className="profile__guest-wrapper">
                    <div className="profile__avatar">?</div>
                    <div className="profile__guest">
                        <p className="profile__guest-text">로그인이 필요합니다</p>
                        <ProfileButton />
                    </div>
                </div>
            </div>
        );
    }

    const nickname = profile.nickname || "사용자";
    const skills = [
        profile.department && profile.department !== '미입력' ? profile.department : null,
        ...(profile.techStack && profile.techStack !== '미입력'
            ? profile.techStack.split(',').map((s) => s.trim()).filter(Boolean)
            : []),
    ].filter(Boolean);

    return (
        <div className="profile">
            <div className="profile__avatar">{nickname.charAt(0)}</div>
            <div className="profile__nickname">{nickname}</div>

            {skills.length > 0 && (
                <div className="profile__tag-list">
                    {skills.map((s) => (
                        <span key={s} className="profile__tag">{s}</span>
                    ))}
                </div>
            )}

            {profile.mbti && profile.mbti !== '미입력' && (
                <div className="profile__mbti">MBTI: {profile.mbti}</div>
            )}

            <button type="button" className="profile__edit-button" onClick={handleOpen}>
                프로필 수정
            </button>
            <button type="button" className="profile__logout-button" onClick={logout}>
                로그아웃
            </button>

            <ProfileDialog
                open={open}
                onClose={handleClose}
                profile={profile}
                error={error}
                onChange={handleChange}
                onSave={handleSave}
                loading={loading}
            />
        </div>
    );
}
