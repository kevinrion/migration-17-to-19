export function getSessionSeed(n) {
  if (n <= 1) return n;
  return getSessionSeed(n - 1) + getSessionSeed(n - 2);
}
