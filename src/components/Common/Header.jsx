import { useNavigate } from 'react-router-dom'
import { signOut } from '../../services/authService'
import { Bars3Icon, BellIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

const Header = ({ onMenuToggle }) => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/') // Changed from '/login' to '/'
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center z-10">
      <div className="flex items-center justify-between w-full px-4 sm:px-6">
        {/* Left section - Menu toggle and title */}
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden mr-4 p-1 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            onClick={onMenuToggle}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex items-center">
            <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116.078.223.147.32.207a1 1 0 01-.616 1.837c-.2-.134-.464-.273-.796-.416-.562-.245-1.062-.603-1.47-1.108-.356-.452-.635-.995-.824-1.66-.166-.583-.208-1.21-.208-1.822a1 1 0 01.707-.707l.04-.01a1 1 0 01.612-.347zM14 11a5 5 0 10-10 0 5 5 0 0010 0z" clipRule="evenodd" />
            </svg>
            <h1 className="ml-2 text-xl font-bold text-gray-800">BizTrack</h1>
          </div>
        </div>

        {/* Right section - Controls */}
        <div className="flex items-center space-x-4">
          {/* Help button */}
          <button 
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            title="Help"
          >
            <QuestionMarkCircleIcon className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button 
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors duration-200 relative"
            title="Notifications"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {/* Sign Out - Updated to be more prominent */}
          <button 
            onClick={handleSignOut}
            className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-200 flex items-center"
            title="Sign Out"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header