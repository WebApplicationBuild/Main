/*
  ☆ 수정:
  WeeklyScheduleBox는 단순 리스트 출력 컴포넌트가 아님

  역할:
  - 일정 데이터를 요일별로 분류
  - 주간 일정 현황 출력

  따라서 ScheduleList나 TeamMemberList처럼
  EditableList로 완전히 대체하지 않고

  현재 구조를 유지하면서
  일정 데이터를 가공하여 보여주는 역할 담당
*/

function WeeklyScheduleBox({ schedules }) {

    const days = [
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
        "일요일",
    ];
    // 요일 목록 배열 저장 부분

    return (
    <div className="box weekly-box"> {/* 주간 일정 박스 영역 부분 */}

      <h2>
        다가오는 일정
      </h2>
      {/* 주간 일정 제목 출력 부분 */}

      {/*
        ☆ 수정:
        days 배열을 순회하면서

        각 요일에 해당하는 일정들을 찾아
        화면에 출력

        예:

        월요일
        → 기획 회의

        화요일
        → UI 설계
      */}
      {days.map((day) => {

        /*
          ☆ 수정:
          현재 요일(day)에 해당하는 일정만 필터링

          예:
          day = "월요일"

          결과:
          [
            { title: "기획 회의" }
          ]
        */
        const daySchedules =
          schedules.filter(
            (item) => item.day === day
          );

        return (

          <p key={day}> {/* 요일별 일정 한 줄 출력 부분 */}

            <strong>
              {day} 일정 :
            </strong>{" "}
            {/* 요일 이름 출력 부분 */}

            {daySchedules.length > 0

              ? daySchedules
                  .map((item) => item.title)
                  .join(", ")

              // 일정이 있으면 일정 제목 출력 역할

              : "없음"}

            {/* 일정이 없으면 없음 출력 역할 */}

          </p>

        );
      })}

    </div>
    );
}

export default WeeklyScheduleBox;