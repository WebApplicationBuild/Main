import { useNavigate } from "react-router-dom";

function SignupButton() {
    const navigate = useNavigate();

    function handleSignupPage() {
        navigate("/signup");
    }

    return (
        <button
        type="button"
        onClick={handleSignupPage}
        >
        회원가입
        </button>
    );
}

export default SignupButton;