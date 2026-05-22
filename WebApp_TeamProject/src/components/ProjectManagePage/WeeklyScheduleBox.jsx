function WeeklyScheduleBox({ schedules }) {
    const days = [
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일",
  ]; // 요일 목록 배열 저장 부분

    return (
    <div className="box weekly-box"> {/* 주간 일정 박스 영역 부분 */}
      <h2>주차별로 다가오는 일정 알려주는 표</h2> {/* 주간 일정 제목 출력 부분 */}

        {days.map((day) => {
        const daySchedules = schedules.filter((item) => item.day === day); // 현재 요일에 해당하는 일정만 찾는 부분

        return (
          <p key={day}> {/* 요일별 일정 한 줄 출력 부분 */}
            <strong>{day} 일정 :</strong>{" "} {/* 요일 이름 출력 부분 */}
            {daySchedules.length > 0
              ? daySchedules.map((item) => item.title).join(", ") // 일정이 있으면 일정 제목 출력 역할
              : "없음"} {/* 일정이 없으면 없음 출력 역할 */}
            </p>
        );
        })}
    </div>
    );
}

export default WeeklyScheduleBox; 