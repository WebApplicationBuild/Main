import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { myProjects } from "../../api/mockData";
import "../../styles/MyProjects.css";

/*
   내가 진행중인 프로젝트
  
   - 로그인되어 있어야 표시 (로그아웃이면 안내 문구)
   - 항목 클릭 시 /projectManage/:projectId 로 이동
 */
export default function MyProjects() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="my-projects">
            <div className="my-projects__header">
                <h2 className="my-projects__heading">내가 진행중인 프로젝트</h2>
                <button
                className="my-projects__view-all"
                onClick={() => navigate("/projectManage")}
                >전체보기 →</button>
            </div>

            {!user ? (                                  /* 로그인이 되어있는지 확인 */
                <div className="my-projects__empty">
                    <p>로그인 후 이용해주세요</p>
                </div>
            ) : myProjects.length === 0 ? (             /* 프로젝트가 존재하지않으면 진행중인 프로젝트가 없다고 표시*/
                <div className="my-projects__empty">
                    <p>아직 진행중인 프로젝트가 없습니다</p>
                </div>
            ) : (                                       /* 프로젝트가 존재한다면, myProjects 리스트의 요소를 list item으로서 나타냄 */
                <ul className="my-projects__list">
                    {myProjects.map((project) => (
                        <li
                            key={project.id}
                            className="my-projects__item"
                            onClick={() => navigate(`/projectManage/${project.id}`)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="my-projects__item-title">
                                {project.title}
                            </div>
                            <div className="my-projects__item-meta">
                                <span className="my-projects__badge">
                                    {project.status}
                                </span>
                                <span className="my-projects__members">
                                    팀원 {project.members}명
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
