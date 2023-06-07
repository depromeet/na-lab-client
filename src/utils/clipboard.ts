export const copyToClipBoard = (text: string) => {
  navigator.clipboard.writeText(text);
};
