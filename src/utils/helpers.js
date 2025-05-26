// Format currency with USD symbol
export const formatCurrency = (amount) => {
  if (isNaN(amount)) amount = 0
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

// Calculate profit from transactions array
export const calculateProfit = (transactions = []) => {
  const income = transactions
    .filter(t => t?.type === 'income')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)
  
  const expenses = transactions
    .filter(t => t?.type === 'expense')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)
  
  return income - expenses
}

// Parse voice command into transaction object
export const parseVoiceCommand = (text = '') => {
  const amountMatch = text.match(/\d+(\.\d{1,2})?/)
  const amount = amountMatch ? parseFloat(amountMatch[0]) : 0
  
  const type = text.toLowerCase().includes('income') ? 'income' : 'expense'
  
  let category = 'Other'
  const lowerText = text.toLowerCase()
  if (lowerText.includes('rent')) category = 'Rent'
  else if (lowerText.includes('supply') || lowerText.includes('inventory')) category = 'Supplies'
  else if (lowerText.includes('sale')) category = 'Sales'
  else if (lowerText.includes('salary') || lowerText.includes('payroll')) category = 'Salaries'
  else if (lowerText.includes('utility') || lowerText.includes('electric') || lowerText.includes('water')) category = 'Utilities'
  
  return {
    amount,
    type,
    category,
    description: text.trim()
  }
}

// Additional helper function for calculating totals
export const calculateTotals = (transactions = []) => {
  const income = transactions
    .filter(t => t?.type === 'income')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)
  
  const expenses = transactions
    .filter(t => t?.type === 'expense')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)
  
  return {
    income,
    expenses,
    profit: income - expenses
  }
}