/*
  ☆ 수정:
  기존에는 schedule 객체만 받을 수 있었음

  앞으로는 일정, 팀원, 공지사항 등
  다양한 데이터를 출력할 수 있도록
  item이라는 공통 이름 사용

  현재는 기존 기능과 호환되도록
  schedule을 item으로 이름만 변경
*/

function ScheduleItem({ item, index, onMoveToVote }) {
    return (
    <div className="schedule-item"> {/* 일정 하나를 감싸는 영역 부분 */}

      {/*
        ☆ 수정:
        기존 schedule.title

        앞으로는 item.title 사용

        장점:
        - 일정
        - 팀원
        - 공지

        등 다양한 데이터를 같은 컴포넌트에서 출력 가능
      */}
      <span>
        * 일정 {index + 1} : {item.title}
      </span> {/* 일정 번호와 제목 출력 부분 */}

      {/*
        ☆ 수정:
        삭제 요청 버튼

        현재는 일정 삭제 요청 기능

        추후:
        - 팀원 삭제
        - 공지 삭제
        - 할 일 삭제

        등으로 재사용 가능
      */}
      <button onClick={() => onMoveToVote(item.id)}>
        삭제 요청
      </button> {/* 삭제 요청 버튼 출력 부분 */}

    </div>
    );
}

export default ScheduleItem;