const db = require("../config/db");

class User {
  static async findByClerkId(clerkId) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE clerk_id = ?",
      [clerkId]
    );

    return rows[0];
  }

  static async create({ clerk_id, email, name }) {
    const [result] = await db.query(
      `
      INSERT INTO users
      (clerk_id, email, full_name)
      VALUES (?, ?, ?)
      `,
      [clerk_id, email, name]
    );

    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    return rows[0];
  }
}

module.exports = User;