import { useNavigate } from "react-router-dom";

/*
로그아웃 상태에서 로그인 버튼 클릭시 LoginPage로 이동  
*/

export default function ProfileButton() {

    const navigate = useNavigate();
    const handleOnClick = () => { navigate("/login"); };

    return(
        <button onClick={handleOnClick}>로그인</button>
    );
}