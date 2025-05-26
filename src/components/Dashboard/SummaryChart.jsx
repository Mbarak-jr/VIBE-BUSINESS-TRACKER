import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const SummaryChart = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)

  const doughnutData = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      data: [income, expenses],
      backgroundColor: ['#10b981', '#ef4444'],
      borderWidth: 2,
      hoverOffset: 4
    }]
  }

  const categories = [...new Set(transactions.map(t => t.category).filter(Boolean))]
  
  const barData = {
    labels: categories,
    datasets: [{
      label: 'Amount by Category',
      data: categories.map(cat => 
        transactions
          .filter(t => t.category === cat)
          .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)
      ),
      backgroundColor: [
        '#6366f1', '#8b5cf6', '#ec4899', '#f97316', 
        '#10b981', '#ef4444', '#3b82f6', '#f59e0b'
      ]
    }]
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4">Income vs Expenses</h3>
        <div className="h-64">
          <Doughnut 
            data={doughnutData} 
            options={{ 
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom' } } 
            }} 
          />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
        <div className="h-64">
          <Bar 
            data={barData} 
            options={{ 
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } }
            }} 
          />
        </div>
      </div>
    </div>
  )
}

export default SummaryChart