// Board(매칭 게시판)와 RecentProjects(메인 최신 프로젝트)에서 동일한 D-Day 배지를
// 각자 만들어 쓰고 있어서 한쪽만 고치면 어긋나는 문제가 있었다. 계산 로직을 한 곳으로 모은다.
export function getDDayInfo(deadline) {
  if (!deadline) return { text: '상시모집', color: '#228be6', isClosed: false };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간 단위를 제외하고 날짜만 비교

  const targetDate = new Date(deadline);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // 이미 마감된 경우 (회색)
  if (diffDays < 0) return { text: '마감', color: '#868e96', isClosed: true };
  // 오늘 마감 (빨간색 강조)
  if (diffDays === 0) return { text: 'D-Day', color: '#e03131', isClosed: false };
  // 마감 3일 이내 (빨간색 강조)
  if (diffDays <= 3) return { text: `D-${diffDays}`, color: '#e03131', isClosed: false };
  // 마감 7일 이내 (주황색 강조)
  if (diffDays <= 7) return { text: `D-${diffDays}`, color: '#fd7e14', isClosed: false };
  // 그 외 넉넉한 기간 (파란색)
  return { text: `D-${diffDays}`, color: '#228be6', isClosed: false };
}
