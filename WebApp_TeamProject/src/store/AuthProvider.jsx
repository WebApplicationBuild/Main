import { useState } from "react";
import { AuthContext } from "./AuthContext";

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

    // 데모용 동기 로그인. 실제로는 async 함수가 되고 서버 응답을 기다림.
    // login을 통해 사용자의 이름(nickname)과 흥미분야(interests)를 설정할 수 있음.
    const login = (nickname, interests) => {
        setUser({ nickname, interests });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
