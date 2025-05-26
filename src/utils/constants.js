export const TRANSACTION_CATEGORIES = {
  INCOME: ['Sales', 'Other Income'],
  EXPENSE: ['Supplier Payment', 'Rent', 'Utilities', 'Salaries', 'Other Expense'],
  ALL: ['Sales', 'Supplier Payment', 'Rent', 'Utilities', 'Salaries', 'Other Income', 'Other Expense']
}

export const TIME_RANGES = [
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'year', label: 'Last 12 Months' },
  { value: 'all', label: 'All Time' }
]

export const DEFAULT_TRANSACTION = {
  amount: '',
  type: 'expense',
  category: '',
  description: ''
}

export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense'
}