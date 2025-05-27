import { useState } from 'react'
import VoiceInput from '../components/Voice/VoiceInput'
import TranscriptionBox from '../components/Voice/TranscriptionBox'
import { addTransaction } from '../services/transactionService'
import useStore from '../store'

const Voice = () => {
  const user = useStore(state => state.user)
  const [transcript, setTranscript] = useState('')
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleTranscript = (text) => {
    setTranscript(text)
    processVoiceCommand(text)
  }

  const processVoiceCommand = async (text) => {
    if (!user?.id) return
    
    setProcessing(true)
    setSuccess(null)
    
    try {
      // Simple NLP - extract amount and type
      const amountMatch = text.match(/\d+(\.\d{1,2})?/)
      const amount = amountMatch ? parseFloat(amountMatch[0]) : 0
      const type = text.toLowerCase().includes('income') ? 'income' : 'expense'
      
      const { error } = await addTransaction({
        user_id: user.id,
        amount,
        type,
        description: text,
        date: new Date().toISOString()
      })
      
      if (error) throw error
      
      setSuccess('Transaction added successfully!')
      new Audio('/success.mp3').play()
    } catch (err) {
      console.error('Error processing voice command:', err)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Voice Transactions</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="mb-4">Speak naturally to record transactions. Examples:</p>
        <ul className="list-disc pl-5 mb-6 space-y-1">
          <li>"Income of 500 dollars from sale"</li>
          <li>"Expense of 50 dollars for supplies"</li>
        </ul>
        
        <VoiceInput onTranscript={handleTranscript} />
        <TranscriptionBox transcript={transcript} />
        
        {processing && (
          <div className="mt-4 text-purple-600">Processing your voice command...</div>
        )}
        
        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
            {success}
          </div>
        )}
      </div>
    </div>
  )
}

export default Voice