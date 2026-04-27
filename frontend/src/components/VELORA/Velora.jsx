import React from "react";
import "./velora.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

export default function Velora() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-sky-50 dark:bg-slate-950 transition-colors duration-1000">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 dark:opacity-80 transition-opacity duration-1000"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        
        {/* Light Theme: Sunshine Blue Sky Overlay */}
        <div className="absolute inset-0 bg-sky-300/30 mix-blend-overlay dark:opacity-0 transition-opacity duration-1000 z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 to-transparent dark:opacity-0 transition-opacity duration-1000 z-[2]"></div>

        {/* Dark Theme: Subtle Night & Moon Effect Overlay */}
        <div className="absolute inset-0 bg-indigo-900/30 mix-blend-overlay opacity-0 dark:opacity-100 transition-opacity duration-1000 z-[3]"></div>
        <div className="absolute inset-0 bg-slate-950/30 opacity-0 dark:opacity-100 transition-opacity duration-1000 z-[4]"></div>
        
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-60 mix-blend-screen animate-pulse pointer-events-none z-10"></div>
        <div
          className="absolute bottom-1/4 right-[10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none z-10"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10 dark:opacity-50"></div>
      </div>

      <motion.div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200/50 dark:border-white/20 bg-white/50 dark:bg-black/40 backdrop-blur-md shadow-sm transition-colors duration-1000"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-medium text-slate-800 dark:font-light dark:text-white/80 transition-colors duration-1000">
            New courses added this week
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-light tracking-tighter leading-[1.1] mb-6 text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-lg transition-colors duration-1000"
        >
          Master skills <br className="hidden md:block" />
          with{" "}
          <span className="font-semibold text-sky-600 dark:text-white drop-shadow-[0_0_15px_rgba(2,132,199,0.3)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-1000">
            Confidence.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-2xl text-slate-700 dark:text-white/90 max-w-3xl mb-10 font-medium dark:font-light leading-relaxed drop-shadow-sm dark:drop-shadow-md transition-colors duration-1000"
        >
          Accelerate your career with elite, expert-led courses designed for
          real-world impact. Join thousands of high-achievers today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => navigate("/courses")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-light text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
          >
            Explore Courses
            <RiArrowRightLine className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/about")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-card border border-border px-8 py-4 text-base font-light text-foreground hover:bg-muted transition-all duration-300 w-full sm:w-auto"
          >
            Our Mission
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
