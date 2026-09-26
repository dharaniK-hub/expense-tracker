import React from 'react'

const SummaryCard = ({ title, amount, icon: Icon, color, trend }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-100">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-baseline space-x-2">
          <h3 className="text-2xl font-bold text-gray-900">${amount.toLocaleString()}</h3>
          {trend && (
            <span className={`text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
