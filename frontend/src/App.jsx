import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar / Navigation */}
      <div className="flex">
        <div className="w-64 bg-indigo-900 min-h-screen text-white p-6 hidden md:block">
          <h1 className="text-2xl font-bold mb-10 flex items-center gap-2">
            <span className="text-3xl">💰</span> Expensy
          </h1>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
            >
              📊 Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('expenses')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'expenses' ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
            >
              💸 Expenses
            </button>
            <button 
              className="w-full text-left px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-800 transition-colors"
            >
              📂 Categories
            </button>
            <button 
              className="w-full text-left px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-800 transition-colors"
            >
              ⚙️ Settings
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center px-8">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Welcome, User</span>
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                U
              </div>
            </div>
          </header>

          <main className="p-8">
            {activeTab === 'dashboard' ? (
              <Dashboard />
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Expense Management</h2>
                <p className="text-gray-500 italic">Work in progress (Member 1)</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
