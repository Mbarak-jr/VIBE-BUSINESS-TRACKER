import { useState, useEffect } from 'react'
import { fetchTransactions, addTransaction } from '../services/transactionService'
import TransactionList from '../components/Transactions/TransactionList'
import AddTransaction from '../components/Transactions/AddTransaction'
import VoiceInput from '../components/Voice/VoiceInput'
import TranscriptionBox from '../components/Voice/TranscriptionBox' // Add this import
import { formatCurrency } from '../utils/helpers'
import useStore from '../store'

const Transactions = () => {
  const user = useStore(state => state.user)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('week')
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [voiceError, setVoiceError] = useState(null)

  useEffect(() => {
    if (!user?.id) return
    
    const loadTransactions = async () => {
      setLoading(true)
      try {
        const { data, error } = await fetchTransactions(user.id, timeRange)
        if (error) throw error
        setTransactions(data || [])
      } catch (err) {
        console.error('Error loading transactions:', err)
      } finally {
        setLoading(false)
      }
    }
    
    loadTransactions()
  }, [user?.id, timeRange])

  const handleAddTransaction = async (transaction) => {
    try {
      const { error } = await addTransaction({
        ...transaction,
        user_id: user.id,
        date: new Date().toISOString()
      })
      
      if (error) throw error
      
      // Refresh transactions
      const { data } = await fetchTransactions(user.id, timeRange)
      setTransactions(data || [])
      new Audio('/success.mp3').play()
    } catch (err) {
      console.error('Error adding transaction:', err)
    }
  }

  const processVoiceCommand = (transcript) => {
    setVoiceTranscript(transcript)
    setVoiceError(null)
    
    try {
      // Simple NLP - extract amount and type
      const amountMatch = transcript.match(/\d+(\.\d{1,2})?/)
      const amount = amountMatch ? parseFloat(amountMatch[0]) : 0
      
      if (amount <= 0) {
        throw new Error('Please specify a valid amount in your voice command')
      }

      const type = transcript.toLowerCase().includes('income') ? 'income' : 'expense'
      
      handleAddTransaction({
        amount,
        type,
        description: transcript,
        category: type === 'income' ? 'Sales' : 'Other Expense'
      })
    } catch (err) {
      setVoiceError(err.message)
    }
  }

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700">Total Income</h3>
          <p className="text-2xl font-bold text-green-500">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-500">{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700">Net Balance</h3>
          <p className={`text-2xl font-bold ${
            totalIncome - totalExpenses >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {formatCurrency(totalIncome - totalExpenses)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4 text-gray-900">Add New Transaction</h3>
        <VoiceInput onTranscript={processVoiceCommand} />
        <TranscriptionBox transcript={voiceTranscript} />
        {voiceError && (
          <div className="mt-2 text-sm text-red-600">{voiceError}</div>
        )}
        <AddTransaction onSubmit={handleAddTransaction} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4 text-gray-900">Recent Transactions</h3>
        <TransactionList transactions={transactions} loading={loading} />
      </div>
    </div>
  )
}

export default Transactions