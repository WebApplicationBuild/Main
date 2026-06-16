import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast, useConfirm } from "../contexts/toastHooks";
import { useProjectManageData } from "../store/projectManageDataContext";

import useProjectSchedule from "../hooks/useProjectSchedule";
import TeamMemberList from "../components/ProjectManagePage/TeamMemberList";
import WeeklyScheduleBox from "../components/ProjectManagePage/WeeklyScheduleBox";
import ScheduleInput from "../components/ProjectManagePage/ScheduleInput";
import ScheduleList from "../components/ProjectManagePage/ScheduleList";
import VoteList from "../components/ProjectManagePage/VoteList";
import ProjectChatBox from "../components/ProjectManagePage/ProjectChatBox";

import "../styles/project/ProjectLayout.css";
import "../styles/project/ProjectPage.css";
import "../styles/project/TeamMemberList.css";
import "../styles/project/WeeklyScheduleBox.css";
import "../styles/project/ScheduleList.css";
import "../styles/project/VoteBox.css";

function ProjectPageContent({ projectId }) {
  const { user } = useAuth();
  const showToast = useToast();
  const showConfirm = useConfirm();
  const { myProjectsData, deleteMyProject } = useProjectManageData();
  const navigate = useNavigate();
  const numericProjectId = Number(projectId);
  const currentProject = myProjectsData.find(
    (project) => project.id === numericProjectId
  );
  const isProjectOwner = Boolean(
    currentProject?.ownerId && user?.uid && currentProject.ownerId === user.uid
  );

  const {
    members,
    schedules,
    voteList,
    addSchedule,
    moveToVote,
    voteTrue,
    voteFalse,
  } = useProjectSchedule(projectId);

  const handleDeleteProject = async () => {
    if (!currentProject) return;

    if (!isProjectOwner) {
      showToast("팀장만 프로젝트를 삭제할 수 있습니다.", "warning");
      return;
    }

    const confirmed = await showConfirm(
      `[${currentProject.title}] 프로젝트를 삭제하시겠습니까?`
    );

    if (!confirmed) return;

    deleteMyProject(currentProject.id);
    showToast("프로젝트가 삭제되었습니다.", "success");
    navigate("/projectManage");
  };

  return (
    <div className="project-page">
      <div className="project-page__body">
        {/* 내 프로젝트 이동 네비게이션 카드 */}
        <div className="project-nav-section">
          <h3 className="project-nav-title">
            내 프로젝트 목록 (클릭 시 이동)
          </h3>

          <div className="project-nav-cards">
            {myProjectsData.map(project => {
              const isActive = projectId && project.id === Number(projectId);
              return (
                <div
                  key={project.id}
                  className={`project-nav-card${isActive ? " is-active" : ""}`}
                  onClick={() => navigate(`/projectManage/${project.id}`)}
                >
                  <div className="project-nav-card-title">{project.title}</div>
                  <div className="project-nav-card-meta">
                    {project.status} • 팀원 {project.members}명
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {projectId && currentProject ? (
          <>
            <div className="project-detail-header">
              <div>
                <h2 className="project-detail-title">{currentProject.title}</h2>
                <p className="project-detail-meta">
                  {currentProject.status} · 팀원 {currentProject.members}명
                </p>
              </div>

              {isProjectOwner && (
                <button
                  type="button"
                  className="project-delete-button"
                  onClick={handleDeleteProject}
                >
                  프로젝트 삭제
                </button>
              )}
            </div>

            <div className="main-layout">
              <div className="left-section">
                <TeamMemberList members={members} />
                <WeeklyScheduleBox schedules={schedules} />
              </div>

              <div className="right-section">
                <h2 className="section-title">일정 리스트</h2>
                <ScheduleInput onAdd={addSchedule} />
                <ScheduleList schedules={schedules} onMoveToVote={moveToVote} />
                <VoteList
                  voteList={voteList}
                  onVoteTrue={voteTrue}
                  onVoteFalse={voteFalse}
                />
              </div>
            </div>
            <ProjectChatBox projectId={projectId} />
          </>
        ) : (
          <div className="project-empty-state">
            <h2 className="project-empty-title">
              위 목록에서 관리할 프로젝트를 선택해주세요 👆
            </h2>
            <p className="project-empty-desc">
              프로젝트 카드를 클릭하면 상세 일정과 팀원 명단을 확인할 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectPage() {
  const { projectId } = useParams();
  return (
    // key를 projectId에 묶어 다른 프로젝트로 이동할 때 컴포넌트를 통째로 새로 마운트한다.
    // (그래야 useProjectSchedule 등 내부 state가 이전 프로젝트의 값을 들고 있지 않음)
    <ProjectPageContent
      key={projectId ?? "project-overview"}
      projectId={projectId}
    />
  );
}

export default ProjectPage;
