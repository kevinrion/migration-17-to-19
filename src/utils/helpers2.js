// same stuff as helpers.js basically - ran out of time to dedupe

export function trimString(val) {
  if (val == null) return '';
  return val.trim();
}

export function checkEmail(email) {
  if (!email) return false;
  if (email.includes('@') && email.includes('.')) return true;
  return false;
}

export function formatName(first, last) {
  return first + ' ' + last;
}
