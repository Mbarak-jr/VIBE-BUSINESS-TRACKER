import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import useStore from "../../store";

const Sidebar = () => {
  const { user, setUser } = useStore();
  
  // Initialize auth listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Check current session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkSession();

    return () => subscription?.unsubscribe();
  }, [setUser]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Transactions', path: '/transactions', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Inventory', path: '/inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { name: 'Insights', path: '/insights', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Voice Input', path: '/voice', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' }
  ];

  // Function to get user initials for fallback avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-lg">
        {/* Clickable Logo/Branding Section */}
        <NavLink 
          to="/"
          className={({ isActive }) => `
            flex items-center justify-center h-16 px-4 border-b border-gray-200 
            transition-colors duration-200
            ${isActive ? 'bg-purple-50' : 'hover:bg-gray-50'}
          `}
        >
          <div className="flex items-center">
            <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116.078.223.147.32.207a1 1 0 01-.616 1.837c-.2-.134-.464-.273-.796-.416-.562-.245-1.062-.603-1.47-1.108-.356-.452-.635-.995-.824-1.66-.166-.583-.208-1.21-.208-1.822a1 1 0 01.707-.707l.04-.01a1 1 0 01.612-.347zM14 11a5 5 0 10-10 0 5 5 0 0010 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-800">BizTrack</span>
          </div>
        </NavLink>

        {/* Navigation Items */}
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-100 text-purple-700 shadow-inner'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <svg
                      className={`mr-3 h-5 w-5 flex-shrink-0 transition-all duration-200 ${
                        isActive 
                          ? 'text-purple-600 transform scale-110' 
                          : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2.5 : 2} d={item.icon} />
                    </svg>
                    <span className="transition-all duration-200">
                      {item.name}
                    </span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Dynamic User Profile Section */}
        <div className="p-4 border-t border-gray-200">
          {user ? (
            <div className="flex items-center">
              <div className="relative">
                {user.user_metadata?.avatar_url ? (
                  <img 
                    className="w-10 h-10 rounded-full object-cover" 
                    src={user.user_metadata.avatar_url} 
                    alt="User profile" 
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-medium">
                      {getInitials(user.user_metadata?.full_name || user.email)}
                    </span>
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {user.user_metadata?.full_name || user.email.split('@')[0]}
                </p>
                <p className="text-xs font-medium text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Guest</p>
                <p className="text-xs font-medium text-gray-500">Not logged in</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;