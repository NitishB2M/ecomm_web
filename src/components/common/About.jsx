import React from 'react';
import { Card } from 'keep-react';
import {
  Buildings,
  Target,
  Medal,
  Users,
  Rocket,
  Crown
} from 'phosphor-react';


const About = () => {
  const features = [
    {
      icon: <Buildings size={32} />,
      title: 'Our Story',
      description: 'Founded in 2023, ShopSmart has revolutionized the online shopping experience by bringing together quality products, competitive prices, and exceptional customer service.'
    },
    {
      icon: <Target size={32} />,
      title: 'Our Mission',
      description: 'We strive to provide an unparalleled shopping experience by offering carefully curated products, implementing cutting-edge technology, and maintaining the highest standards of customer satisfaction.'
    },
    {
      icon: <Medal size={32} />,
      title: 'Quality Assurance',
      description: 'Every product on our platform undergoes rigorous quality checks. We partner with trusted brands and sellers to ensure you receive only the best products.'
    },
    {
      icon: <Users size={32} />,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority. Our dedicated support team is available 24/7 to assist you with any queries. We believe in building lasting relationships.'
    },
    {
      icon: <Rocket size={32} />,
      title: 'Innovation',
      description: 'We continuously evolve our platform with the latest technology to provide you with a smooth, secure, and innovative shopping experience.'
    },
    {
      icon: <Crown size={32} />,
      title: 'Why Choose Us?',
      description: 'With thousands of satisfied customers, secure transactions, and lightning-fast delivery, ShopSmart has become the go-to destination for smart shoppers.'
    }
  ];

  return (
    <div className={`max-w-6xl mx-auto min_h_screen py-12 dark:bg-dark-background/80 bg-background`}>
      <div className="px-4">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 dark:text-white text-gray-900`}>
            About ShopSmart
          </h1>
          <p className={`text-xl dark:text-gray-300 text-gray-600`}>
            Your Trusted Shopping Destination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`max-w-sm h-full w-full transition-500 hover:-translate-y-2 bg-opacity-60 backdrop-blur-sm dark:bg-gray-800 text-white bg-surface2`}
            >
              <div className="p-6">
                <div className={`mb-4 dark:text-blue-400 text-blue-600`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 dark:text-white text-gray-900`}>
                  {feature.title}
                </h3>
                <p className={`dark:text-gray-300 text-gray-600`}>
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className={`text-center mt-12 dark:text-gray-300 text-gray-600`}>
          <p className="text-lg">
            Join our growing community and experience the future of online shopping today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;