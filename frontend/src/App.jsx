import { useState, useEffect } from 'react'

const API_URL = 'http://127.0.0.1:5000'
const categories = {
  1: { name: 'Food & Dining', icon: '🍔', style: 'bg-orange-50 border-orange-100' },
  2: { name: 'Transportation', icon: '🚗', style: 'bg-red-50 border-red-100' },
  3: { name: 'Entertainment', icon: '🎬', style: 'bg-purple-50 border-purple-100' },
  4: { name: 'Rent & Bills', icon: '🏠', style: 'bg-blue-50 border-blue-100' },
  5: { name: 'Other', icon: '📦', style: 'bg-gray-50 border-gray-100' }
}

const formatExpenseDate = (value) => {
  const datePart = String(value).slice(0, 10)
  const [year, month, day] = datePart.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function App() {
  const [expense, setExpense] = useState({
    amount: '',
    description: '',
    date: '',
    category_id: '1'
  })
  const [message, setMessage] = useState('')
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch expenses when the component loads
  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/expenses`)
      if (response.ok) {
        const data = await response.json()
        setExpenses(data)
      } else {
        setMessage('❌ Failed to load expenses.')
      }
    } catch (error) {
      console.error('Error fetching expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('Sending to cloud...')

    try {
      const response = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense) 
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('✅ ' + data.message)
        setExpense({ amount: '', description: '', date: '', category_id: '1' })
        fetchExpenses()
      } else {
        setMessage('❌ Error: ' + data.error)
      }
    } catch (error) {
      console.error(error)
      setMessage('❌ Failed to connect to backend.')
    }
  }

  return (
    // Main Background Gradient
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 font-sans text-gray-800 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-indigo-100/50 border border-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-yellow-100 to-yellow-50 p-3 rounded-xl shadow-sm text-2xl">
              💰
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Expense Tracker</h1>
              <p className="text-sm text-gray-500 font-medium">Track and manage your expenses efficiently</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-right shadow-inner">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1 flex items-center justify-end gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Total Spent
            </p>
            <p className="text-xl font-bold text-gray-800">
              ${expenses.reduce((total, item) => total + Number(item.amount), 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-indigo-100/50 border border-white p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Add New Expense</h2>
            <button 
              onClick={() => setExpense({ amount: '', description: '', date: '', category_id: '1' })}
              className="text-sm font-semibold text-indigo-500 hover:text-indigo-700 transition-colors bg-indigo-50 px-3 py-1 rounded-lg"
            >
              Reset Form
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                <input 
                  type="number" name="amount" value={expense.amount} onChange={handleChange} 
                  placeholder="1000" required 
                  className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Expense Description</label>
              <input 
                type="text" name="description" value={expense.description} onChange={handleChange} 
                placeholder="e.g. Groceries" required 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Date</label>
                <input 
                  type="date" name="date" value={expense.date} onChange={handleChange} required 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Category</label>
                <select 
                  name="category_id" value={expense.category_id} onChange={handleChange} 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm appearance-none"
                >
                  <option value="1">🍔 Food & Dining</option>
                  <option value="2">🚗 Transportation</option>
                  <option value="3">🎬 Entertainment</option>
                  <option value="4">🏠 Rent/Bills</option>
                  <option value="5">📦 Other</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-4 py-4 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-4">
              <span className="text-xl leading-none">+</span> Add Expense
            </button>
          </form>
          
          {message && <p className="mt-4 font-medium text-center text-gray-700 animate-pulse">{message}</p>}

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-amber-700 font-medium">
              <span className="text-lg">ⓘ</span> Offline mode: Changes will save locally to your browser.
            </div>
            <button onClick={fetchExpenses} className="text-amber-600 font-bold hover:underline">Reconnect</button>
          </div>
        </div>

        {/* Recent Expenses List */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-indigo-100/50 border border-white p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">Recent Expenses</h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">{expenses.length} items</span>
            </div>
          </div>

          <div className="space-y-4">
            {expenses.length === 0 ? (
              <p className="text-gray-500">No expenses found. Start adding expenses!</p>
            ) : expenses.map((item, index) => {
              const category = categories[item.category_id] || categories[5]
              return (
                <div key={item.id}>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`${category.style} p-3 rounded-xl shadow-sm text-xl border`}>{category.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{item.description}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>{formatExpenseDate(item.date)}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">{category.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">-${Number(item.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  </div>
                  {index < expenses.length - 1 && <div className="w-full h-px bg-gray-100" />}
                </div>
              )
            })}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 font-medium pb-8">Expense Tracker App • Designed for quick, personal budgeting</p>
      </div>
    </div>
  )
}

export default App