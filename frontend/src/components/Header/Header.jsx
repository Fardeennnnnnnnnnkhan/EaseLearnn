import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { RiMenu3Fill, RiCloseFill, RiMoonFill, RiSunFill } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';

function Header({ isAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check initial preferences
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }, [location.pathname]);

  const navLinks = [
    { name: "Explore", path: "/courses" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <header className={`fixed top-0 sm:top-4 left-0 sm:left-1/2 sm:-translate-x-1/2 z-50 w-full sm:w-[95%] max-w-7xl transition-all duration-500 sm:rounded-2xl ${scrolled ? 'bg-background/70 backdrop-blur-2xl border border-border/50 shadow-lg py-3' : 'bg-background/30 backdrop-blur-md border border-border/30 py-4 sm:py-5'} ${isOpen ? '!bg-background/90 sm:!bg-background/70 !backdrop-blur-3xl' : ''}`}>
        <div className="container mx-auto flex items-center justify-between px-6 md:px-8 relative z-50">
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group" onClick={() => isOpen && toggleMenu()}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 shadow-md group-hover:shadow-primary/50">
              <span className="text-primary-foreground font-medium text-xl leading-none">E</span>
            </div>
            <span className="text-2xl font-light tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
              EaseLearn
            </span>
          </NavLink>

          <div className="flex items-center gap-2 sm:gap-6">
            {/* Desktop Nav */}
            <nav className="hidden sm:flex items-center gap-8 mr-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-300 hover:text-primary relative group ${
                      isActive ? "text-primary" : "text-foreground/80"
                    }`
                  }
                >
                  {link.name}
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              ))}
            </nav>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2.5 mr-1 sm:mr-0 text-foreground/80 hover:text-primary transition-all duration-300 focus:outline-none rounded-full hover:bg-muted/80 active:scale-95"
              aria-label="Toggle Dark Mode"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 360 : 0, scale: isDarkMode ? 1 : 1.1 }}
                transition={{ duration: 0.5, ease: "anticipate" }}
              >
                {isDarkMode ? <RiSunFill className="h-5 w-5" /> : <RiMoonFill className="h-5 w-5" />}
              </motion.div>
            </button>

            {/* User / Login Actions Desktop */}
            <div className="hidden sm:flex items-center gap-3">
               {isAuth ? (
                 <NavLink to="/account" className="px-5 py-2.5 text-sm font-medium bg-secondary/80 backdrop-blur-sm text-secondary-foreground rounded-xl hover:bg-secondary transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
                   Dashboard
                 </NavLink>
               ) : (
                 <>
                   <NavLink to="/login" className="px-5 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300">
                     Log in
                   </NavLink>
                   <NavLink to="/register" className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-primary/30 active:scale-95 transform hover:-translate-y-0.5">
                     Sign up
                   </NavLink>
                 </>
               )}
            </div>

            {/* Mobile Toggle */}
            <button
              className="sm:hidden p-2.5 text-foreground hover:text-primary transition-colors focus:outline-none bg-muted/50 rounded-xl active:scale-95 relative overflow-hidden"
              onClick={toggleMenu}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <RiCloseFill className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <RiMenu3Fill className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background/80 sm:hidden flex flex-col justify-center px-8"
          >
            <div className="flex flex-col space-y-8 mt-16">
              {navLinks.map((link, i) => (
                <motion.div 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  key={link.name}
                >
                  <NavLink
                    to={link.path}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `block text-4xl font-light tracking-tight transition-all duration-300 hover:text-primary ${
                        isActive ? "text-primary" : "text-foreground"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="pt-8 border-t border-border/50 flex flex-col gap-4 w-full"
              >
                {isAuth ? (
                  <NavLink onClick={toggleMenu} to="/account" className="w-full text-center px-6 py-4 text-lg font-medium bg-primary text-primary-foreground rounded-2xl shadow-lg shadow-primary/25 active:scale-95 transition-transform duration-300">
                    Go to Dashboard
                  </NavLink>
                ) : (
                  <>
                    <NavLink onClick={toggleMenu} to="/login" className="w-full text-center px-6 py-4 text-lg font-medium bg-secondary text-secondary-foreground rounded-2xl active:scale-95 transition-transform duration-300">
                      Log in
                    </NavLink>
                    <NavLink onClick={toggleMenu} to="/register" className="w-full text-center px-6 py-4 text-lg font-medium bg-primary text-primary-foreground rounded-2xl shadow-lg shadow-primary/25 active:scale-95 transition-transform duration-300">
                      Let's Get Started
                    </NavLink>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
