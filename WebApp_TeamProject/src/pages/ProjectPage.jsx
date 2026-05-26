import { useParams, useNavigate } from "react-router-dom";
import { myProjects } from "../api/mockData";

import useProjectSchedule from "../hooks/useProjectSchedule";
import TeamMemberList from "../components/ProjectManagePage/TeamMemberList";
import WeeklyScheduleBox from "../components/ProjectManagePage/WeeklyScheduleBox";
import ScheduleInput from "../components/ProjectManagePage/ScheduleInput";
import ScheduleList from "../components/ProjectManagePage/ScheduleList";
import VoteList from "../components/ProjectManagePage/VoteList";
import NavDropdown from "../components/NavDropdown";

import "../styles/App.css";
import "../styles/TeamMemberList.css";
import "../styles/WeeklyScheduleBox.css";
import "../styles/ScheduleList.css";
import "../styles/VoteBox.css";

function ProjectPageContent({ projectId }) {
  const navigate = useNavigate();

  /*
    ★ 추가:
    현재 URL의 projectId와 같은 프로젝트를 myProjects에서 찾는 부분

    예:
    /projectManage/201 이면
    id가 201인 프로젝트 정보를 가져옴
  */
  const currentProject = myProjects.find(
    (project) => project.id === Number(projectId)
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

  return (
    <div className="project-page">
      <header className="page-header" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr auto 1fr', 
        alignItems: 'center',
        padding: '0 32px',
        height: '72px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e9ecef',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        margin: '-20px -20px 20px -20px' // App.css 등 기본 여백 상쇄용
      }}>
        <div 
          className="header-logo" 
          onClick={() => navigate('/')}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: '#475569',
            justifySelf: 'start',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          로고
        </div>

        {/* 
          ★ 수정:
          기존에는 항상 "프로젝트 관리 페이지"만 출력되었음

          이제는 현재 선택한 프로젝트 제목을 가져와:
          "캡스톤: 협동 퍼즐 게임 관리 페이지"
          형태로 동적으로 변경됨
        */}
        <h1 
          className="page-title" 
          style={{ 
            margin: 0, 
            fontSize: '32px', 
            fontWeight: '700', 
            textAlign: 'center' 
          }}
        >
          {currentProject
            ? `${currentProject.title} 관리 페이지`
            : "프로젝트 관리 페이지"}
        </h1>

        <div className="header-spacer"><NavDropdown /></div>
      </header>

      {/* --- 상단: 내 프로젝트 이동 네비게이션 카드 --- */}
      <div 
        className="project-nav-section" 
        style={{ 
          margin: '20px 0', 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px' 
        }}
      >
        <h3 
          style={{ 
            margin: '0 0 10px 0', 
            fontSize: '1rem', 
            color: '#495057' 
          }}
        >
          내 프로젝트 목록 (클릭 시 이동)
        </h3>

        <div 
          className="project-nav-cards" 
          style={{ 
            display: 'flex', 
            gap: '15px', 
            overflowX: 'auto', 
            paddingBottom: '10px' 
          }}
        >
          {myProjects.map(project => {

            // 현재 선택된 프로젝트 카드인지 확인
            const isActive = projectId && project.id === Number(projectId);

            return (
              <div 
                key={project.id}
                onClick={() => navigate(`/projectManage/${project.id}`)}
                style={{
                  minWidth: '200px',
                  padding: '12px 16px',
                  backgroundColor: isActive ? '#e6fcf5' : 'white',
                  border: `2px solid ${isActive ? '#20c997' : '#dee2e6'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  transform: isActive ? 'translateY(-2px)' : 'none'
                }}
              >
                <div 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '0.95rem', 
                    color: isActive ? '#0ca678' : '#343a40', 
                    marginBottom: '4px' 
                  }}
                >
                  {project.title}
                </div>

                <div 
                  style={{ 
                    fontSize: '0.8rem', 
                    color: '#868e96' 
                  }}
                >
                  {project.status} • 팀원 {project.members}명
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 
        projectId가 있을 때만 상세 내용 표시
        없으면 안내 문구 표시
      */}
      {projectId ? (
        <>
          {/* 기존 레이아웃 */}
          <div className="main-layout">
            <div className="left-section">

              {/* 팀원 목록 출력 */}
              <TeamMemberList members={members} />

              {/* 요일별 일정 출력 */}
              <WeeklyScheduleBox schedules={schedules} />
            </div>

            <div className="right-section">
              <h2 className="section-title">일정 리스트</h2>

              {/* 일정 입력 */}
              <ScheduleInput onAdd={addSchedule} />

              {/* 일정 목록 출력 */}
              <ScheduleList
                schedules={schedules}
                onMoveToVote={moveToVote}
              />

              {/* 삭제 요청 투표 리스트 */}
              <VoteList
                voteList={voteList}
                onVoteTrue={voteTrue}
                onVoteFalse={voteFalse}
              />
            </div>
          </div>
        </>
      ) : (
        <div 
          style={{ 
            textAlign: 'center', 
            padding: '60px 20px', 
            backgroundColor: '#fdfdfd', 
            borderRadius: '8px', 
            border: '1px dashed #ced4da' 
          }}
        >
          <h2 
            style={{ 
              color: '#495057', 
              fontSize: '1.2rem', 
              margin: '0 0 10px 0' 
            }}
          >
            위 목록에서 관리할 프로젝트를 선택해주세요 👆
          </h2>

          <p 
            style={{ 
              color: '#868e96', 
              fontSize: '0.9rem', 
              margin: 0 
            }}
          >
            프로젝트 카드를 클릭하면 상세 일정과 팀원 명단을 확인할 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectPage() {
  const { projectId } = useParams();

  return (
    <ProjectPageContent
      key={projectId ?? "project-overview"}
      projectId={projectId}
    />
  );
}

export default ProjectPage;