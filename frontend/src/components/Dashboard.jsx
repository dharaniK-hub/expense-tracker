import React, { useState, useEffect } from 'react'
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import SummaryCard from './SummaryCard'
import SpendingCharts from './SpendingCharts'
import axios from 'axios'

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0 })
  const [monthlyData, setMonthlyData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [summaryRes, monthlyRes, categoryRes] = await Promise.all([
        axios.get('http://localhost:5000/api/summary'),
        axios.get('http://localhost:5000/api/summary/monthly'),
        axios.get('http://localhost:5000/api/summary/categories')
      ])

      setSummary(summaryRes.data.data)
      setMonthlyData(monthlyRes.data.data)
      setCategoryData(categoryRes.data.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500">Track your finances and spending habits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard 
          title="Total Income" 
          amount={summary.totalIncome} 
          icon={TrendingUp} 
          color="bg-green-500"
          trend={+5.2}
        />
        <SummaryCard 
          title="Total Expenses" 
          amount={summary.totalExpenses} 
          icon={TrendingDown} 
          color="bg-red-500"
          trend={-2.4}
        />
        <SummaryCard 
          title="Current Balance" 
          amount={summary.balance} 
          icon={Wallet} 
          color="bg-blue-500"
        />
      </div>

      <SpendingCharts 
        monthlyData={monthlyData} 
        categoryData={categoryData} 
      />
    </div>
  )
}

export default Dashboard
