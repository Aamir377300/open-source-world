import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Sun, Moon } from 'lucide-react';
import '../index.css'
import { useTheme } from '../context/ThemeContext';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Initiatives', href: '#initiatives' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "light"
            ? "bg-white/90 backdrop-blur-md shadow-md text-gray-700"
            : "bg-[#0e3a63]/90 backdrop-blur-md shadow-md text-[#dbeeff]"
          : ""
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('#hero')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#073f70] to-[#1f84d6]">
              <span className="text-white font-bold text-base sm:text-lg">OSW</span>
            </div>
            {/* Full text on larger screens */}
            <span className={`hidden sm:inline font-bold text-lg sm:text-xl transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Open Source World
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.href)}
                className={`font-medium transition-colors text-sm lg:text-base ${isScrolled
                  ? 'text-secondary-700 hover:text-primary-600'
                  : 'text-white/90 hover:text-white'
                  }`}
              >
                {item.name}
              </motion.button>
            ))}
            {/* Theme Toggle */}
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2">
              {theme === "light" ? (
              )}
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#contact')}
              className={`btn-primary text-sm lg:text-base ${!isScrolled ? 'bg-white text-primary-300 hover:bg-gray-100' : ''
                }`}
            >
              Get Involved
            </motion.button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2">
              {theme === "light" ? (
                <Moon size={20} color="#a7acb5ff" />
              ) : (
                <Sun size={20} color="#ffffff" />
              )}
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center ${
                isScrolled ? 'text-secondary-700' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden"
      >
        <div className="container-max py-4 space-y-2 px-4">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left px-4 py-3 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors min-h-[44px]"
            >
              {item.name}
            </motion.button>
          ))}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#contact')}
            className="block w-full btn-primary mt-4 min-h-[44px]"
          >
            Get Involved
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;