import { useNavigate } from "react-router-dom";

export default function ProfileButton() {

    const navigate = useNavigate();
    
    const handleOnClick = () => { navigate("/login"); };

    return(
        <button onClick={handleOnClick}>프로필</button>
    );
}