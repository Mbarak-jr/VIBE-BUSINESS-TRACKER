import { Suspense, useEffect } from 'react';
import useStore from '../store';
import LandingComponents from '../store/landingComponents';

const Landing = () => {
  const { user, loading, setLoading } = useStore();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading delay

    return () => clearTimeout(timer);
  }, [setLoading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="landing-page">
      <Suspense fallback={<div className="h-16 bg-white shadow-sm" />}>
        <LandingComponents.Header user={user} />
      </Suspense>

      <main className="landing-content">
        <Suspense fallback={<div className="h-96 bg-gray-50" />}>
          <LandingComponents.Hero />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-white" />}>
          <LandingComponents.Features />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-gray-50" />}>
          <LandingComponents.HowItWorks />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-white" />}>
          <LandingComponents.Testimonials />
        </Suspense>

        <Suspense fallback={<div className="h-64 bg-indigo-600" />}>
          <LandingComponents.Cta user={user} />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-48 bg-gray-800" />}>
        <LandingComponents.Footer />
      </Suspense>
    </div>
  );
};

export default Landing;
