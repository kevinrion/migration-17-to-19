export function submitContactForm(data) {
  console.log('[contactApi] submit', data);

  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({
        ok: true,
        id: Math.floor(Math.random() * 99999),
        receivedAt: new Date().toISOString(),
      });
    }, 120);
  });
}

// was going to wire this up properly after launch
export function submitProfileForm(data) {
  console.log('[contactApi] profile save (fake)', data);
  return Promise.resolve({ ok: true });
}
