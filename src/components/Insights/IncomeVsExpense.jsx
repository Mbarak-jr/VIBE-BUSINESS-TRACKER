import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

const IncomeVsExpense = ({ transactions }) => {
  // Group by month
  const monthlyData = transactions.reduce((acc, t) => {
    const date = new Date(t.date)
    const monthYear = `${date.getFullYear()}-${date.getMonth()}`
    
    if (!acc[monthYear]) {
      acc[monthYear] = { income: 0, expense: 0 }
    }
    
    if (t.type === 'income') {
      acc[monthYear].income += parseFloat(t.amount) || 0
    } else {
      acc[monthYear].expense += parseFloat(t.amount) || 0
    }
    
    return acc
  }, {})

  const labels = Object.keys(monthlyData).sort()
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: labels.map(label => monthlyData[label].income),
        borderColor: '#10b981',
        tension: 0.1
      },
      {
        label: 'Expense',
        data: labels.map(label => monthlyData[label].expense),
        borderColor: '#ef4444',
        tension: 0.1
      }
    ]
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium mb-4">Income vs Expense Over Time</h3>
      <div className="h-64">
        <Line 
          data={data} 
          options={{ 
            responsive: true,
            maintainAspectRatio: false
          }} 
        />
      </div>
    </div>
  )
}

export default IncomeVsExpense