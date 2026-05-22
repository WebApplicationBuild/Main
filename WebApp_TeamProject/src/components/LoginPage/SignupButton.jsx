/*
회원가입 기능을 실행하는 버튼 컴포넌트
*/
import Button from "@mui/material/Button";

function SignupButton({ onClick }) {
    return (
        <Button
            type="button"
            variant="outlined"
            onClick={onClick}
            className="signup-move-btn"
        >
            회원가입
        </Button>
    );
}

export default SignupButton;