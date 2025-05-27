import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement)

const SpendingTrends = ({ transactions }) => {
  const categories = [...new Set(transactions.map(t => t.category).filter(Boolean))];

  const data = {
    labels: categories,
    datasets: [{
      label: 'Spending by Category',
      data: categories.map(cat => 
        transactions
          .filter(t => t.category === cat && t.type === 'expense')
          .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)
      ),
      backgroundColor: '#8b5cf6'
    }]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium mb-4">Spending Trends</h3>
      <div className="h-64">
        <Bar 
          data={data} 
          options={{ 
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } }
          }} 
        />
      </div>
    </div>
  );
};

export default SpendingTrends;
