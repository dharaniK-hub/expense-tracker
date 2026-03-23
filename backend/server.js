import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Expense Tracker API',
    status: 'running',
    version: '1.0.0'
  })
})

// Placeholder routes
app.get('/expenses', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'No expenses data yet'
  })
})

app.post('/expenses', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Expense created successfully'
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
