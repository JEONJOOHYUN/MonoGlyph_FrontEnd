/** 초를 "분 초" 형식으로 변환 */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분 ${remainingSeconds.toFixed(0)}초`;
};

/** 초를 상세한 "분 초 밀리초" 형식으로 변환 */
export const formatSecDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  const cs = Math.round((seconds - Math.floor(seconds)) * 100);
  const parts: string[] = [];
  if (minutes > 0) parts.push(`${minutes}분`);
  parts.push(`${sec}초`);
  if (cs > 0) parts.push(cs.toString().padStart(2, "0"));
  return parts.join(" ");
};

/** 퍼센트 값을 포맷팅 */
export const formatPercent = (value: number): string =>
  value.toFixed(2).padStart(5, " ");
