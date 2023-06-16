// TODO : 테스트 코드 작성
export const searchParam = (key: string) => {
  return new URLSearchParams(location.search).get(key);
};
