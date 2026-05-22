/*
로그인 페이지 화면, 로그인 동작 연결
*/
import "../styles/LoginPage.css";

import useLoginForm from "../hooks/useLoginForm";
import InputField from "../components/LoginPage/InputField";
import ErrorMsg from "../components/LoginPage/ErrorMsg";
import LoginButton from "../components/LoginPage/LoginButton";
import SignupButton from "../components/LoginPage/SignupButton";

function LoginPage() {

    // 로그인에 필요한 값과 함수들
    const {
        form,
        error,
        emailInputRef,
        isLoading,
        handleChange,
        handleLogin,
        handleSignup,
    } = useLoginForm();

    return (
        <main className="login-page">
        <section className="login-card">

            <h1 className="login-title">로그인</h1>

            <p className="login-desc">
                이메일과 비밀번호를 입력하세요.
            </p>

            <form className="login-form" onSubmit={handleLogin}>

            <div className="login-input-group">
                <InputField
                ref={emailInputRef}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                />
            </div>

            <div className="login-input-group">
                <InputField
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                />
            </div>

            <div className="login-error">
                <ErrorMsg message={error} />
            </div>

            <div className="login-button">
                <LoginButton isLoading={isLoading} />
            </div>

            <div className="signup-button">
                <SignupButton onClick={handleSignup} />
            </div>

            </form>
        </section>
        </main>
    );
}

export default LoginPage;