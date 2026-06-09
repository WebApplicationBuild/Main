import { useNavigate } from "react-router-dom";
import { useProjectData } from "../../store/MatchingDataProvider";
import { getDDayInfo } from "../../utils/dday";
import "../../styles/main/RecentProjects.css";

/*
   최신 프로젝트 목록.
  
   - 매칭 페이지의 게시글(matchingPosts) 중 가장 최근 8개 글을 노출시킨다.
   - 상단(헤더) 클릭 시 MatchingPage(/matching)로 이동.
   - 개별 카드 클릭 시 매칭 페이지의 해당 게시글 위치로 이동.
 */
export default function RecentProjects() {
    const navigate = useNavigate();
    const { matchingPostsData } = useProjectData();

    // 기한 마감된 프로젝트 제외 후 최신순 정렬, 최대 8개
    const projectsToShow = [...matchingPostsData]
        .filter((p) => !getDDayInfo(p.deadline).isClosed)
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
                    // 마감 전: ddayColor(헥스) 뒤에 알파값을 붙여 옅은 배경/테두리를 만든다
                    // (18 ≈ 9% 불투명도 배경, 40 ≈ 25% 불투명도 테두리). 마감 후에는 공용 회색 톤 사용.
                    const ddayStyle = isClosed
                        ? { background: 'var(--closed-bg)', color: 'var(--closed-fg)', border: '1px solid var(--closed-bg)' }
                        : { background: `${ddayColor}18`, color: ddayColor, border: `1px solid ${ddayColor}40` };

                    const statusText = isClosed ? '기한마감'
                        : (project.requiredMembers > 0 && project.appliedMembers >= project.requiredMembers) ? '인원마감'
                        : '모집중';
                    const statusClass = isClosed ? 'closed' : statusText === '인원마감' ? 'full' : 'open';

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

                            <div className="recent-projects__hover-detail">
                                <div className="recent-projects__hover-head">
                                    <span className="recent-projects__hover-title">{project.title}</span>
                                    <span className={`recent-projects__hover-status status--${statusClass}`}>{statusText}</span>
                                </div>
                                <p className="recent-projects__hover-content">{project.content}</p>
                                <div className="recent-projects__hover-footer">
                                    <span>작성자: {project.author}</span>
                                    <span>마감: {project.deadline || '상시모집'}</span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
