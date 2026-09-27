// Expense model and database operations
export const getExpenses = async (pool) => {
  const [rows] = await pool.query(
    'SELECT * FROM expenses ORDER BY date DESC'
  )
  return rows
}

export const addExpense = async (pool, expense) => {
  const { category_id, description, amount, date } = expense
  const [result] = await pool.query(
    'INSERT INTO expenses (category_id, description, amount, date) VALUES (?, ?, ?, ?)',
    [category_id, description, amount, date]
  )
  return result
}
