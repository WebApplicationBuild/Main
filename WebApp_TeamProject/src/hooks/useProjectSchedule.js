import { useContext } from "react";

import { defaultProjectData } from "../store/initialData";
import { ProjectContext } from "../store/ProjectContext";

import { createSchedule } from "../api/scheduleApi";

function useProjectSchedule(projectId) {
  const numericProjectId = Number(projectId);
  // ★ URL에서 받은 projectId는 문자열이므로 숫자로 변환

  /*
    ☆ 수정:
    ProjectProvider에서 관리하는
    projectData를 사용

    기존:
    useProjectSchedule 내부에서
    useState로 상태 생성

    수정 후:
    ProjectProvider가 가진 상태를
    가져와서 사용

    장점:
    - 페이지 이동 시 데이터 유지
    - 프로젝트별 데이터 분리
    - 다른 페이지에서도 사용 가능
    - 상태를 부모에서 관리
  */
  const {
    projectData,
    setProjectData,
  } = useContext(ProjectContext);

  /*
    ☆ 수정:
    현재 projectId에 해당하는 데이터 가져오기

    예:
    projectId = 201

    projectData[201]
      → members
      → schedules
      → voteList
  */
  const currentProjectData =
    projectData[numericProjectId] || defaultProjectData;

  const members = currentProjectData.members;
  const schedules = currentProjectData.schedules;
  const voteList = currentProjectData.voteList || [];

  function addSchedule(title) {
    const newSchedule =
      createSchedule(title, numericProjectId);

    /*
      ☆ 수정:
      특정 프로젝트의 schedules만 수정
    */
    setProjectData((prevData) => ({
      ...prevData,

      [numericProjectId]: {
        ...prevData[numericProjectId],

        schedules: [
          ...prevData[numericProjectId].schedules,
          newSchedule,
        ],
      },
    }));
  }

  function moveToVote(id) {
    const target =
      schedules.find((schedule) => schedule.id === id);

    if (!target) return;

    const voteItem = {
      ...target,
      trueCount: 0,
      falseCount: 0,
    };

    /*
      ☆ 수정:
      schedules와 voteList를
      현재 프로젝트 내부에서만 수정
    */
    setProjectData((prevData) => ({
      ...prevData,

      [numericProjectId]: {
        ...prevData[numericProjectId],

        schedules:
          prevData[numericProjectId].schedules.filter(
            (schedule) => schedule.id !== id
          ),

        voteList: [
          ...(prevData[numericProjectId].voteList || []),
          voteItem,
        ],
      },
    }));
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
      updatedList.find((item) => item.id === id);

    if (!selectedItem) return;

    if (selectedItem.trueCount >= 3) {
      const restoredSchedule = {
        id: selectedItem.id,

        // ★ 복구될 때도 프로젝트 ID 유지
        projectId: selectedItem.projectId,

        title: selectedItem.title,
        day: selectedItem.day,
      };

      /*
        ☆ 수정:
        True 3표 이상이면
        현재 프로젝트 일정 리스트로 복구
      */
      setProjectData((prevData) => ({
        ...prevData,

        [numericProjectId]: {
          ...prevData[numericProjectId],

          schedules: [
            ...prevData[numericProjectId].schedules,
            restoredSchedule,
          ],

          voteList:
            updatedList.filter(
              (item) => item.id !== id
            ),
        },
      }));
    } else {
      setProjectData((prevData) => ({
        ...prevData,

        [numericProjectId]: {
          ...prevData[numericProjectId],

          voteList: updatedList,
        },
      }));
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
      updatedList.find((item) => item.id === id);

    if (!selectedItem) return;

    if (selectedItem.falseCount >= 3) {

      /*
        ☆ 수정:
        False 3표 이상이면
        현재 프로젝트 voteList에서 제거
      */
      setProjectData((prevData) => ({
        ...prevData,

        [numericProjectId]: {
          ...prevData[numericProjectId],

          voteList:
            updatedList.filter(
              (item) => item.id !== id
            ),
        },
      }));
    } else {
      setProjectData((prevData) => ({
        ...prevData,

        [numericProjectId]: {
          ...prevData[numericProjectId],

          voteList: updatedList,
        },
      }));
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