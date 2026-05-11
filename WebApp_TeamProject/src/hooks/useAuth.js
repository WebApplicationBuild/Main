import { useContext } from "react";
import { AuthContext } from "../store/AuthContext.js";

/*
 useContext(AuthContext)를 사용해 만든 커스텀 훅
 */
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
    }
    return ctx;
}
