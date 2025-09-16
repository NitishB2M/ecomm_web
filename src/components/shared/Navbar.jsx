"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart, Heart, Sun, Moon, UserCircle, Star, XCircle, ShoppingBag } from 'phosphor-react';
import { useCart } from '@/utils/hooks/useCart';
import { useProfile } from '@/utils/hooks/useProfile';
import { useTheme } from '@/utils/context/ThemeContext';
import Link from 'next/link';
import { FaClipboard, FaClipboardCheck, FaSearch, FaShare } from "react-icons/fa";
import { IsLoggedIn, CURRENT_USER } from '@/utils/Helpers';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cartItemsCount } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout } = useProfile();
  const user = CURRENT_USER();
  const isLoggedIn = IsLoggedIn();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activePath, setActivePath] = useState(pathname);

  const [menuItems] = useState([
    { name: 'Products', path: '/product' },
    { name: 'About', path: '/about' },
  ]);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    router.push('/login');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full m_container mx-auto border-b border-b-primary/10 bg-opacity-50 dark:bg-dark-background dark:border-dark-border flex px-4 py-1 z-50 backdrop-blur-md backdrop-grayscale backdrop-filter ${isDarkMode ? 'dark:text-dark-primary' : 'text-primary'}`}>
      <div className="flex items-center justify-between py-2 w-full">
        <Link href="/">
          <div className={`font-bold text-2xl transition-colors duration-500 ease-in-outtext-primary dark:text-dark-primary hover:text-primary dark:hover:text-dark-primary/80`}>
            Shoooping
          </div>
        </Link>

        <div className="flex items-center space-x-4 md:space-x-8">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.path} className="no-underline">
              <div className={`transition-colors duration-500 ease-in-out ${activePath === item.path
                ? 'text-primary dark:text-dark-primary font-semibold'
                : 'text-black/80 dark:text-dark-primary hover:text-primary dark:hover:text-dark-primary/80'
                }`}>
                {item.name}
              </div>
            </Link>
          ))}

          {isLoggedIn && Object.keys(user).length > 0 ? user?.role?.active_role?.role === 'seller' ? (
            <Link href="/manage-products" className="no-underline">
              <div className={`transition-colors duration-500 ease-in-out ${activePath === '/manage-products'
                ? 'text-info dark:text-dark-info'
                : 'text-black/80 dark:text-dark-primary hover:text-primary dark:hover:text-dark-primary/80'
                }`}>
                Manage Products
              </div>
            </Link>
          ) : null : null}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-end w-64 border-2 pr-2 rounded-full bg-surface focus:border-primary dark:border-dark-primary dark:bg-dark-surface">
            <input type='text' placeholder='What are you looking for?' className='!pl-3 !py-2 !rounded-full text-black border-none outline-none placeholder:text-black/30 placeholder:text-sm dark:text-dark-primary dark:placeholder:text-dark-primary/50' />
            <FaSearch className='ml-2 text-lg cursor-pointer' />
          </div>
          <div
            onClick={() => toggleTheme(!isDarkMode)}
            className="text-l-primary dark:text-d-primary hover:text-l-hover dark:hover:text-d-hover cursor-pointer"
          >
            {isDarkMode && isDarkMode ? <Sun className='text-2xl' /> : <Moon className='text-2xl' />}
          </div>

          {isLoggedIn && Object.keys(user).length > 0 ? (
            <>
              <Link
                href="/wishlist"
                className="text-l-primary dark:text-d-primary hover:text-l-hover dark:hover:text-d-hover"
              >
                <div>
                  <Heart size={24} className={`transition-colors duration-500 ease-in-out ${activePath === '/wishlist'
                    ? 'text-info dark:text-info'
                    : 'text-secondary/80 text-red-400 hover:text-red-600'
                    }`}
                    weight={`${activePath === '/wishlist' ? 'fill' : 'regular'}`}
                  />
                </div>
              </Link>

              <Link
                href="/cart"
                className="text-l-primary dark:text-d-primary hover:text-l-hover dark:hover:text-d-hover"
              >
                <div>
                  <ShoppingCart size={24} className={`transition-colors duration-500 ease-in-out ${activePath === '/cart'
                    ? 'text-info dark:text-info'
                    : 'text-primary hover:text-info/80 dark:hover:text-info/80 dark:text-dark-info'
                    }`}
                    weight={`${activePath === '/cart' ? 'fill' : 'regular'}`}
                  />
                </div>
              </Link>

              <div className="relative inline-block text-left" ref={menuRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <UserCircle size={32} className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400" />
                </button>

                {isOpen && (
                  <div
                    className="absolute -right-4 mt-4 w-64 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
                  >
                    {user && <div className="px-4 py-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Hello, <span className="font-medium">{user?.first_name}</span> 👋
                      </p>
                    </div>}

                    <div className="border-t border-gray-200 dark:border-gray-700" />

                    <div className="py-1">
                      <MenuItem href="/profile" label="Manage Account" icon={<UserCircle size={20} />} />
                      <MenuItem href="/orders" label="Orders" icon={<ShoppingBag size={20} />} />
                      <MenuItem href="/cancellations" label="Cancellations" icon={<XCircle size={20} />} />
                      <MenuItem href="/reviews" label="Reviews" icon={<Star size={20} />} />
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700" />

                    <div
                      onClick={handleLogout}
                      className="cursor-pointer px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              className="bg-info text-background text-md tracking-widest hover:bg-info/95 w-fit px-6 py-2 rounded-md transition-all duration-300"
              onClick={() => router.push('/auth/login')}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ href, label, icon }) => (
  <Link href={href}>
    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
      {icon}
      {label}
    </div>
  </Link>
);

export default Navbar;
