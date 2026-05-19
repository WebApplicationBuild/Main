/*
로그인한 사용자만 특정 페이지에 접근 가능하도록 막아주는 보호 기능(인증 가드)
*/
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthProvider";    // AuthContext에 저장된 로그인 상태 가져오기

function ProtectedRoute({ children }) { // 보호할 페이지를 감싸는 컴포넌트
    const { user, authLoading } = useAuth();    // 로그인 상태 가져오기

    // Firebase가 로그인 상태 확인 중인지 저장 
    if (authLoading) {  // 로그인 상태 확인 중
        return (
        <div className="auth-page">
            <div className="auth-card">
            <p>로그인 상태 확인 중...</p>
            </div>
        </div>
        );
    }

    if (!user) {    // 로그인 안 된 상태
        return <Navigate to="/login" replace />;    // user가 없으면
    }

    return children;    // 로그인 성공 상태
}

export default ProtectedRoute;