import { useNavigate } from "react-router-dom";
import { useProjectData } from "../../store/MatchingDataProvider";
import "../../styles/main/RecentProjects.css";

// D-Day 및 스타일 정보 계산 함수 (매칭 페이지와 동일)
const getDDayInfo = (deadline) => {
    if (!deadline) return { text: '상시모집', color: '#228be6', isClosed: false };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(deadline);
    targetDate.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: '마감', color: '#868e96', isClosed: true };
    if (diffDays === 0) return { text: 'D-Day', color: '#e03131', isClosed: false };
    if (diffDays <= 3) return { text: `D-${diffDays}`, color: '#e03131', isClosed: false };
    if (diffDays <= 7) return { text: `D-${diffDays}`, color: '#fd7e14', isClosed: false };
    return { text: `D-${diffDays}`, color: '#228be6', isClosed: false };
};

/*
   최신 프로젝트 목록.
  
   - 매칭 페이지의 게시글(matchingPosts) 중 가장 최근 8개 글을 노출시킨다.
   - 상단(헤더) 클릭 시 MatchingPage(/matching)로 이동.
   - 개별 카드 클릭 시 매칭 페이지의 해당 게시글 위치로 이동.
 */
export default function RecentProjects() {
    const navigate = useNavigate();
    const { matchingPostsData } = useProjectData();

    // matchingPostsData(목업 + 실제 작성된 글)를 작성일(createdAt) 최신순으로 정렬한 뒤 최대 8개 가져오기
    const projectsToShow = [...matchingPostsData]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);

    return (
        <div className="recent-projects">
            <div className="recent-projects__section-header">
                <span className="recent-projects__heading">최신 프로젝트</span>
                <button
                    type="button"
                    className="recent-projects__more-hint"
                    onClick={() => navigate("/matching")}
                >전체 보기 →</button>
            </div>

            <ul className="recent-projects__list">
                {projectsToShow.map((project) => {
                    const { text: ddayText, color: ddayColor, isClosed } = getDDayInfo(project.deadline);
                    const ddayStyle = isClosed
                        ? { background: 'var(--closed-bg)', color: 'var(--closed-fg)', border: '1px solid var(--closed-bg)' }
                        : { background: `${ddayColor}18`, color: ddayColor, border: `1px solid ${ddayColor}40` };

                    return (
                        <li
                            key={project.id}
                            className={`recent-projects__item${isClosed ? ' recent-projects__item--closed' : ''}`}
                            onClick={() => navigate(`/matching?postId=${project.id}`)}
                        >
                            <div className="recent-projects__card-head">
                                <span className="recent-projects__item-title">{project.title}</span>
                                <span className="recent-projects__dday" style={ddayStyle}>{ddayText}</span>
                            </div>
                            <div className="recent-projects__item-meta">
                                <span>{project.author}</span>
                                <span className="recent-projects__dot">·</span>
                                <span>{project.appliedMembers}/{project.requiredMembers}명</span>
                            </div>
                            <div className="recent-projects__tag-row">
                                {(Array.isArray(project.category) ? project.category : [project.category]).map((cat) => (
                                    <span key={cat} className="recent-projects__tag">#{cat}</span>
                                ))}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
