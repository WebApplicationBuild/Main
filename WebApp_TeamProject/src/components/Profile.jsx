import { useAuth } from "../hooks/useAuth";
import ProfileButton from "./ProfileButton";
import "../styles/Profile.css";

/*
   로그인 상태에 따라 두 가지 다른 UI를 보여줌
  
   - 로그아웃 상태:  로그인 버튼 클릭 시 /login 이동
   - 로그인 상태:   닉네임 + 관심 분야 + 로그아웃 버튼
  
   useAuth()로 전역 상태를 가져오므로, 다른 페이지에서도 같은 user 정보를 공유 가능
 */
export default function Profile() {
    const { user, login, logout } = useAuth();

    // ─── 로그아웃 상태 UI ────────────────────────────────
    if (!user) {
        return (
            <div className="profile">
                <h2 className="profile__heading">프로필</h2>
                <div className="profile__guest">
                    <p className="profile__guest-text">로그인이 필요합니다</p>
                    <ProfileButton />

                    {/* 프로필 UI 변화를 확인하기 위한 임시 버튼 -> 나중에 제거해야함. */}
                    <button
                        type="button"
                        className="profile__dev-button"
                        onClick={() => login("민성", ["게임 개발", "C++", "Unreal Engine"])}
                    >
                        (데모) 즉시 로그인
                    </button>
                </div>
            </div>
        );
    }

    // ─── 로그인 상태 UI ─────────────────────────────────
    return (
        <div className="profile">
            <h2 className="profile__heading">프로필</h2>
            <div className="profile__user-info">
                <div className="profile__avatar">{user.nickname.charAt(0)}</div>    {/* 닉네임 첫 글자를 프로필이미지로 설정 */}
                <div className="profile__nickname">{user.nickname}</div>

                <div className="profile__interests-label">관심 분야</div>
                <ul className="profile__tag-list">
                    {/* user의 interests를 나열 */}
                    {user.interests.map((interest) => (
                        <li key={interest} className="profile__tag">
                            {interest}
                        </li>
                    ))}
                </ul>

                {/* 로그아웃 버튼 */}
                <button
                    type="button"
                    className="profile__logout-button"
                    onClick={logout}
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}
