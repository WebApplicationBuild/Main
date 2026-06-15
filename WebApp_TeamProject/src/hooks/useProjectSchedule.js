import { useEffect } from "react";

import { createSchedule } from "../api/scheduleApi";
import { useProjectManageData } from "../store/projectManageDataContext";

function useProjectSchedule(projectId) {
  const numericProjectId = Number(projectId);
  // ★ URL에서 받은 projectId는 문자열이므로 숫자로 변환

  /*
    ☆ 수정:
    ProjectContext 대신

    ProjectManageDataProvider에서 제공하는
    프로젝트 데이터 관리 함수 사용
  */
  const {
    getProjectManageData,
    updateProjectManageData,
  } = useProjectManageData();

  /*
    ☆ 수정:
    현재 프로젝트 데이터 조회
  */
  const currentProjectData =
    getProjectManageData(numericProjectId);

  const members = currentProjectData.members;
  const schedules = currentProjectData.schedules;
  const voteList = currentProjectData.voteList;

  useEffect(() => {
    document.title = "TeaMo | 프로젝트 관리";
  }, []);

  function addSchedule(title) {
    const newSchedule =
      createSchedule(title, numericProjectId);

    updateProjectManageData(
      numericProjectId,
      (prevData) => ({
        ...prevData,

        schedules: [
          ...prevData.schedules,
          newSchedule,
        ],
      })
    );
  }

  function moveToVote(id) {
    const target =
      schedules.find(
        (schedule) => schedule.id === id
      );

    if (!target) return;

    const voteItem = {
      ...target,
      trueCount: 0,
      falseCount: 0,
    };

    updateProjectManageData(
      numericProjectId,
      (prevData) => ({
        ...prevData,

        schedules:
          prevData.schedules.filter(
            (schedule) => schedule.id !== id
          ),

        voteList: [
          ...prevData.voteList,
          voteItem,
        ],
      })
    );
  }

  function voteTrue(id) {
    const updatedList = voteList.map((item) =>
      item.id === id
        ? {
            ...item,
            trueCount: item.trueCount + 1,
          }
        : item
    );

    const selectedItem =
      updatedList.find(
        (item) => item.id === id
      );

    if (!selectedItem) return;

    if (selectedItem.trueCount >= 3) {
      const restoredSchedule = {
        id: selectedItem.id,

        // ★ 복구될 때도 프로젝트 ID 유지
        projectId: selectedItem.projectId,

        title: selectedItem.title,
        day: selectedItem.day,
      };

      updateProjectManageData(
        numericProjectId,
        (prevData) => ({
          ...prevData,

          schedules: [
            ...prevData.schedules,
            restoredSchedule,
          ],

          voteList:
            updatedList.filter(
              (item) => item.id !== id
            ),
        })
      );
    } else {
      updateProjectManageData(
        numericProjectId,
        (prevData) => ({
          ...prevData,

          voteList: updatedList,
        })
      );
    }
  }

  function voteFalse(id) {
    const updatedList = voteList.map((item) =>
      item.id === id
        ? {
            ...item,
            falseCount: item.falseCount + 1,
          }
        : item
    );

    const selectedItem =
      updatedList.find(
        (item) => item.id === id
      );

    if (!selectedItem) return;

    if (selectedItem.falseCount >= 3) {
      updateProjectManageData(
        numericProjectId,
        (prevData) => ({
          ...prevData,

          voteList:
            updatedList.filter(
              (item) => item.id !== id
            ),
        })
      );
    } else {
      updateProjectManageData(
        numericProjectId,
        (prevData) => ({
          ...prevData,

          voteList: updatedList,
        })
      );
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
