import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import ProfileButton from "./ProfileButton";
import ProfileDialog from "../ProfileDialog/ProfileDialog";
import "../../styles/main/Profile.css";

/*
    로그인 상태에 따라 다른 프로필 UI 출력

    - 비로그인 상태:
        로그인 필요 메시지 + 로그인 버튼 출력

    - 로그인 상태:
        사용자 프로필 정보 출력
        프로필 수정 가능
        로그아웃 가능

    useAuth()
    → 로그인 사용자 정보(user)
    → 로그아웃 함수(logout)

    useProfile()
    → Firestore 프로필 데이터 관리
    → 프로필 수정 기능 관리
*/
export default function Profile() {

    // 현재 로그인 사용자 정보 + 로그아웃 함수
    const { user, logout } = useAuth();

    // 프로필 수정 모달(Dialog) 열림 상태
    const [open, setOpen] = useState(false);

    /*
        Firestore 프로필 관련 상태/함수

        profile
        → 사용자 프로필 정보 저장

        loading
        → 저장 중 상태

        handleChange
        → input 값 변경 함수

        saveProfile
        → Firestore 저장 함수
    */
    const {
        profile,
        loading,
        handleChange,
        saveProfile,
    } = useProfile(user);

    // 프로필 수정 Dialog 열기
    function handleOpen() {
        setOpen(true);
    }

    // 프로필 수정 Dialog 닫기
    function handleClose() {
        setOpen(false);
    }

    /*
        프로필 저장 처리

        saveProfile() 성공 시
        Dialog 자동 닫기
    */
    async function handleSave() {
        const result = await saveProfile();

        if (result) {
            setOpen(false);
        }
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
                onChange={handleChange}
                onSave={handleSave}
                loading={loading}
            />
        </div>
    );
}