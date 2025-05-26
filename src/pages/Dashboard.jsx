import { useState, useEffect } from 'react'
import { fetchTransactions } from '../services/transactionService'
import DashboardCard from '../components/Dashboard/DashboardCard'
import SummaryChart from '../components/Dashboard/SummaryChart'
import { calculateProfit, formatCurrency } from '../utils/helpers'
import Loader from '../components/Common/Loader'
import useStore from '../store'

const Dashboard = () => {
  const user = useStore(state => state.user)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('week')

  useEffect(() => {
    if (!user?.id) return

    const loadData = async () => {
      setLoading(true)
      try {
        const { data } = await fetchTransactions(user.id, timeRange)
        setTransactions(data || [])
      } catch (error) {
        console.error('Error fetching transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user?.id, timeRange])

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading user info...</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    )
  }

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)

  const profit = calculateProfit(transactions)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Business Dashboard</h2>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last 12 Months</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Total Profit" 
          value={formatCurrency(profit)} 
          trend={profit >= 0 ? '📈 Positive' : '📉 Negative'}
          color={profit >= 0 ? 'text-green-500' : 'text-red-500'}
        />
        <DashboardCard 
          title="Total Income" 
          value={formatCurrency(totalIncome)} 
          trend="💰 Revenue"
          color="text-green-500"
        />
        <DashboardCard 
          title="Total Expenses" 
          value={formatCurrency(totalExpenses)} 
          trend="💸 Costs"
          color="text-red-500"
        />
      </div>

      {transactions.length > 0 ? (
        <SummaryChart transactions={transactions} />
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500">No transaction data available</p>
          <p className="text-sm text-gray-400 mt-1">Add some transactions to see your financial overview</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
