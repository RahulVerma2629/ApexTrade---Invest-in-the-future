const db = require("../config/db");

class Trade {
  static async create(tradeData) {
    const { user_id, symbol, quantity, price, trade_type } = tradeData;

    const [result] = await db.execute(
      `INSERT INTO trades
      (user_id, symbol, quantity, price, trade_type)
      VALUES (?, ?, ?, ?, ?)`,
      [user_id, symbol, quantity, price, trade_type]
    );

    return result;
  }

  static async getUserTrades(userId) {
    const [rows] = await db.execute(
      `SELECT *
       FROM trades
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    return rows;
  }
}

module.exports = Trade;