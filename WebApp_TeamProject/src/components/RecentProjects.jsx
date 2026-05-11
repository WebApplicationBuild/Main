import { useNavigate } from "react-router-dom";
import { recentProjects } from "../api/mockData";
import "../styles/RecentProjects.css";

/*
   최신 프로젝트 목록.
  
   - 사전 저장된 글 목록 중 가장 최근 8개 글을 노출시킨다.
   - 상단(헤더) 클릭 시 MatchingPage(/matching)로 이동.
   - 개별 카드 클릭 시 해당 프로젝트 상세로 이동.
 */
export default function RecentProjects() {
    const navigate = useNavigate();

    // 저장해놓은 recentProjects 중 0번 인덱스(가장 최근 프로젝트)부터 8개의 요소를 가져옴
    const projectsToShow = recentProjects.slice(0, 8);

    return (
        <div className="recent-projects">
            {/* 헤더 전체가 클릭 영역 */}
            <button
                type="button"
                className="recent-projects__header-button"
                onClick={() => navigate("/matching")}
            >
                <span className="recent-projects__heading">최신 프로젝트 목록</span>
                <span className="recent-projects__more-hint">전체 보기 →</span>
            </button>

            <ul className="recent-projects__list">

                {/* 꼭 key를 사용하고 사용에 유의하기 (index 사용 절대 금지) */}
                {projectsToShow.map((project) => (
                    <li
                        key={project.id}
                        className="recent-projects__item"
                        onClick={() => navigate(`/projectManage/${project.id}`)}
                    >
                        <div className="recent-projects__item-title">
                            {project.title}
                        </div>
                        <div className="recent-projects__item-meta">
                            <span>{project.author}</span>
                            <span className="recent-projects__dot">·</span>
                            <span>{project.createdAt}</span>
                        </div>
                        <div className="recent-projects__tag-row">

                            {/* 프로젝트마다 태그(recentProjects의 tag) 표시 */}
                            {project.tags.map((tag) => (
                                <span key={tag} className="recent-projects__tag">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
