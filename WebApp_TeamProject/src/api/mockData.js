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

// 최신 프로젝트 목록 — deadline 추가로 D-Day 배지 색상 확인 가능
// 기준일 2026-06-04: 마감(past)·D-Day·D-2(빨강)·D-5·D-7(주황)·D-10(파랑)·상시모집 케이스 포함
export const recentProjects = [
    { id: 101, title: "Unity 2D 로그라이크 게임 제작",     author: "김민수", tags: ["Unity", "C#"],            createdAt: "2026-05-10", deadline: "2026-05-30" }, // 마감 (회색)
    { id: 102, title: "플러터로 운동 기록 앱 만들기",      author: "이서연", tags: ["Flutter", "Dart"],        createdAt: "2026-05-10", deadline: "2026-06-04" }, // D-Day (빨강)
    { id: 103, title: "React + Spring 중고거래 플랫폼",    author: "박지훈", tags: ["React", "Spring"],        createdAt: "2026-05-09", deadline: "2026-06-06" }, // D-2 (빨강)
    { id: 104, title: "Unreal Engine 5 FPS 프로토타입",    author: "최예린", tags: ["Unreal", "C++"],          createdAt: "2026-05-09", deadline: "2026-06-09" }, // D-5 (주황)
    { id: 105, title: "딥러닝 기반 음악 추천 시스템",      author: "정도윤", tags: ["Python", "PyTorch"],      createdAt: "2026-05-08", deadline: "2026-06-11" }, // D-7 (주황)
    { id: 106, title: "대학생 시간표 자동화 챗봇",         author: "한지원", tags: ["Node.js", "OpenAI"],      createdAt: "2026-05-08", deadline: "2026-06-14" }, // D-10 (파랑)
    { id: 107, title: "Godot로 만드는 카드 게임",          author: "조성민", tags: ["Godot", "GDScript"],      createdAt: "2026-05-07", deadline: null           }, // 상시모집 (파랑)
    { id: 108, title: "AR 캠퍼스 가이드 앱",               author: "윤다은", tags: ["Unity", "AR Foundation"], createdAt: "2026-05-07", deadline: "2026-05-15"  }, // 마감 (회색)
];

// 내가 진행중인 프로젝트 (로그인 사용자의 데이터라고 가정)
export const myProjects = [
    { id: 201, title: "캡스톤: 협동 퍼즐 게임",     status: "개발 중", members: 4 },
    { id: 202, title: "동아리 사이트 리뉴얼",       status: "기획 중", members: 3 },
    { id: 203, title: "AI 챗봇 스터디 프로젝트",    status: "개발 중", members: 5 },
];

