import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { server } from '../main'; 
import toast from 'react-hot-toast';
import CourseCard from '../components/CourseCard';
import { motion } from 'framer-motion';
import CardSwap, { Card } from '../ReactBits/CardSwap';
import { useNavigate } from 'react-router-dom';

function AvailableCourses() {
  const [courses, setCourses] = useState([]);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${server}/course/all`);
      const allCourses = data.courses;
      setCourses(getRandomCourses(allCourses, 4)); // 4 cards is optimal for CardSwap overlapping
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      toast.error('Failed to load courses');
    }
  };

  const getRandomCourses = (allCourses, count) => {
    if (allCourses.length <= count) return allCourses;
    const shuffled = [...allCourses].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center w-full max-w-7xl mx-auto px-4 gap-16 lg:gap-8 min-h-[600px] py-10 overflow-hidden" ref={sectionRef}>
      
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-5/12 text-center lg:text-left z-10"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground uppercase leading-[1.1]">
          Featured <br className="hidden lg:block" />
          <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
            Selection
          </span>
        </h2>
        <p className="mt-6 text-muted-foreground text-lg md:text-xl font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
          Hand-picked curated courses to fast-track your career and expand your horizons. Interactive, engaging, and designed for real-world impact.
        </p>
        
        <div className="mt-10 flex gap-4 justify-center lg:justify-start">
          <button 
            onClick={() => navigate('/courses')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:-translate-y-1 active:scale-95"
          >
            Browse All Courses
          </button>
        </div>
      </motion.div>

      {/* CardSwap Component Area */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full lg:w-7/12 relative h-[600px] sm:h-[650px] lg:h-[700px] flex justify-center items-center mt-12 lg:mt-0"
      >
        {courses.length > 0 ? (
          <div className="relative w-full h-full max-w-[600px] mx-auto flex justify-center items-center">
            {/* We override some internal card styles directly with Tailwind to ensure it looks like a clean UI element */}
            <CardSwap 
              width={380} 
              height={550} 
              pauseOnHover={true} 
              cardDistance={85} 
              verticalDistance={45}
              skewAmount={3}
            >
              {courses.map((course) => (
                 <Card 
                    key={course._id} 
                    className="!bg-transparent !border-none !rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-visible cursor-pointer"
                 >
                    <div className="w-full h-full pointer-events-auto rounded-2xl bg-card border border-border/50 overflow-hidden">
                       {/* CourseCard rendered identically, but inside the animated stack */}
                       <CourseCard course={course} />
                    </div>
                 </Card>
              ))}
            </CardSwap>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center opacity-70">
             <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin mb-4"></div>
             <p className="text-muted-foreground font-light text-sm tracking-wide uppercase">Curating Selection</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default AvailableCourses;
