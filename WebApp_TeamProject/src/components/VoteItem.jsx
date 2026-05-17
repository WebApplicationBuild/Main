function VoteItem({ item, onVoteTrue, onVoteFalse }) {
    return (
    <div className="vote-item"> {/* 투표 항목 하나를 감싸는 영역 부분 */}
      <h3>{item.title}</h3> {/* 투표 대상 일정 제목 출력 부분 */}

      <p>True : {item.trueCount}표</p> {/* True 투표 수 출력 부분 */}
      <p>False : {item.falseCount}표</p> {/* False 투표 수 출력 부분 */}

      <button onClick={() => onVoteTrue(item.id)}>True</button> {/* True 투표 버튼 출력 부분 */}
      <button onClick={() => onVoteFalse(item.id)}>False</button> {/* False 투표 버튼 출력 부분 */}
    </div>
    );
}

export default VoteItem; 