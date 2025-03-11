
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-vsphere-primary to-vsphere-coral">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Selling on VendorSphere?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join hundreds of successful vendors and reach millions of customers worldwide.
            Start your selling journey today with our easy onboarding process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-vsphere-primary hover:bg-gray-100 text-lg px-8 py-6">
              Become a Vendor
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
