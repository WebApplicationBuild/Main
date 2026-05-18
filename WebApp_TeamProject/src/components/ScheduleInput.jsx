import { useRef, useState } from "react"; // useState와 useRef 기능 불러옴

function ScheduleInput({ onAdd }) {
  const [content, setContent] = useState(""); // 입력창 값을 저장하는 상태 부분
  const inputRef = useRef(); // input 태그에 직접 접근하기 위한 ref 부분

    function handleChange(e) {
    setContent(e.target.value); // 입력값이 바뀔 때 state 업데이트 역할
    }

    function handleSubmit() {
    if (content.trim() === "") {
      inputRef.current.focus(); // 빈 입력일 때 입력창에 다시 포커스 주는 역할
      return; // 빈 값은 추가하지 않고 함수 종료 역할
    }

    onAdd(content); // 부모에게 받은 일정 추가 함수 실행 부분
    setContent(""); // 일정 추가 후 입력창 비우는 부분
    inputRef.current.focus(); // 일정 추가 후 입력창에 다시 포커스 주는 역할
    }

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