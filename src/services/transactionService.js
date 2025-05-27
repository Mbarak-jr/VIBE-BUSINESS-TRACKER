import { supabase } from './supabaseClient'

export const fetchTransactions = async (userId, timeRange = 'week') => {
  let fromDate = new Date()
  if (timeRange === 'week') fromDate.setDate(fromDate.getDate() - 7)
  else if (timeRange === 'month') fromDate.setMonth(fromDate.getMonth() - 1)
  else if (timeRange === 'year') fromDate.setFullYear(fromDate.getFullYear() - 1)
  
  let query = supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
  
  if (timeRange !== 'all') {
    query = query.gte('date', fromDate.toISOString())
  }
  
  const { data, error } = await query
  return { data, error }
}

export const addTransaction = async (transaction) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
  return { data, error }
}