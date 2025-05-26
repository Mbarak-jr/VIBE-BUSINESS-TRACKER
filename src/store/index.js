import { create } from 'zustand'

const useStore = create((set) => ({
  // Auth state
  user: null,
  setUser: (user) => set({ user }),
  
  // Data state
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  
  inventory: [],
  setInventory: (inventory) => set({ inventory }),
  
  // UI state
  loading: false,
  setLoading: (loading) => set({ loading }),
  
  error: null,
  setError: (error) => set({ error }),
  
  success: null,
  setSuccess: (success) => set({ success })
}))

export default useStore