import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';

function Verify() {
  const [otp, setOtp] = useState('');
  const { btnloading, verifyOtp } = UserData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-border">
        
        {/* Right Column (Image/Brand) */}
        <div className="w-full md:w-1/2 bg-muted flex flex-col items-center justify-center p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
          <img
            src="https://i.ibb.co/fXHgktz/toshjmosh-a-stunning-3-D-cartoon-illustration-of-a-male-student-1d5b097c-cf94-409e-a42c-6d171d839dc8.png"
            alt="Illustration"
            className="h-64 object-contain relative z-10 filter drop-shadow-xl saturate-150"
          />
          <div className="mt-8 text-center relative z-10">
            <h2 className="text-2xl font-light text-foreground">Secure Verification</h2>
            <p className="text-muted-foreground mt-2">Almost there! Complete the process.</p>
          </div>
        </div>
        
        {/* Left Column (Form) */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-light text-foreground mb-2">OTP Verification</h2>
          <p className="text-muted-foreground mb-8">Please enter the OTP sent to your email.</p>
          
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-light text-foreground mb-1" htmlFor="otp">
                One Time Password
              </label>
              <input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="number"
                placeholder="000000"
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>
            
            <button
              disabled={btnloading}
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light py-3 rounded-xl transition-all shadow-md mt-6 disabled:opacity-50"
            >
              {btnloading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Go Back To{' '}
            <Link className="font-light text-primary hover:underline hover:text-primary/90" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Verify;
