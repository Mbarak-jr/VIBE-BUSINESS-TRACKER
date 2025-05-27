import { useEffect } from 'react';
import { FiMic, FiDollarSign, FiPieChart, FiSmartphone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useStore from '../../store';

const FeaturesSection = () => {
  const { 
    setLoading,
    setVisibleSection
  } = useStore();

  const features = [
    {
      icon: <FiMic className="w-10 h-10 text-indigo-600" />,
      title: "Voice Input",
      description: "Just speak to record transactions - no typing needed.",
      path: "/voice"
    },
    {
      icon: <FiDollarSign className="w-10 h-10 text-indigo-600" />,
      title: "Expense Tracking",
      description: "Automatically categorize and track all your business expenses."
    },
    {
      icon: <FiPieChart className="w-10 h-10 text-indigo-600" />,
      title: "Profit Analysis",
      description: "See your profits in real-time with beautiful charts.",
      path: "/insights"
    },
    {
      icon: <FiSmartphone className="w-10 h-10 text-indigo-600" />,
      title: "Mobile Friendly",
      description: "Works perfectly on your phone or tablet."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleSection('features');
          setLoading(false);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [setLoading, setVisibleSection]);

  return (
    <section id="features" className="relative py-20 px-4 bg-white overflow-hidden">
      {/* Decorative elements matching hero section */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex mb-4">
            <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simplify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Business Tracking</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Designed for retailers who want to focus on their business, not paperwork. Our tools make financial management effortless.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            feature.path ? (
              <Link
                to={feature.path}
                key={index}
                className="group p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-gray-50 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-2"
                onClick={() => setLoading(true)}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
                {feature.path && (
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center text-indigo-600 text-sm font-medium">
                      Learn more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                )}
              </Link>
            ) : (
              <div 
                key={index} 
                className="p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-gray-50 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-2"
                onMouseEnter={() => setLoading(false)}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3 text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            )
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/signup" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            <span>Get Started Today</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;