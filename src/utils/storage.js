export function parseStoredJson(raw) {
  if (!raw) return null;
  return JSON.parse(raw);
}
