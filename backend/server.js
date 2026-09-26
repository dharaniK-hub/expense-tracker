import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import expenseRoutes from './routes/expenseRoutes.js'
import summaryRoutes from './routes/summaryRoutes.js'

dotenv.config()

const app = express()
const DEFAULT_PORT = Number(process.env.PORT) || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/expenses', expenseRoutes)
app.use('/api/summary', summaryRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Expense Tracker API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  })
})

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1
      console.warn(`Port ${port} is in use. Retrying on port ${nextPort}...`)
      startServer(nextPort)
      return
    }

    console.error('Failed to start server:', error)
    process.exit(1)
  })
}

startServer(DEFAULT_PORT)
