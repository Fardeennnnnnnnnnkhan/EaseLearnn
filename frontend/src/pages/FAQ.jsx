import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: 'How do I enroll in a course?',
    answer: 'Simply navigate to the Courses page, select the course that aligns with your goals, and click the enroll button to gain instant access.',
  },
  {
    question: 'Are the courses self-paced?',
    answer: 'Yes, our platform is designed for flexibility. Once enrolled, you get lifetime access to learn at your own individual pace.',
  },
  {
    question: 'Do I get a certificate upon completion?',
    answer: 'Absolutely! After finishing all modules and passing any required assessments, you will receive an industry-recognized certificate of completion.',
  },
  {
    question: 'Can I interact with the instructors?',
    answer: 'Yes, our premium courses include active Q&A sections and community forums where you can interact directly with instructors and peers.',
  }
];

const FAQ = () => {
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);

  const toggleFAQ = (index) => {
    setSelected(selected === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-item', 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, y: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full relative px-4 bg-transparent flex flex-col items-center" ref={containerRef}>
      
      <div className="absolute inset-0 bg-primary/5 blur-[100px] w-full h-[50%] -z-10 rounded-full mx-auto max-w-4xl opacity-50"></div>

      <div className="text-center mb-16 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-light text-foreground tracking-tight mb-4 uppercase">
          Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">Asked</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl font-light">Everything you need to know about EaseLearn and how it works.</p>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-5 relative z-10">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="faq-item opacity-0 w-full bg-card/60 backdrop-blur-lg border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`p-6 cursor-pointer flex justify-between items-center transition-colors ${selected === index ? 'bg-primary/5' : 'hover:bg-muted/50'}`}
              onClick={() => toggleFAQ(index)}
            >
              <h3 className={`text-lg md:text-xl font-light transition-colors ${selected === index ? 'text-primary' : 'text-foreground'}`}>
                {faq.question}
              </h3>
              <div className={`shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${selected === index ? 'bg-primary text-primary-foreground rotate-45 shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground border border-border'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
              </div>
            </div>
            
            <AnimatePresence>
              {selected === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="p-6 pt-0 text-muted-foreground font-light text-lg border-t border-border mt-2 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
