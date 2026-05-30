import ScheduleItem from "../ScheduleItem"; // 일정 하나를 출력하는 컴포넌트 불러옴

/*
    ☆ 수정:
    현재는 일정(schedules)만 출력하는 컴포넌트

    추후 목표:
    - 일정 리스트
    - 팀원 리스트
    - 주간 일정 리스트

    등 다양한 데이터를 출력할 수 있도록
    재사용 가능한 리스트 컴포넌트로 확장 예정

    현재는 기존 구조를 유지하면서
    ScheduleItem을 반복 출력하는 역할만 수행
*/

function ScheduleList({ schedules, onMoveToVote }) {
    return (
    <div className="schedule-list"> {/* 일정 리스트 전체 영역 부분 */}

        {/*
        schedules 배열을 순회하면서
        ScheduleItem 컴포넌트를 하나씩 생성

        ☆ 추후:
        schedules 대신 items 형태로 변경하면
        다른 데이터도 재사용 가능
        */}
        {schedules.map((schedule, index) => (

        <ScheduleItem
            key={schedule.id} // React가 요소를 구분하기 위한 고유 key
            index={index}

            /*
            ☆ 수정:
            schedule 대신 item으로 전달

            ScheduleItem을
            재사용 가능한 구조로 변경
            */
            item={schedule}

            onMoveToVote={onMoveToVote}
        />
        // 일정 하나씩 출력하는 역할

        ))}

    </div>
    );
}

export default ScheduleList;