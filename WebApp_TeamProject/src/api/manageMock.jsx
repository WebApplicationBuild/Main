export const initialMembers = [
    { id: 1, name: "황대성", role: "★팀장★" },
    { id: 2, name: "신이수", role: "팀원1" },
    { id: 3, name: "채성민", role: "팀원2" },
    { id: 4, name: "김민성", role: "팀원3" },
    { id: 5, name: "장준혁", role: "팀원4" },
]; // 팀원 기본 데이터 저장 부분 (projectManageMockData에 없는 프로젝트용 기본값)

export const initialSchedules = [
    { id: 1, title: "기획 회의", day: "월요일" },
    { id: 2, title: "UI 설계", day: "화요일" },
    { id: 3, title: "안녕하세요", day: "수요일" },
]; // 일정 기본 데이터 저장 부분 (projectManageMockData에 없는 프로젝트용 기본값)

// 프로젝트(id)별 팀원/일정 더미 데이터
export const projectManageMockData = {
    // 캡스톤: 협동 퍼즐 게임
    201: {
        members: [
            { id: 1, name: "황대성", role: "★팀장★" },
            { id: 2, name: "신이수", role: "팀원1" },
            { id: 3, name: "채성민", role: "팀원2" },
            { id: 4, name: "김민성", role: "팀원3" },
        ],
        schedules: [
            { id: 1, title: "퍼즐 기획 회의", day: "월요일" },
            { id: 2, title: "캐릭터 디자인", day: "수요일" },
            { id: 3, title: "스테이지 레벨 디자인", day: "금요일" },
        ],
    },
    // 동아리 사이트 리뉴얼
    202: {
        members: [
            { id: 1, name: "장준혁", role: "★팀장★" },
            { id: 2, name: "김민성", role: "팀원1" },
            { id: 3, name: "채성민", role: "팀원2" },
        ],
        schedules: [
            { id: 1, title: "사이트 구조 회의", day: "화요일" },
            { id: 2, title: "디자인 시안 검토", day: "목요일" },
        ],
    },
    // AI 챗봇 스터디 프로젝트
    203: {
        members: [
            { id: 1, name: "신이수", role: "★팀장★" },
            { id: 2, name: "황대성", role: "팀원1" },
            { id: 3, name: "장준혁", role: "팀원2" },
            { id: 4, name: "채성민", role: "팀원3" },
            { id: 5, name: "김민성", role: "팀원4" },
        ],
        schedules: [
            { id: 1, title: "프롬프트 엔지니어링 스터디", day: "월요일" },
            { id: 2, title: "RAG 구조 학습", day: "수요일" },
            { id: 3, title: "챗봇 데모 발표", day: "금요일" },
        ],
    },
};
