const TranscriptionBox = ({ transcript }) => {
    return (
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-700">Voice Input:</p>
        <p className="mt-1 text-gray-900">{transcript || 'No transcription yet...'}</p>
      </div>
    )
  }
  
  export default TranscriptionBox