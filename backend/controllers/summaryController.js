import pool from '../config/database.js'

export const getSummary = async (req, res) => {
  try {
    // Note: Assuming there's an income table or field for income, but based on schema, 
    // it's mainly expenses. Member 2 responsibilities mention "total income".
    // For now, I'll calculate total expenses and leave income as 0 unless I add an income table.
    // Based on database_schema.sql, only categories and expenses tables exist.
    
    const [expenseResult] = await pool.query('SELECT SUM(amount) as totalExpenses FROM expenses')
    const totalExpenses = parseFloat(expenseResult[0].totalExpenses) || 0
    
    // For this example, let's assume a fixed budget or income if not implemented elsewhere
    const totalIncome = 5000 // Placeholder or could be added to schema later
    const balance = totalIncome - totalExpenses

    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        balance
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching summary',
      error: error.message
    })
  }
}

export const getMonthlyExpenses = async (req, res) => {
  try {
    const [monthlyData] = await pool.query(`
      SELECT 
        DATE_FORMAT(date, '%M') as month,
        SUM(amount) as amount
      FROM expenses
      WHERE date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(date, '%M'), MONTH(date)
      ORDER BY YEAR(date), MONTH(date)
    `)

    res.json({
      success: true,
      data: monthlyData
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly expenses',
      error: error.message
    })
  }
}

export const getCategorySpending = async (req, res) => {
  try {
    const [categoryData] = await pool.query(`
      SELECT 
        c.name as category,
        SUM(e.amount) as amount,
        c.color
      FROM expenses e
      JOIN categories c ON e.category_id = c.id
      GROUP BY c.name, c.color
    `)

    res.json({
      success: true,
      data: categoryData
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching category spending',
      error: error.message
    })
  }
}
