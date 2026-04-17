const START_BALANCE = 100000;

export function getUserBalance(email) {
  const key = `balance_${email}`;
  const saved = localStorage.getItem(key);

  if (!saved) {
    localStorage.setItem(key, START_BALANCE);
    return START_BALANCE;
  }

  return Number(saved);
}

export function setUserBalance(email, amount) {
  const key = `balance_${email}`;
  localStorage.setItem(key, amount);
}
