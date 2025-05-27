import { useState, useEffect } from 'react'
import { supabase } from './services/supabaseClient'
import AppRouter from './routes/AppRouter'
import Confetti from 'react-confetti'
import { useWindowSize } from './hooks/useWindowSize'
import useStore from './store'

function App() {
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const setUser = useStore(state => state.setUser)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }

    getSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)

      if (_event === 'SIGNED_IN') {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [setUser])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      <AppRouter />
    </div>
  )
}

export default App