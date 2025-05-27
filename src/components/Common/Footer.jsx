const Footer = () => {
    return (
      <footer className="bg-white border-t border-gray-200 h-[72px] flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center h-full">
            {/* Left side - Copyright */}
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Vibe Retail Tracker
            </div>
  
            {/* Middle - Built with love (centered on mobile) */}
            <div className="text-sm text-gray-500 flex items-center my-2 md:my-0">
              Built with <span className="text-red-500 mx-1">❤️</span> for #1MillionDevs
            </div>
  
            {/* Right side - Minimal links */}
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors duration-200">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer