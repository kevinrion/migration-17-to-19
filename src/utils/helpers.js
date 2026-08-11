// quick helpers - copied from old project, sorry

export function isValidEmail(email) {
  if (!email) return false;
  return email.indexOf('@') > -1;
}

export function isValidEmailStrict(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function trimStr(s) {
  if (s == null) return '';
  return s.trim();
}

export function saveToStorage(key, val) {
  try {
    localStorage.setItem(key, val);
  } catch (e) {
    // ignore
  }
}

export function loadFromStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    return null;
  }
}

// TODO: merge with helpers2
