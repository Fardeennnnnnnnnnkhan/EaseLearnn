import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext.jsx';
import { motion } from 'framer-motion';
import { RiUserLine, RiMailLine, RiLockPasswordLine, RiArrowRightSLine } from 'react-icons/ri';

function Register() {
  const navigate = useNavigate();
  const { btnloading, registerUser } = UserData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-[100vh] pt-20 bg-background px-4 relative overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-card/60 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-border/50 p-8 sm:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-2xl mb-6 shadow-inner">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          </div>
          <h2 className="text-3xl font-light text-foreground mb-2 tracking-tight">Create Account</h2>
          <p className="text-muted-foreground font-light">Join EaseLearn and start your premium learning journey.</p>
        </div>
        
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-light text-muted-foreground uppercase tracking-wider" htmlFor="username">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                <RiUserLine className="w-5 h-5" />
              </div>
              <input
                id="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3.5 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-xs font-light text-muted-foreground uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                <RiMailLine className="w-5 h-5" />
              </div>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3.5 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-xs font-light text-muted-foreground uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                <RiLockPasswordLine className="w-5 h-5" />
              </div>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
                required
              />
            </div>
          </div>

          <button
            disabled={btnloading}
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-primary/25 mt-8 disabled:opacity-50 flex items-center justify-center gap-2 group"
          >
            {btnloading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>Sign Up <RiArrowRightSLine className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </form>

        <p className="mt-10 text-center text-sm font-light text-muted-foreground">
          Already have an account?{' '}
          <Link className="font-light text-primary hover:underline" to="/login">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
