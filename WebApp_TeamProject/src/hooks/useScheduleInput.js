import { useRef, useState } from "react";

/*
    ★ 이동: ScheduleInput.jsx 안에 있던 입력창 상태 관리 로직을 useScheduleInput 커스텀 훅으로 분리한 파일

    역할:
    - 입력창 값(content) 관리
    - 빈 입력 방지
    - 입력창 focus 처리
    - 일정 추가 후 입력창 초기화
*/

function useScheduleInput(onAdd) {
  const [content, setContent] = useState("");   // ★ 이동: 입력창 값을 저장하는 상태 부분
  const inputRef = useRef(null);                // ★ 이동: input 태그에 직접 접근하기 위한 ref 부분

    function handleChange(e) {
    setContent(e.target.value);                 // ★ 이동: 입력값이 바뀔 때 state 업데이트 역할
    }

    function handleSubmit() {
    if (content.trim() === "") {
      inputRef.current.focus();                 // ★ 이동: 빈 입력일 때 입력창에 다시 포커스 주는 역할
      return;                                   // ★ 이동: 빈 값은 추가하지 않고 함수 종료 역할
    }

    onAdd(content);                 // ★ 이동: 부모에게 받은 일정 추가 함수 실행 부분
    setContent("");                 // ★ 이동: 일정 추가 후 입력창 비우는 부분
    inputRef.current.focus();       // ★ 이동: 일정 추가 후 입력창에 다시 포커스 주는 역할
    }

    return {
    content,            // 입력창 현재 값 전달
    inputRef,           // input에 연결할 ref 전달
    handleChange,       // 입력값 변경 함수 전달
    handleSubmit,   // 추가 버튼 클릭 함수 전달
    };
}

export default useScheduleInput;