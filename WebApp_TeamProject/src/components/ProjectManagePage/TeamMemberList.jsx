import EditableList from "./EditableList";

/*
  ☆ 수정:
  기존에는 TeamMemberList 내부에서
  members.map()을 사용해 직접 출력했음

  수정 후:
  EditableList 컴포넌트를 이용하여
  재사용 가능한 리스트 구조 적용

  장점:
  - 일정 리스트
  - 팀원 리스트
  - 공지사항 리스트

  등을 동일한 방식으로 출력 가능
*/

function TeamMemberList({ members }) {
    return (
    <div className="box team-box"> {/* 팀 명단 박스 영역 부분 */}

      <EditableList
        title="팀 명단 리스트"

        items={members}

        /*
          ☆ 수정:
          EditableList가 각 팀원을 출력할 수 있도록
          renderItem 함수를 전달

          member 객체:
          {
            id,
            role,
            name
          }
        */
        renderItem={(member) => (

          <p key={member.id}> {/* 팀원 한 명씩 출력하는 부분 */}

            <strong>{member.role}</strong> : {member.name}
            {/* 팀원 역할과 이름 출력 부분 */}

          </p>

        )}
      />

    </div>
    );
}

export default TeamMemberList;