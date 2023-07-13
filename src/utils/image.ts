export const imageDownloadPC = (imgSrc: string, fileName: string) => {
  const a = document.createElement('a');
  a.href = imgSrc;

  a.download = fileName;
  a.click();
};
