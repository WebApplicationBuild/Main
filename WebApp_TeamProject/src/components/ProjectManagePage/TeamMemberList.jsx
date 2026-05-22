function TeamMemberList({ members }) {
    return (
    <div className="box team-box"> {/* 팀 명단 박스 영역 부분 */}
      <h2>팀 명단 리스트</h2> {/* 팀 명단 제목 출력 부분 */}

        {members.map((member) => (
        <p key={member.id}> {/* 팀원 한 명씩 출력하는 부분 */}
          <strong>{member.role}</strong> : {member.name} {/* 팀원 역할과 이름 출력 부분 */}
        </p>
        ))}
    </div>
    );
}

export default TeamMemberList; 