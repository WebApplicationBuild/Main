// 프로필이 아직 없는 신규 사용자도 빈 이름으로 표시되지 않도록 순서대로 대체 이름을 찾는다.
export function getUserDisplayName(user, userInfo) {
    return (
        userInfo?.nickname?.trim() ||
        user?.displayName?.trim() ||
        user?.email?.split("@")[0] ||
        "사용자"
    );
}
