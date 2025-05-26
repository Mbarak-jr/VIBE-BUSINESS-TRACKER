import { supabase } from './supabaseClient'

export const fetchInventory = async (userId) => {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .eq('user_id', userId)
    .order('last_updated', { ascending: false })
  return { data, error }
}

export const addInventoryItem = async (item) => {
  const { data, error } = await supabase
    .from('inventory')
    .insert(item)
  return { data, error }
}

export const updateInventoryItem = async (id, updates) => {
  const { data, error } = await supabase
    .from('inventory')
    .update(updates)
    .eq('id', id)
  return { data, error }
}

export const deleteInventoryItem = async (id) => {
  const { error } = await supabase
    .from('inventory')
    .delete()
    .eq('id', id)
  return { error }
}