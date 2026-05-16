import InputField from "../components/InputField";
import ErrorMsg from "../components/ErrorMsg";
import LoginButton from "../components/LoginButton";
import SignupButton from "../components/SignupButton";

function LoginPage() {
    return (
        <div className="login-page">
        <form className="login-box">
            <h1>로그인</h1>

            <InputField
            type="email"
            placeholder="이메일을 입력하세요"
            />

            <InputField
            type="password"
            placeholder="비밀번호를 입력하세요"
            />

            <ErrorMsg message="" />

            <LoginButton />

            <SignupButton />
        </form>
        </div>
    );
}

export default LoginPage;