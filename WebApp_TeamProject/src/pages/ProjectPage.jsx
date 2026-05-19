import { useParams, Link } from "react-router-dom"; // ★ URL의 projectId와 메인 이동 링크 사용
import { recentProjects, myProjects } from "../api/mockData"; // ★ 친구 코드의 프로젝트 목록 데이터 사용

import useProjectSchedule from "../hooks/useProjectSchedule";
import TeamMemberList from "../components/ProjectManagePage/TeamMemberList";
import WeeklyScheduleBox from "../components/ProjectManagePage/WeeklyScheduleBox";
import ScheduleInput from "../components/ProjectManagePage/ScheduleInput";
import ScheduleList from "../components/ProjectManagePage/ScheduleList";
import VoteList from "../components/ProjectManagePage/VoteList";

import "../styles/App.css";
import "../styles/TeamMemberList.css";
import "../styles/WeeklyScheduleBox.css";
import "../styles/ScheduleList.css";
import "../styles/VoteBox.css";

function ProjectPage() {
  const { projectId } = useParams(); // ★ /projectManage/:projectId 에서 projectId 값을 가져오는 부분

  const allProjects = [...recentProjects, ...myProjects]; // ★ 최신 프로젝트와 내 프로젝트를 합쳐서 검색
    const currentProject = allProjects.find(
    (project) => project.id === Number(projectId)
  ); // ★ 현재 URL의 projectId와 같은 프로젝트 찾기

    const {
    members,
    schedules,
    voteList,
    addSchedule,
    moveToVote,
    voteTrue,
    voteFalse,
  } = useProjectSchedule(projectId); // ★ projectId별 일정 데이터를 사용하도록 전달

    return (
    <div className="project-page">
        <h1 className="page-title">프로젝트 관리 페이지</h1>

      {/* ★ 현재 어떤 프로젝트에 들어왔는지 보여주는 부분 */}
    <div className="project-info">
        <p>
        현재 프로젝트 ID: <strong>{projectId}</strong>
        </p>

        <p>
        프로젝트 이름:{" "}
        <strong>
        {currentProject ? currentProject.title : "등록되지 않은 프로젝트"}
        </strong>
        </p>

        <Link to="/">← 메인으로</Link>
        </div>

        <div className="main-layout">
        <div className="left-section">
        <TeamMemberList members={members} />
        <WeeklyScheduleBox schedules={schedules} />
        </div>

        <div className="right-section">
        <h2 className="section-title">일정 리스트</h2>

        <ScheduleInput onAdd={addSchedule} />

        <ScheduleList
            schedules={schedules}
            onMoveToVote={moveToVote}
        />

        <VoteList
            voteList={voteList}
            onVoteTrue={voteTrue}
            onVoteFalse={voteFalse}
        />
            </div>
        </div>
    </div>
    );
}

export default ProjectPage;