// 매칭 페이지용 게시글 — 기준일 2026-06-04 기준으로 모든 D-Day 색상·상태 케이스 포함
export const matchingPosts = [
    // ── 회색: 마감 (기한마감) ────────────────────────────────────────
    { id: 301, title: "KSAE 자작 자동차 대회 팀원 모집 (기계과 환영)", author: "차량동아리", content: "올해 자작 자동차 대회 바하(Baja) 부문 출전 준비중입니다. CATIA 설계 가능하신 분이나 프레임 제작에 관심있는 분 환영합니다.", category: ["기계", "대외활동", "설계"], requiredMembers: 3, appliedMembers: 1, createdAt: "2026-05-20", deadline: "2026-05-30" }, // 마감 (회색) · 기한마감
    { id: 310, title: "교내 캡스톤: 시각장애인용 지팡이 개발", author: "빛의소리", content: "초음파 센서와 진동 모터를 활용한 스마트 지팡이 캡스톤 프로젝트입니다. 하드웨어 조립 및 센서 제어 가능하신 분!", category: ["캡스톤", "전자", "기획"], requiredMembers: 1, appliedMembers: 1, createdAt: "2026-05-15", deadline: "2026-05-20" }, // 마감 (회색) · 기한마감
    // ── 빨강: D-Day / D-1 / D-3 (≤ 3일) ────────────────────────────
    { id: 302, title: "친환경 배터리 효율 개선 캡스톤 디자인", author: "화공학도", content: "리튬이온 배터리 열화 현상 분석 및 효율 개선을 주제로 캡스톤 진행할 팀원 구합니다. 관련 랩실 경험자 우대합니다.", category: ["화공", "캡스톤", "연구"], requiredMembers: 2, appliedMembers: 1, createdAt: "2026-05-19", deadline: "2026-06-04" }, // D-Day (빨강) · 모집중
    { id: 303, title: "스마트홈 IoT 제어 시스템 프로토타입 제작", author: "전자회로", content: "아두이노와 라즈베리파이를 활용한 스마트홈 제어기기 공모전 준비 팀입니다. 회로 설계 및 임베디드 코딩 담당하실 분 찾아요.", category: ["전자", "IoT", "프로젝트"], requiredMembers: 1, appliedMembers: 0, createdAt: "2026-05-19", deadline: "2026-06-05" }, // D-1 (빨강) · 모집중
    { id: 306, title: "스마트 팩토리 공정 데이터 분석 프로젝트", author: "산공과", content: "제조 공정 불량률 예측 모델링 학술제 준비합니다. Python, 머신러닝(Scikit-learn) 경험 있으신 분 찾습니다.", category: ["산공", "빅데이터", "프로젝트"], requiredMembers: 2, appliedMembers: 2, createdAt: "2026-05-17", deadline: "2026-06-07" }, // D-3 (빨강) · 인원마감
    // ── 주황: D-4 ~ D-7 ─────────────────────────────────────────────
    { id: 304, title: "LH 친환경 건축 공모전 준비하실 분", author: "건축공학", content: "탄소중립 친환경 주거단지 설계 공모전 나갑니다. 캐드, 스케치업 다루실 줄 아는 분과 패널 디자인해주실 분 구해요.", category: ["건축", "공모전", "설계"], requiredMembers: 2, appliedMembers: 1, createdAt: "2026-05-18", deadline: "2026-06-08" }, // D-4 (주황) · 모집중
    { id: 305, title: "하드웨어 기반 스타트업 창업 동아리원 모집", author: "열정맨", content: "웨어러블 디바이스로 예비창업패키지 지원하려고 합니다. 기구 설계 및 사업계획서 함께 작성하실 분들의 많은 연락 바랍니다.", category: ["창업", "대외활동", "기획"], requiredMembers: 2, appliedMembers: 2, createdAt: "2026-05-18", deadline: "2026-06-09" }, // D-5 (주황) · 인원마감
    { id: 307, title: "드론 자율주행 알고리즘 개발 스터디", author: "하늘비행", content: "ROS와 OpenCV를 활용해서 드론 자율 비행 알고리즘 공부하고 실제 구현해보는 스터디입니다. 전공 무관!", category: ["자율주행", "Vision", "스터디"], requiredMembers: 4, appliedMembers: 3, createdAt: "2026-05-17", deadline: "2026-06-11" }, // D-7 (주황) · 모집중
    // ── 파랑: D-8 이상 / 상시모집 ──────────────────────────────────
    { id: 308, title: "학식 정보 제공 앱 개발 (프론트/백엔드)", author: "컴공과", content: "교내 식당 메뉴와 혼잡도를 보여주는 앱을 만들려고 합니다. Spring Boot 또는 React/Flutter 하시는 분들 지원해주세요.", category: ["프론트엔드", "백엔드", "프로젝트"], requiredMembers: 2, appliedMembers: 1, createdAt: "2026-05-16", deadline: "2026-06-14" }, // D-10 (파랑) · 모집중
    { id: 309, title: "지능형 로봇 경진대회 알고리즘 담당자 구함", author: "로봇팔", content: "로봇 팔 제어 및 물체 인식 파트 담당하실 분 구합니다. C++ 익숙하신 분이면 좋겠습니다.", category: ["AI", "기계", "공모전"], requiredMembers: 1, appliedMembers: 0, createdAt: "2026-05-16", deadline: null }, // 상시모집 (파랑) · 모집중
];
