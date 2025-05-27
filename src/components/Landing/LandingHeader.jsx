import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const LandingHeader = () => {
  // Smooth scroll to section when nav links are clicked
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Update active nav link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'how-it-works', 'testimonials'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            document.querySelectorAll('nav a').forEach(link => {
              link.classList.remove('text-indigo-600', 'font-medium');
              link.classList.add('text-gray-700');
            });
            const activeLink = document.querySelector(`nav a[href="#${section}"]`);
            if (activeLink) {
              activeLink.classList.add('text-indigo-600', 'font-medium');
              activeLink.classList.remove('text-gray-700');
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Vibe Business Tracker
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="#features" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Features
            </Link>
            <Link 
              to="#how-it-works" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('how-it-works');
              }}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to="#testimonials" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('testimonials');
              }}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Testimonials
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;