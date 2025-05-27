import { useEffect, useState } from 'react';
import useStore from '../../store';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setLoading } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [setLoading]);

  const testimonials = [
    {
      quote: "This app saved me hours every week. Now I know exactly where my money is going.",
      author: "Maria Gonzalez",
      business: "Maria's Corner Store",
      rating: 5
    },
    {
      quote: "The voice input is a game changer! I can record transactions while helping customers.",
      author: "James Chen",
      business: "Chen's Electronics",
      rating: 5
    },
    {
      quote: "Finally a tool made for small businesses like mine. Simple and powerful.",
      author: "Fatima Nkosi",
      business: "Nkosi Spices",
      rating: 4
    }
  ];

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 w-80 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-gray-200 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 p-8 rounded-xl">
                <div className="animate-pulse">
                  <div className="h-32 w-full bg-gray-200 rounded-lg mb-6"></div>
                  <div className="h-8 w-48 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="relative py-20 px-4 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex mb-4">
            <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
              Customer Stories
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Users Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by small business owners across the country.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-lg italic mb-8">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-indigo-600 text-sm">{testimonial.business}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/signup" 
            className="inline-flex items-center px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all duration-300 font-semibold"
          >
            <span>Join Our Happy Customers</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;