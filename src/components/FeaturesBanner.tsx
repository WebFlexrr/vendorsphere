
import React from 'react';
import { TruckIcon, ShieldCheck, RotateCcw, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: TruckIcon,
    title: 'Free Shipping',
    description: 'On orders over $50'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: '100% protected transactions'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Expert assistance'
  }
];

const FeaturesBanner = () => {
  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="mr-4 bg-vsphere-light p-3 rounded-full">
                <feature.icon className="h-6 w-6 text-vsphere-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBanner;
