import { useState, useEffect } from 'react'
import { fetchTransactions } from '../services/transactionService'
import SpendingTrends from '../components/Insights/SpendingTrends'
import IncomeVsExpense from '../components/Insights/IncomeVsExpense'
import useStore from '../store'

const Insights = () => {
  const user = useStore(state => state.user)
  const [timeRange, setTimeRange] = useState('month')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    
    const loadData = async () => {
      setLoading(true)
      const { data } = await fetchTransactions(user.id, timeRange)
      useStore.setState({ transactions: data || [] })
      setLoading(false)
    }
    
    loadData()
  }, [user?.id, timeRange])

  const transactions = useStore(state => state.transactions)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Business Insights</h2>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last 12 Months</option>
        </select>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <IncomeVsExpense transactions={transactions} />
          <SpendingTrends transactions={transactions} />
        </div>
      )}
    </div>
  )
}

export default Insights