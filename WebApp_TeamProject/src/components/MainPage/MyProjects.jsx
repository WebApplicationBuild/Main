import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProjectManageData } from "../../store/projectManageDataContext";
import "../../styles/main/MyProjects.css";

/*
   내가 진행중인 프로젝트
  
   - 로그인되어 있어야 표시 (로그아웃이면 안내 문구)
   - 항목 클릭 시 /projectManage/:projectId 로 이동
 */
export default function MyProjects() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { myProjectsData } = useProjectManageData();

    return (
        <div className="my-projects">
            <div className="my-projects__header">
                <span className="my-projects__heading">진행중 프로젝트</span>
                {user && (
                    <button
                        className="my-projects__view-all"
                        onClick={() => navigate('/projectManage')}
                    >전체보기 →</button>
                )}
            </div>

            {!user ? (
                <div className="my-projects__empty">
                    <div className="my-projects__empty-icon">🔐</div>
                    <div className="my-projects__empty-text">로그인 후<br />이용해주세요</div>
                </div>
            ) : myProjectsData.length === 0 ? (
                <div className="my-projects__empty">
                    <div className="my-projects__empty-icon">🌱</div>
                    <div className="my-projects__empty-text">아직 진행중인<br />프로젝트가 없습니다</div>
                    <button
                        type="button"
                        className="my-projects__empty-action"
                        onClick={() => navigate('/matching')}
                    >팀 매칭하러 가기</button>
                </div>
            ) : (
                <ul className="my-projects__list">
                    {myProjectsData.map((project) => (
                        <li
                            key={project.id}
                            className="my-projects__item"
                            onClick={() => navigate(`/projectManage/${project.id}`)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="my-projects__item-title">{project.title}</div>
                            <div className="my-projects__item-meta">
                                <span className="my-projects__badge">{project.status}</span>
                                <span className="my-projects__members">팀원 {project.members}명</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
