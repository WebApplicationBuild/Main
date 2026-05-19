import "../styles/SignupPage.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import useSignupForm from "../hooks/useSignupForm";
import InputField from "../components/LoginPage/InputField";
import ErrorMsg from "../components/LoginPage/ErrorMsg";

function SignupPage() {
    
    // 회원가입에 필요한 상태와 함수
    const {
        emailRef,
        form,
        error,
        loading,
        handleChange,
        handleSignup,
    } = useSignupForm();

    return (
        <main className="signup-page">

        <section className="signup-card">

            <h1 className="signup-title">회원가입</h1>

            <p className="signup-desc">
                이메일과 비밀번호로 계정을 생성하세요.
            </p>

            <div className="signup-error">
                <ErrorMsg message={error} />
            </div>

            <form onSubmit={handleSignup} className="signup-form">

            <div className="signup-input-group">
                <InputField
                    ref={emailRef}
                    name="email"
                    type="email"
                    placeholder="이메일"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <div className="signup-input-group">
                <InputField
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    value={form.password}
                    onChange={handleChange}
                />
            </div>

            <div className="signup-input-group">
                <InputField
                    name="passwordCheck"
                    type="password"
                    placeholder="비밀번호 확인"
                    value={form.passwordCheck}
                    onChange={handleChange}
                />
            </div>

            <div className="signup-submit-wrapper">
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    className="signup-submit-btn"
                >
                    {loading ? (
                        <span className="signup-loading">
                            <CircularProgress
                                size={18}
                                color="inherit"
                                className="signup-loading-spinner"
                            />

                            <span className="signup-loading-text">
                                회원가입 중...
                            </span>
                        </span>
                    ) : (
                        "회원가입"
                    )}
                </Button>
            </div>

            </form>

            <p className="signup-link">
                이미 계정이 있나요?
                <Link to="/login" className="signup-link-text">
                    로그인
                </Link>
            </p>

        </section>
        </main>
    );
}

export default SignupPage;