import { useNavigate } from "react-router-dom";
import { matchingPosts } from "../../api/mockData";
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

    // matchingPosts를 작성일(createdAt) 최신순으로 정렬한 뒤 최대 8개 가져오기
    const projectsToShow = [...matchingPosts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);

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
                {projectsToShow.map((project) => {
                    const { text: ddayText, color: ddayColor, isClosed } = getDDayInfo(project.deadline);
                    
                    return (
                        <li
                            key={project.id}
                            className="recent-projects__item"
                            // 클릭 시 매칭 페이지로 이동하되 URL에 쿼리 파라미터로 postId를 전달
                            onClick={() => navigate(`/matching?postId=${project.id}`)}
                            style={{ opacity: isClosed ? 0.6 : 1 }} // 마감된 프로젝트는 살짝 흐리게 처리
                        >
                            <div className="recent-projects__item-title">
                                {project.title}
                            </div>
                            <div className="recent-projects__item-meta">
                                <span>{project.author}</span>
                                <span className="recent-projects__dot">·</span>
                                <span>{project.createdAt}</span>
                            </div>
                            
                            {/* 호버 시 나타날 글 내용 영역 추가 */}
                            <div className="recent-projects__item-content">
                                {project.content}
                            </div>

                            <div className="recent-projects__tag-row">
                                {/* 프로젝트마다 태그(matchingPosts의 category) 표시 */}
                                {(Array.isArray(project.category) ? project.category : [project.category]).map((cat) => (
                                    <span key={cat} className="recent-projects__tag">
                                        #{cat}
                                    </span>
                                ))}
                            </div>

                            {/* 우측 하단 D-Day 배지 */}
                            <div 
                                className="recent-projects__dday" 
                                style={{ 
                                    backgroundColor: `${ddayColor}15`, // 투명도 15% 정도의 배경색 (헥스 뒤에 15 추가)
                                    color: ddayColor,
                                    border: `1px solid ${ddayColor}40` // 투명도 40% 정도의 테두리
                                }}
                            >
                                {ddayText}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
