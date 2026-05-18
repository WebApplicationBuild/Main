function ScheduleItem({ schedule, index, onMoveToVote }) {
    return (
    <div className="schedule-item"> {/* 일정 하나를 감싸는 영역 부분 */}
      <span>* 일정 {index + 1} : {schedule.title}</span> {/* 일정 번호와 제목 출력 부분 */}

        <button onClick={() => onMoveToVote(schedule.id)}>
        삭제 요청
      </button> {/* 삭제 요청 버튼 출력 부분 */}
    </div>
    );
}

export default ScheduleItem; 