import { useState } from 'react'
import { TRANSACTION_CATEGORIES } from '../../utils/constants'

const AddTransaction = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    description: ''
  })

  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    // Validate inputs
    if (!formData.amount || isNaN(formData.amount)) {
      setError('Please enter a valid amount')
      return
    }

    if (formData.amount <= 0) {
      setError('Amount must be greater than 0')
      return
    }

    if (!formData.description.trim()) {
      setError('Please enter a description')
      return
    }

    const transaction = {
      amount: parseFloat(formData.amount),
      type: formData.type,
      category:
        formData.category ||
        (formData.type === 'income' ? 'Sales' : 'Other Expense'),
      description: formData.description.trim()
    }

    onSubmit(transaction)

    setFormData({
      amount: '',
      type: 'expense',
      category: '',
      description: ''
    })
  }

  const filteredCategories = formData.type === 'income'
    ? TRANSACTION_CATEGORIES.INCOME
    : TRANSACTION_CATEGORIES.EXPENSE

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm font-medium">$</span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full pl-8 pr-4 py-3 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-400"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full px-3 py-3 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="expense">💸 Expense</option>
              <option value="income">💰 Income</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full px-3 py-3 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select a category (optional)</option>
            {filteredCategories && filteredCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full px-3 py-3 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
            placeholder="What was this transaction for?"
            required
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="w-full md:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          >
            ✅ Add Transaction
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTransaction