export function getUserDisplayName(user, userInfo) {
    return (
        userInfo?.nickname?.trim() ||
        user?.displayName?.trim() ||
        user?.email?.split("@")[0] ||
        "사용자"
    );
}
