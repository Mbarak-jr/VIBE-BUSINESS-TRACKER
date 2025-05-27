import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white overflow-hidden">
      {/* Decorative elements matching hero section */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">Transform</span> Your Business?
        </h2>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
          Join thousands of small business owners who are taking control of their finances with our intuitive platform.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            to="/signup" 
            className="px-10 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
          >
            <span>Start Free Trial</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link 
            to="/login" 
            className="px-10 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold flex items-center justify-center group"
          >
            <span>Existing User? Login</span>
            <svg className="w-5 h-5 ml-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </Link>
        </div>

        {/* Social proof matching hero section */}
        <div className="mt-12 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((item) => (
              <img 
                key={item}
                src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 20}.jpg`}
                alt="Happy user"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <div className="text-sm text-white/90">
            <p>Trusted by <span className="font-semibold">1,000+</span> businesses worldwide</p>
            <div className="flex items-center justify-center sm:justify-start">
              <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1">4.9/5 from 200+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;