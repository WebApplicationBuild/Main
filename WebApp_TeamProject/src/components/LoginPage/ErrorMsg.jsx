/*
에러 메시지 출력 컴포넌트
에러 메시지가 있을 때만 화면에 출력
없으면 아무 것도 보여주지 않도록
- LoginPage.jsx / SignupPage.jsx 에서 사용
- 에러 문구는 hooks에 있음
*/
import Alert from "@mui/material/Alert";

function ErrorMsg({ message }) {
    if (!message) return null;

    return (
        <Alert
            severity="error"
            className="auth-error"
        >
            <span className="auth-error-text">
                {message}
            </span>
        </Alert>
    );
}

export default ErrorMsg;