/*
로그인 버튼
버튼 클릭시 버튼 글자 자동 변경
useLoginForm에서 기능 처리
*/
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { memo, useMemo } from "react";

function LoginButton({ isLoading }) {
    const buttonContent = useMemo(() => {
        if (!isLoading) {
            return "로그인";
        }

        return (
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
        );
    }, [isLoading]);

    return (
        <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            className="login-submit-btn"
        >
            {buttonContent}
        </Button>
    );
}

export default memo(LoginButton);
