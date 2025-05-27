// src/store/landingComponents.js
import { lazy } from 'react';

const LandingComponents = {
  Header: lazy(() => import('../components/Landing/LandingHeader')),
  Hero: lazy(() => import('../components/Landing/HeroSection')),
  Features: lazy(() => import('../components/Landing/FeaturesSection')),
  HowItWorks: lazy(() => import('../components/Landing/HowItWorks')),
  Testimonials: lazy(() => import('../components/Landing/Testimonials')),
  Cta: lazy(() => import('../components/Landing/CtaSection')),
  Footer: lazy(() => import('../components/Landing/LandingFooter')),
};

export default LandingComponents;
