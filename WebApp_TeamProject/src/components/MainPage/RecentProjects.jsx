import { useNavigate } from "react-router-dom";
import { useProjectData } from "../../store/matchingDataContext";
import { getDDayInfo } from "../../utils/dday";
import "../../styles/main/RecentProjects.css";

/*
   최신 프로젝트 목록.

   - 매칭 페이지의 게시글(matchingPosts) 중 가장 최근 8개 글을 노출시킨다.
   - 상단(헤더) 클릭 시 MatchingPage(/matching)로 이동.
   - 개별 카드 클릭 시 매칭 페이지의 해당 게시글 위치로 이동.
   - 카드에 마우스를 올리면 카드 내용이 세부 정보(설명/작성자/마감일/태그)로 전환된다.
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
                    const ddayStyle = isClosed
                        ? { background: 'var(--closed-bg)', color: 'var(--closed-fg)', border: '1px solid var(--closed-bg)' }
                        : { background: `${ddayColor}18`, color: ddayColor, border: `1px solid ${ddayColor}40` };
                    const categories = Array.isArray(project.category) ? project.category : [project.category];

                    return (
                        <li
                            key={project.id}
                            className={`recent-projects__item${isClosed ? ' recent-projects__item--closed' : ''}`}
                            onClick={() => navigate(`/matching?postId=${project.id}`)}
                        >
                            <div className="recent-projects__card-face recent-projects__card-face--front">
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
                                    {categories.map((cat) => (
                                        <span key={cat} className="recent-projects__tag">#{cat}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="recent-projects__card-face recent-projects__card-face--back">
                                <div className="recent-projects__card-head">
                                    <p className="recent-projects__detail-content">{project.content}</p>
                                    <span className="recent-projects__dday" style={ddayStyle}>{ddayText}</span>
                                </div>
                                <div className="recent-projects__tag-row">
                                    {categories.map((cat) => (
                                        <span key={cat} className="recent-projects__tag">#{cat}</span>
                                    ))}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
