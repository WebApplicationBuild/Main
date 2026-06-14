export function createSchedule(title, projectId) {
    return {
    id: Date.now(), // 현재 시간을 이용해서 고유 id 생성 부분
    projectId: Number(projectId), // ★ 어떤 프로젝트에서 만든 일정인지 저장하는 부분
    title: title, // 입력받은 일정 제목 저장 부분
    day: "미정", // 새 일정의 기본 요일 설정 부분
    };
} // 새로운 일정 객체 생성 역할