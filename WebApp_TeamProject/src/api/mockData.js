/*
 지금은 UI를 먼저 완성하기 위해 더미 데이터로 대체.
 추후 이 파일을 실제 API 호출 함수로 교체
 */

// 공지/홍보 캐러셀 배너 (실제로는 이미지 URL이 들어옴)
export const noticeBanners = [
    { id: 1, title: "2026년 1학기 팀 매칭 오픈!",        bgColor: "#4f46e5" },
    { id: 2, title: "신규 기능: 실시간 채팅 추가",        bgColor: "#0ea5e9" },
    { id: 3, title: "캡스톤 디자인 시즌 - 팀원 모집",     bgColor: "#10b981" },
    { id: 4, title: "해커톤 7월 13일 오픈",               bgColor: "#f59e0b" },
];

// 최신 프로젝트 목록 (createdAt을 기준을 하여 내림차순으로 정렬되어 있다고 가정)
export const recentProjects = [
    { id: 101, title: "Unity 2D 로그라이크 게임 제작",     author: "김민수", tags: ["Unity", "C#"],            createdAt: "2026-05-10" },
    { id: 102, title: "플러터로 운동 기록 앱 만들기",      author: "이서연", tags: ["Flutter", "Dart"],        createdAt: "2026-05-10" },
    { id: 103, title: "React + Spring 중고거래 플랫폼",    author: "박지훈", tags: ["React", "Spring"],        createdAt: "2026-05-09" },
    { id: 104, title: "Unreal Engine 5 FPS 프로토타입",    author: "최예린", tags: ["Unreal", "C++"],          createdAt: "2026-05-09" },
    { id: 105, title: "딥러닝 기반 음악 추천 시스템",      author: "정도윤", tags: ["Python", "PyTorch"],      createdAt: "2026-05-08" },
    { id: 106, title: "대학생 시간표 자동화 챗봇",         author: "한지원", tags: ["Node.js", "OpenAI"],      createdAt: "2026-05-08" },
    { id: 107, title: "Godot로 만드는 카드 게임",          author: "조성민", tags: ["Godot", "GDScript"],      createdAt: "2026-05-07" },
    { id: 108, title: "AR 캠퍼스 가이드 앱",               author: "윤다은", tags: ["Unity", "AR Foundation"], createdAt: "2026-05-07" },
];

// 내가 진행중인 프로젝트 (로그인 사용자의 데이터라고 가정)
export const myProjects = [
    { id: 201, title: "캡스톤: 협동 퍼즐 게임",     status: "개발 중", members: 4 },
    { id: 202, title: "동아리 사이트 리뉴얼",       status: "기획 중", members: 3 },
    { id: 203, title: "AI 챗봇 스터디 프로젝트",    status: "개발 중", members: 5 },
];