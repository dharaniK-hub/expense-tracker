// Expense model and database operations
export const getExpenses = async (pool, userId) => {
  const [rows] = await pool.query(
    'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC',
    [userId]
  )
  return rows
}

export const addExpense = async (pool, expense) => {
  const { user_id, category_id, description, amount, date, payment_method, notes } = expense
  const [result] = await pool.query(
    'INSERT INTO expenses (user_id, category_id, description, amount, date, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [user_id, category_id, description, amount, date, payment_method, notes]
  )
  return result
}
