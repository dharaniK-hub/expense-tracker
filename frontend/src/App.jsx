import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/expenses')
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error('Error fetching expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">💰 Expense Tracker</h1>
            <p className="text-gray-600">Track and manage your expenses efficiently</p>
          </div>
        </div>

        {loading ? (
          <div className="mt-6 text-center text-gray-500">Loading expenses...</div>
        ) : (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Expenses</h2>
            {expenses.length === 0 ? (
              <p className="text-gray-500">No expenses found. Start adding expenses!</p>
            ) : (
              <div className="space-y-4">
                {/* Expense items will be rendered here */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
