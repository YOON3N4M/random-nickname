type IdType = "item" | "category";

export function generateId(type: IdType) {
  return `${type}-${new Date().getTime()}`;
}

export function getLocalstorageItem(key: string) {
  const result = localStorage.getItem(key);

  return result;
}

export function setLocalStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}
