import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";    // Firebase 회원가입 기능
import { auth } from "../api/firebase"; // Firebase 인증 객체
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../api/firebase";

function useSignupForm() {
    const emailRef = useRef(null);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        passwordCheck: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        emailRef.current?.focus();
        document.title = "회원가입";
    }, []);

    // 상태 변경 (현재 입력값만 변경하고 나머지는 유지)
    function handleChange(e) {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    }

    // 회원가입 처리 함수
    async function handleSignup(e) {
        e.preventDefault(); // 새로고침 방지

        if (!form.email.trim()) {
            setError("이메일을 입력하세요.");
            return;
        }

        if (!form.password.trim()) {
            setError("비밀번호를 입력하세요.");
            return;
        }

        if (form.password.length < 6) {
            setError("비밀번호는 6자 이상이어야 합니다.");
            return;
        }

        if (form.password !== form.passwordCheck) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            setLoading(true);   // 로딩 시작
            setError("");

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );

            await setDoc(doc(db, "users", userCredential.user.uid), {
                email: userCredential.user.email,
                nickname: "",
                profileImage: "",
                createdAt: serverTimestamp(),
            });

            await signOut(auth);    // 회원가입 성공 시 자동 로그인 상태 해제

            alert("회원가입이 완료되었습니다. 다시 로그인해주세요.");
            navigate("/login");
            } catch (err) { // 회원가입 실패 시
                console.log("회원가입 오류 코드:", err.code);
                console.log("회원가입 오류 메시지:", err.message);

                if (err.code === "auth/email-already-in-use") {
                    setError("이미 사용 중인 이메일입니다.");
                } else if (err.code === "auth/invalid-email") {
                    setError("이메일 형식이 올바르지 않습니다.");
                } else if (err.code === "auth/weak-password") {
                    setError("비밀번호는 6자 이상이어야 합니다.");
                } else {
                    setError("회원가입 중 오류가 발생했습니다.");
                }
            } finally { // 성공/실패 상관없이 로딩 종료
                setLoading(false);
        }
    }

    // 빈환값
    return {
        emailRef,
        form,
        error,
        loading,
        handleChange,
        handleSignup,
    };
}

export default useSignupForm;