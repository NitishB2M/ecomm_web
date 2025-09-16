"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, CircleProgress } from "keep-react";
import { Camera, ComputerTower, Headphones, Monitor, PhoneCall, ShoppingCart, Watch } from 'phosphor-react';
import { Carousel, CarouselItem, CarouselSlides, CarouselControl, CarouselButtons, CarouselPrevButton, CarouselNextButton, CarouselIndicators } from 'keep-react';
import ProductCard from '../product/ProductCard';
import ViewButton from '../buttons/ViewButton';
import { useProduct } from '@/utils/hooks/useProduct';
import { FaMobile } from 'react-icons/fa';
import ApiCall from '@/utils/APICalls';
import Constants from '@/utils/Constant';
import moment from 'moment';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });
  const {
    productGDLoading,
    productOfferLoading,
    productFeaturedLoading,
    featuredProducts,
    productFeaturedError,
    productGDError,
    productOfferError,
    offerProducts,
  } = useProduct();

  const [productGreatDeals, setProductGreatDeals] = useState([]);

  useEffect(() => {
    // loadProducts();
    fetchProductGreatDeals();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds };

        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) return { ...prev, minutes: newMinutes, seconds: 59 };

        const newHours = prev.hours - 1;
        if (newHours >= 0) return { ...prev, hours: newHours, minutes: 59, seconds: 59 };

        const newDays = prev.days - 1;
        if (newDays >= 0) return { days: newDays, hours: 23, minutes: 59, seconds: 59 };

        clearInterval(timer);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  const fetchProductGreatDeals = async () => {
    try {
      const response = await ApiCall({
        url: Constants.API_ENDPOINTS.GET_PRODUCT_GREAT_DEALS
      });
      if (response.status) {
        setProductGreatDeals(response.data);
      } else {
        setProductGreatDeals([]);
      }
    } catch (err) {
      console.log(err.message)
    }
  };

  const categories = [
    { icon: <FaMobile />, name: 'Phones', path: '/products/filters?category=phones' },
    { icon: <Monitor />, name: 'Computers', path: '/products/filters?category=computers' },
    { icon: <Watch />, name: 'Smartwatch', path: '/products/filters?category=smartwatch' },
    { icon: <Camera />, name: 'Camera', path: '/products/filters?category=camera' },
    { icon: <Headphones />, name: 'Headphones', path: '/products/filters?category=headphones' },
  ];

  if (productGDError || productOfferError || productFeaturedError) {
    return (
      <div className="py-8">
        <div color="error">{productGDError || productOfferError || productFeaturedError}</div>
      </div>
    );
  }

  return (
    <div className="m_container min-h-screen pt-10 dark:bg-dark-surface">
      {/* Hero Section */}
      <section className="bg-background text-primary dark:text-dark-surface dark:bg-transparent">
        <div className="py-8">
          <div className='flex items-center justify-between'>
            <div className="w-1/2 ml-10">
              <div className="mb-4 text-heading-2 leading-9 font-light text-primary dark:text-dark-primary">
                iPhone 14 Series
              </div>
              <div className="mb-2 text-2xl leading-7 font-normal text-[#162F36] dark:text-gray-200">
                Up to 10% off Voucher
              </div>
              <button type="button" className='mt-3 flex items-center bg-primary dark:bg-dark-border text-white py-2 px-4 rounded-md hover:bg-[#1B3B44] transition-all'>
                <ShoppingCart size={18} className="mr-2" />
                Shop Now
              </button>
            </div>
            <div className='flex items-center w-1/2 justify-center'>
              <img
                src="https://images.unsplash.com/photo-1609921205586-7e8a57516512?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lfGVufDB8fDB8fHww"
                alt="iPhone 14"
                className="w-full rounded-lg mx-auto shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <div className="py-8">
        <div className="font-semibold pb-4 text-xl text-primary dark:text-dark-primary">
          Browse By Category
        </div>
        <Carousel options={{ slidesToScroll: 2 }}>
          <CarouselSlides className="flex">
            {categories.map((category) => (
              <CarouselItem key={category.name} className="flex-[0_0_20%]">
                <Link
                  href={category.path || "/products"}
                  className="flex flex-col p-4 justify-center items-center border border-primary dark:border-dark-primary rounded-sm hover:text-primary transition-colors duration-700 ease-in-out dark:bg-primary/30 hover:bg-box dark:hover:bg-primary/80 text-primary dark:text-dark-primary"
                >
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <div>{category.name}</div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselSlides>

          {/* Carousel Controls */}
          <CarouselControl>
            <CarouselButtons>
              <CarouselPrevButton />
              <CarouselNextButton />
            </CarouselButtons>
            <CarouselIndicators />
          </CarouselControl>
        </Carousel>
      </div>

      {/* Flash Sale Section */}
      {productGreatDeals && productGreatDeals.length > 0 &&
        <div className="py-8">
          <div className="flex justify-between items-center mb-4">
            <div className='dark:text-dark-primary'>
              <div className="text-xl mb-2">
                Today's
              </div>
              <div className="font-semibold text-warning text-3xl">
                Flash Sales
              </div>
            </div>
            <div className="flex items-center gap-8 dark:text-dark-primary/70">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="font-semibold dark:text-dark-primary">
                    {timeLeft.days.toString().padStart(2, '0')}
                  </div>
                  <div>
                    Days
                  </div>
                </div>
                <div className="font-semibold">
                  :
                </div>
                <div className="text-center">
                  <div className="font-semibold dark:text-dark-primary">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="dark:text-dark-secondary">
                    Hours
                  </div>
                </div>
                <div className="font-semibold">
                  :
                </div>
                <div className="text-center">
                  <div className="font-semibold dark:text-dark-primary">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="dark:text-dark-secondary">
                    Minutes
                  </div>
                </div>
                <div className="font-semibold">
                  :
                </div>
                <div className="text-center">
                  <div className="font-semibold dark:text-dark-primary">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="">
                    Seconds
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {/* <IconButton className="border border-gray-200 hover:border-d-secondary dark:hover:text-d-secondary dark:text-d-primary">
              </IconButton>
              <IconButton className="border border-gray-200 hover:border-d-secondary dark:hover:text-d-secondary dark:text-d-primary">
              </IconButton> */}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-5 gap-4'>
            {productGreatDeals && productGreatDeals.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} isFlashSale={true} />
              </div>
            ))}
          </div>
          <ViewButton link="/products/flash-sale" text="View All Products" />
        </div>
      }

      {/* Featured Products Section */}
      {featuredProducts && featuredProducts.length > 0 && (
        <div>
          <div>
            Featured Products
          </div>
          <div >
            {featuredProducts.map((product) => (
              <div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <ViewButton link="/products" text="View All Products" />
        </div>
      )}
    </div>
  );
};

export default Home;
