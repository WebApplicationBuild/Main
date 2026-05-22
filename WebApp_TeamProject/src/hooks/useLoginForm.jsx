import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; //Firebase 로그인 기능
import { auth } from "../api/firebase"; // Firebase 인증 객체

function useLoginForm() {
    const navigate = useNavigate();
    const emailInputRef = useRef(null);

    const [form, setForm] = useState({  // 입력값 저장
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // 입력값 변경 함수
    function handleChange(e) {
        const { name, value } = e.target; // 현재 입력창 정보 가져오기
        
        // 입력값 저장 (상태 업데이트)
        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    }

    useEffect(() => {   // 화면 처음 열릴 때
        emailInputRef.current?.focus(); // 이메일 input에 자동 focus
        document.title = "로그인";      // title 로그인
    }, []);

    // 로그인 처리 함수
    // async -> 비동기 작업 (로그인 요청이 끝날 때까지 기다리는 함수) -> 로그인 시간이 걸리기 때문
    async function handleLogin(e) { 
        e.preventDefault(); // 새로고침 방지
        setError("");

        if (form.email.trim() === "") {
            setError("이메일을 입력하세요.");
            return;
        }

        if (form.password.trim() === "") {
            setError("비밀번호를 입력하세요.");
            return;
        }

        try {
            setIsLoading(true); // 로딩 시작 (로그인 처리 시작)

            await signInWithEmailAndPassword(auth, form.email, form.password);  // Firebase 서버에 로그인 요청

            navigate("/");  // 로그인 성공
        } catch (err) { // 로그인 실패
            console.log("로그인 오류 코드:", err.code);
            console.log("로그인 오류 메시지:", err.message);
            setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        } finally { // 성공/실패 상관없이 로딩 종료.
            setIsLoading(false);
        }
    }

    // 회원가입 이동 함수
    function handleSignup() { 
        navigate("/signup");
    }

    // 반환되는 값
    return {
        form,
        error,
        emailInputRef,
        isLoading,
        handleChange,
        handleLogin,
        handleSignup,
    };
}

export default useLoginForm;