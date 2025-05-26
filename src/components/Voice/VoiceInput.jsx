import { useState } from 'react'

const VoiceInput = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false)

  const handleListen = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition')
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onresult = (event) => {
      onTranscript(event.results[0][0].transcript)
    }
    recognition.onerror = (event) => {
      onTranscript('')
      alert('Voice recognition error: ' + event.error)
    }

    recognition.start()
  }

  return (
    <button
      onClick={handleListen}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
        isListening ? 'bg-red-500' : 'bg-purple-600'
      } text-white`}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
      <span>{isListening ? 'Listening...' : 'Start Voice Input'}</span>
    </button>
  )
}

export default VoiceInput