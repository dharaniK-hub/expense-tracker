import pool from '../config/database.js'

export const getExpenses = async (req, res) => {
  try {
    const [expenses] = await pool.query('SELECT * FROM expenses ORDER BY date DESC, id DESC LIMIT 100')
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
    const { category_id, description, amount, date, payment_method, notes } = req.body
    const numericAmount = Number(amount)
    const numericCategoryId = Number(category_id)

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ success: false, error: 'Please provide a valid positive amount.' })
    }
    if (!description?.trim() || !date || !Number.isInteger(numericCategoryId)) {
      return res.status(400).json({ success: false, error: 'Description, date, and category are required.' })
    }
    
    const [result] = await pool.query(
      'INSERT INTO expenses (category_id, description, amount, date) VALUES (?, ?, ?, ?)',
      [numericCategoryId, description.trim(), numericAmount, date]
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
