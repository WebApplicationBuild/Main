import { useParams, Link } from "react-router-dom";

/*
 useParams()로 현재 URL의 projectId 값을 꺼냄
 ex) URL이 /projectManage/201 이면 projectId === "201"

 Link를 통해 "메인으로" 클릭시 전 페이지로 이동
*/

export default function ProjectManagePage() {
    const { projectId } = useParams();

    return (
        <div>
            <h1>이 곳은 프로젝트관리페이지입니다.</h1>
            <p>현재 프로젝트 ID: <strong>{projectId}</strong></p>
            <p><Link to="/">← 메인으로</Link></p>
        </div>
    );
}
