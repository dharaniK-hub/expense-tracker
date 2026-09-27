import pool from '../config/database.js'

export const getExpenses = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    let query = 'SELECT * FROM expenses ORDER BY date DESC, id DESC LIMIT 100';
    let params = [];
    if (user_id) {
      query = 'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC, id DESC LIMIT 100';
      params = [Number(user_id)];
    }
    const [expenses] = await pool.query(query, params)
    res.json({
      success: true,
      data: expenses
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expenses',
      error: error.message
    })
  }
}

export const createExpense = async (req, res) => {
  try {
    const { user_id, category_id, description, amount, date, payment_method, notes } = req.body
    const numericAmount = Number(amount)
    const numericCategoryId = Number(category_id)

    if (!user_id) {
      return res.status(401).json({ success: false, error: 'User ID is required. Please sign in.' })
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ success: false, error: 'Please provide a valid positive amount.' })
    }
    if (!description?.trim() || !date || !Number.isInteger(numericCategoryId)) {
      return res.status(400).json({ success: false, error: 'Description, date, and category are required.' })
    }
    
    const [result] = await pool.query(
      'INSERT INTO expenses (user_id, category_id, description, amount, date) VALUES (?, ?, ?, ?, ?)',
      [user_id, numericCategoryId, description.trim(), numericAmount, date]
    )
    
    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating expense',
      error: error.message
    })
  }
}
