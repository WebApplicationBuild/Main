// ★ 프로젝트 ID별 기본 팀원/일정 데이터를 관리하는 파일
export const projectInitialData = {
    201: {
    members: [
        { id: 1, name: "황대성", role: "★팀장★" },
        { id: 2, name: "신이수", role: "팀원1" },
        { id: 3, name: "채성민", role: "팀원2" },
        { id: 4, name: "김민성", role: "팀원3" },
        { id: 5, name: "장준혁", role: "팀원4" },
    ],
    schedules: [
        { id: 1, title: "기획 회의", day: "월요일" },
        { id: 2, title: "UI 설계", day: "화요일" },
        { id: 3, title: "프로토타입 제작", day: "수요일" },
    ],
    voteList: [],
    },

  // ★ 추가: 동아리 사이트 리뉴얼 프로젝트 데이터
    202: {
    members: [
        { id: 1, name: "팀원 A", role: "팀장" },
        { id: 2, name: "팀원 B", role: "팀원1" },
        { id: 3, name: "팀원 C", role: "팀원2" },
    ],
    schedules: [
        { id: 1, title: "요구사항 정리", day: "월요일" },
        { id: 2, title: "메인 페이지 리뉴얼", day: "화요일" },
        { id: 3, title: "게시판 UI 수정", day: "수요일" },
    ],
    voteList: [],
    },

  // ★ 추가: AI 챗봇 스터디 프로젝트 데이터
    203: {
    members: [
        { id: 1, name: "팀원 A", role: "팀장" },
        { id: 2, name: "팀원 B", role: "팀원1" },
        { id: 3, name: "팀원 C", role: "팀원2" },
        { id: 4, name: "팀원 D", role: "팀원3" },
        { id: 5, name: "팀원 E", role: "팀원4" },
    ],
    schedules: [
        { id: 1, title: "챗봇 주제 선정", day: "월요일" },
        { id: 2, title: "API 조사", day: "목요일" },
        { id: 3, title: "프론트 화면 설계", day: "금요일" },
    ],
    voteList: [],
    },
};

export const defaultProjectData = {
    members: [
    { id: 1, name: "팀원 미정", role: "팀원" },
    ],
    schedules: [],
    voteList: [],
};
