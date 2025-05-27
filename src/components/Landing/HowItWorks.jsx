import { FiMic, FiUpload, FiBarChart2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import useStore from '../../store';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setLoading } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [setLoading]);

  const steps = [
    {
      icon: <FiMic className="w-8 h-8 text-indigo-600" />,
      title: "Speak Your Transactions",
      description: "Use simple voice commands to record sales and expenses.",
      emoji: "🎤"
    },
    {
      icon: <FiUpload className="w-8 h-8 text-indigo-600" />,
      title: "Automatic Categorization",
      description: "Our AI automatically categorizes your transactions.",
      emoji: "🤖"
    },
    {
      icon: <FiBarChart2 className="w-8 h-8 text-indigo-600" />,
      title: "Get Insights",
      description: "View clear reports showing your profits and trends.",
      emoji: "📊"
    }
  ];

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 w-80 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-gray-200 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="animate-pulse">
                  <div className="h-16 w-16 bg-gray-200 rounded-full mb-6 mx-auto"></div>
                  <div className="h-8 w-48 bg-gray-200 rounded-full mb-4 mx-auto"></div>
                  <div className="h-4 w-full bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded-full mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="how-it-works" className="relative py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex mb-4">
            <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to take control of your business finances.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-4 rounded-full mr-4">
                  {step.icon}
                </div>
                <span className="text-2xl">{step.emoji}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h3>
              <p className="text-gray-600 mb-6">{step.description}</p>
              {index === 0 && (
                <Link 
                  to="/voice" 
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                >
                  Try voice input
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/signup" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            <span>Start Your Free Trial</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;