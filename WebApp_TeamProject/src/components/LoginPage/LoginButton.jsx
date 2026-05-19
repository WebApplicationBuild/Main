/*
로그인 버튼
버튼 클릭시 버튼 글자 자동 변경
useLoginForm에서 기능 처리
*/
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function LoginButton({ isLoading }) {
    return (
        <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            className="login-submit-btn"
        >
            {isLoading ? (
                <span className="login-loading">
                    <CircularProgress
                        size={18}
                        color="inherit"
                        className="login-loading-spinner"
                    />
                    <span className="login-loading-text">
                        로그인 중...
                    </span>
                </span>
            ) : (
                "로그인"
            )}
        </Button>
    );
}

export default LoginButton;