// ★ 프로젝트 ID별 기본 팀원/일정 데이터를 관리하는 파일

export const projectInitialData = {
    101: {
    members: [
        { id: 1, name: "황대성", role: "★팀장★" },
        { id: 2, name: "신이수", role: "팀원1" },
    ],
    schedules: [
        { id: 1, title: "Unity 기획 회의", day: "월요일" },
        { id: 2, title: "게임 UI 설계", day: "화요일" },
    ],
},

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
    },
};

// ★ 존재하지 않는 projectId로 들어왔을 때 사용할 기본 데이터
export const defaultProjectData = {
    members: [
    { id: 1, name: "팀원 미정", role: "팀원" },
    ],
    schedules: [],
};