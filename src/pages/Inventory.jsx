import { useState, useEffect } from 'react'
import { 
  fetchInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} from '../services/inventoryService'
import InventoryList from '../components/Inventory/InventoryList'
import AddItemModal from '../components/Inventory/AddItemModal'
import { formatCurrency } from '../utils/helpers'
import useStore from '../store'

const Inventory = () => {
  const user = useStore(state => state.user)
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (!user?.id) return
    
    const loadInventory = async () => {
      setLoading(true)
      try {
        const { data, error } = await fetchInventory(user.id)
        if (error) throw error
        setInventory(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    loadInventory()
  }, [user?.id])

  const handleAddItem = async (item) => {
    try {
      const { error } = await addInventoryItem({
        ...item,
        user_id: user.id,
        last_updated: new Date().toISOString()
      })
      if (error) throw error
      
      // Refresh inventory
      const { data } = await fetchInventory(user.id)
      setInventory(data || [])
      setSuccess('Item added successfully!')
      setIsModalOpen(false)
      new Audio('/success.mp3').play()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleUpdateItem = async (id, updates) => {
    try {
      const { error } = await updateInventoryItem(id, {
        ...updates,
        last_updated: new Date().toISOString()
      })
      if (error) throw error
      
      // Refresh inventory
      const { data } = await fetchInventory(user.id)
      setInventory(data || [])
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    
    try {
      const { error } = await deleteInventoryItem(id)
      if (error) throw error
      
      // Refresh inventory
      const { data } = await fetchInventory(user.id)
      setInventory(data || [])
      setSuccess('Item deleted successfully!')
    } catch (err) {
      setError(err.message)
    }
  }

  const calculateTotalValue = () => {
    return inventory.reduce((sum, item) => {
      const value = (item.quantity || 0) * (item.price || 0)
      return sum + (isNaN(value) ? 0 : value)
    }, 0)
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
          <p>{success}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
        <button
          onClick={() => {
            setEditingItem(null)
            setIsModalOpen(true)
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          Add New Item
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Inventory Summary</h3>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            Total Value: {formatCurrency(calculateTotalValue())}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <InventoryList 
          inventory={inventory}
          loading={loading}
          onEdit={(item) => {
            setEditingItem(item)
            setIsModalOpen(true)
          }}
          onUpdateQuantity={handleUpdateItem}
          onDelete={handleDeleteItem}
        />
      </div>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingItem ? handleUpdateItem : handleAddItem}
        initialData={editingItem}
      />
    </div>
  )
}

export default Inventory