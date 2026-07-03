const API_BASE_URL = "http://localhost:5000";

// =======================
// USER
// =======================

export const syncUser = async (userData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/sync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return response.json();
};

// =======================
// TRADES
// =======================

export const createTrade = async (tradeData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/trades`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tradeData),
    }
  );

  return response.json();
};

export const getUserTrades = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/trades/${userId}`
  );

  return response.json();
};