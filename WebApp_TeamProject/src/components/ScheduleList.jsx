import ScheduleItem from "./ScheduleItem"; // 일정 하나를 출력하는 컴포넌트 불러옴

function ScheduleList({ schedules, onMoveToVote }) {
    return (
    <div className="schedule-list"> {/* 일정 리스트 전체 영역 부분 */}
        {schedules.map((schedule, index) => (
        <ScheduleItem
            key={schedule.id}
            index={index}
            schedule={schedule}
            onMoveToVote={onMoveToVote}
        /> // 일정 하나씩 출력하는 역할
        ))}
    </div>
    );
}

export default ScheduleList; 