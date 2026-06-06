import { useCallback, useEffect, useMemo, useState } from "react";
// Firebase 로그인 상태 감지 함수, 로그아웃 함수
import { onAuthStateChanged, signOut } from "firebase/auth";
// Firebase 인증 객체
import { auth, db } from "../api/firebase"; 
// Context 저장소 가져오기
import { AuthContext } from "./AuthContext";    
import { doc, getDoc } from "firebase/firestore";

/*
    AuthProvider: 로그인 상태를 전역으로 선언하고 상태를 트리 전체에 공급해 공유하는 역할
    
    트리 내부 어디서나 아래 코드로 사용 가능
        const { user, login, logout } = useAuth();
    
    실제 서비스에서 추가할 것:
        - useEffect로 mount 시 localStorage의 토큰 복원
        - login()이 비동기 fetch 함수로 변경
        - refreshToken 로직
 */
export function AuthProvider({ children }) {
    // user가 null → 로그아웃, 객체 → 로그인 상태
    const [user, setUser] = useState(null);
    // Firebase가 로그인 상태 확인 중인지 저장
    // true 동안은 아직 로그인 확인 안 끝난 상태
    const [authLoading, setAuthLoading] = useState(true);

    const [userInfo, setUserInfo] = useState(null);

    const fetchUserInfo = useCallback(async (uid) => {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        return userSnap.exists() ? userSnap.data() : null;
    }, []);
    /*
    useEffect
    → 컴포넌트 처음 실행 시 로그인 상태 감지 시작
    */
    useEffect(() => {
        /*
        onAuthStateChanged()
        → Firebase 로그인 상태가 바뀔 때마다 자동 실행

        currentUser:
        로그인 성공 시 사용자 정보 객체
        로그아웃 시 null
        */
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // 현재 로그인 사용자 저장
            setUser(currentUser);

            try {
                if (currentUser) {
                    const nextUserInfo = await fetchUserInfo(currentUser.uid);
                    setUserInfo(nextUserInfo);
                } else {
                    setUserInfo(null);
                }
            } catch (err) {
                console.error("사용자 정보를 불러오지 못했습니다:", err);
                setUserInfo(null);
            } finally {
                // 로그인 상태 확인 완료
                setAuthLoading(false);
            }
        });
        /*
        cleanup 함수
        컴포넌트 종료 시 감지 제거
        메모리 누수 방지
        */
        return () => unsubscribe();
    }, [fetchUserInfo]);

    // 로그아웃 함수 Firebase 로그아웃 실행
    const logout = useCallback(async () => {
        await signOut(auth);
    }, []);

    const updateUserInfo = useCallback((nextUserInfo) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            ...nextUserInfo,
        }));
    }, []);

    const value = useMemo(
        () => ({
            user,
            userInfo,
            authLoading,
            logout,
            updateUserInfo,
        }),
        [authLoading, logout, updateUserInfo, user, userInfo]
    );

    /*
    Context.Provider
    → user, authLoading, logout을
    전체 앱에 공유
    */
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
