import React, { useState, useEffect, useRef } from 'react';
import { CourseData } from '../context/CourseContext.jsx';
import CourseCard from '../components/CourseCard.jsx';
import { motion } from 'framer-motion';
import gsap from 'gsap';

function Courses() {
    const { courses } = CourseData();
    const [visibleCourses, setVisibleCourses] = useState(6);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const gridRef = useRef(null);

    const handleShowMore = () => {
        setVisibleCourses((prev) => prev + 6);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setVisibleCourses(6);
    };

    const filteredCourses = selectedCategory === 'All' 
        ? courses 
        : courses.filter(course => course.category === selectedCategory);

    useEffect(() => {
        if (filteredCourses && filteredCourses.length > 0 && gridRef.current) {
            let ctx = gsap.context(() => {
                gsap.fromTo('.stagger-card',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }
                );
            }, gridRef);
            return () => ctx.revert();
        }
    }, [filteredCourses, visibleCourses]);

    return (
      <div className="min-h-[100vh] pt-32 pb-20 bg-background px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-light text-foreground tracking-tight uppercase">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">Courses</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Discover a variety of curated programs designed to help you master new skills and accelerate your career.
            </p>
          </motion.div>
      
          {/* Filter Section */}
          <div className="mb-14">
            <div className="flex flex-wrap justify-center gap-3">
              {['All', 'Web Development', 'App Development', 'Game Development', 'Data Science', 'Artificial Intelligence'].map(
                (category) => (
                  <button
                    key={category}
                    className={`px-6 py-3 rounded-xl border text-sm font-light transition-all duration-300
                      ${
                        selectedCategory === category
                          ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                          : 'border-border bg-card text-muted-foreground hover:bg-muted hover:border-primary/50'
                      }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </button>
                )
              )}
            </div>
          </div>
      
          {/* Course Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={gridRef}>
            {filteredCourses && filteredCourses.length > 0 ? (
              filteredCourses.slice(0, visibleCourses).map((course, index) => (
                <div key={`${course._id}-${index}`} className="stagger-card opacity-0">
                  <CourseCard course={course} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
                 <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                   <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                 </div>
                 <h3 className="text-xl font-light text-foreground mb-2">No Courses Found</h3>
                 <p className="text-muted-foreground font-light">Try selecting a different category.</p>
              </div>
            )}
          </div>
      
          {/* Show More Button */}
          {filteredCourses && visibleCourses < filteredCourses.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-16"
            >
              <button
                onClick={handleShowMore}
                className="bg-card border border-border text-foreground px-8 py-4 rounded-xl font-light hover:bg-muted transition-all shadow-sm flex items-center justify-center gap-2 mx-auto"
              >
                Load More 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
}

export default Courses;
