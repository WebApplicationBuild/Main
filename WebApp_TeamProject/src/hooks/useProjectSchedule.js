import { useState } from "react";
import { projectInitialData, defaultProjectData } from "../store/initialData";
import { createSchedule } from "../api/scheduleApi";

function useProjectSchedule(projectId) {
  const numericProjectId = Number(projectId); // ★ URL에서 받은 projectId는 문자열이므로 숫자로 변환

  const currentProjectData =
    projectInitialData[numericProjectId] || defaultProjectData;
  // ★ projectId에 맞는 기본 데이터를 가져오고, 없으면 기본 데이터 사용

  const [members] = useState(currentProjectData.members); // 팀원 목록 상태 저장 부분
  const [schedules, setSchedules] = useState(currentProjectData.schedules); // 일정 리스트 상태 관리 부분
  const [voteList, setVoteList] = useState([]); // 투표 리스트 상태 관리 부분

  function addSchedule(title) {
    const newSchedule = createSchedule(title, numericProjectId); // ★ 현재 projectId를 포함해서 새 일정 생성

    setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
    // ★ 이전 schedules 값을 기준으로 새 일정을 추가하여 state 안정성 높임
  }

  function moveToVote(id) {
    const target = schedules.find((schedule) => schedule.id === id);

    if (!target) return;

    const voteItem = {
      ...target,
      trueCount: 0,
      falseCount: 0,
    };

    setSchedules((prevSchedules) =>
      prevSchedules.filter((schedule) => schedule.id !== id)
    );

    setVoteList((prevVoteList) => [...prevVoteList, voteItem]);
  }

  function voteTrue(id) {
    const updatedList = voteList.map((item) =>
      item.id === id
        ? { ...item, trueCount: item.trueCount + 1 }
        : item
    );

    const selectedItem = updatedList.find((item) => item.id === id);

    if (!selectedItem) return;

    if (selectedItem.trueCount >= 3) {
      const restoredSchedule = {
        id: selectedItem.id,
        projectId: selectedItem.projectId, // ★ 복구될 때도 프로젝트 ID 유지
        title: selectedItem.title,
        day: selectedItem.day,
      };

      setSchedules((prevSchedules) => [...prevSchedules, restoredSchedule]);
      setVoteList(updatedList.filter((item) => item.id !== id));
    } else {
      setVoteList(updatedList);
    }
  }

  function voteFalse(id) {
    const updatedList = voteList.map((item) =>
      item.id === id
        ? { ...item, falseCount: item.falseCount + 1 }
        : item
    );

    const selectedItem = updatedList.find((item) => item.id === id);

    if (!selectedItem) return;

    if (selectedItem.falseCount >= 3) {
      setVoteList(updatedList.filter((item) => item.id !== id));
    } else {
      setVoteList(updatedList);
    }
  }

  return {
    members,
    schedules,
    voteList,
    addSchedule,
    moveToVote,
    voteTrue,
    voteFalse,
  };
}

export default useProjectSchedule;