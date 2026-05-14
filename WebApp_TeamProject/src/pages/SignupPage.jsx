import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import ErrorMsg from "../components/ErrorMsg";

export default function SignupPage() {
    return (
        <div className="auth-page">
        <div className="auth-card">
            <h1>회원가입</h1>

            <ErrorMsg message="" />

            <form className="auth-form">
            <InputField
                type="email"
                placeholder="이메일"
            />

            <InputField
                type="password"
                placeholder="비밀번호"
            />

            <InputField
                type="password"
                placeholder="비밀번호 확인"
            />

            <button type="button">
                회원가입
            </button>
            </form>

            <p className="auth-link">
            이미 계정이 있나요?{" "}
            <Link to="/login">로그인</Link>
            </p>
        </div>
        </div>
    );
}