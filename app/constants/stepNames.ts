/** 스텝 이름 한글 매핑 */
export const STEP_NAME_KR: Record<string, string> = {
  gpt_api: "AI 이미지 생성",
  pre_processing: "전처리",
  inference_MX: "폰트 추론",
  fontforge_ttf: "TTF 폰트 생성",
};

/** 스텝 이름을 한글(영문) 형식으로 변환 */
export const formatStepName = (name: string): string => {
  const korean = STEP_NAME_KR[name];
  return korean ? `${korean} (${name})` : name;
};
