
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import DealsSection from '@/components/DealsSection';
import FeaturesBanner from '@/components/FeaturesBanner';
import TrendingProducts from '@/components/TrendingProducts';
import PromoSection from '@/components/PromoSection';
import VendorShowcase from '@/components/VendorShowcase';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedCategories />
        <DealsSection />
        <FeaturesBanner />
        <TrendingProducts />
        <PromoSection />
        <VendorShowcase />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
