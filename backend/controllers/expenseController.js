import pool from '../config/database.js'

export const getExpenses = async (req, res) => {
  try {
    const [expenses] = await pool.query('SELECT * FROM expenses LIMIT 10')
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
    
    const [result] = await pool.query(
      'INSERT INTO expenses (user_id, category_id, description, amount, date, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, category_id, description, amount, date, payment_method, notes]
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
