import useScheduleInput from "../../hooks/useScheduleInput"; // ★ 추가: 입력창 state 로직을 분리한 커스텀 훅 불러옴

function ScheduleInput({ onAdd }) {
  /*
    ★ 이동: 기존에 이 컴포넌트 안에 있던 useState, useRef, handleChange, handleSubmit 로직을 
    useScheduleInput 훅으로 이동시킴 
    이 컴포넌트는 이제 입력창 UI를 보여주는 역할에 집중
  */
  const {
    content,
    inputRef,
    handleChange,
    handleSubmit,
  } = useScheduleInput(onAdd);

  return (
    <div className="schedule-input"> {/* 일정 입력 전체 영역 부분 */}
      <input
        ref={inputRef}
        value={content}
        onChange={handleChange}
        placeholder="일정을 입력하세요"
      /> {/* 일정 입력창 출력 부분 */}

      <button onClick={handleSubmit}>추가</button> {/* 일정 추가 버튼 출력 부분 */}
    </div>
  );
}

export default ScheduleInput;