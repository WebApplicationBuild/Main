function ErrorMsg({ message }) {
    if (!message) return null;

    return (
        <p className="auth-error">
        {message}
        </p>
    );
}

export default ErrorMsg;