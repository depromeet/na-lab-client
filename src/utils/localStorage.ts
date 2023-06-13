export const removeLocalStorageItemWithPrefix = (prefix: string) => {
  if (typeof window === 'undefined') return;
  const keys = Object.keys(localStorage).filter((key) => key.startsWith(prefix));

  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};
