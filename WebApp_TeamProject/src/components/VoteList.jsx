import VoteItem from "./VoteItem"; // 투표 항목 컴포넌트 불러옴

function VoteList({ voteList, onVoteTrue, onVoteFalse }) {
    return (
    <div className="vote-box"> {/* 투표 박스 전체 영역 부분 */}
      <h2>일정 리스트로 다시 올라갈 일정 투표</h2> {/* 투표 박스 제목 출력 부분 */}
      <p>True가 3표 이상이면 다시 일정 리스트로 올라갑니다.</p> {/* 투표 조건 설명 출력 부분 */}

        {voteList.length === 0 ? (
        <p className="empty-text">투표할 일정이 없습니다.</p> // 투표할 일정이 없을 때 출력 부분
        ) : (
        voteList.map((item) => (
            <VoteItem
            key={item.id}
            item={item}
            onVoteTrue={onVoteTrue}
            onVoteFalse={onVoteFalse}
          /> // 투표 항목 하나씩 출력하는 역할
        ))
        )}
    </div>
    );
}

export default VoteList; 