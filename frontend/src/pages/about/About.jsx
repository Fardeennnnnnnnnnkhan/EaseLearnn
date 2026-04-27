import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <section className="bg-background text-foreground px-4 py-28 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-light tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Welcome to <span className="text-primary">EaseLearn</span>
          </motion.h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">
            Our platform provides high-quality, accessible education for learners worldwide. From beginner to expert, EaseLearn offers a wide range of courses to help you achieve your learning goals.
          </p>
        </div>
    
        {/* Vision & Mission Section */}
        <div className="mb-20 bg-card p-12 rounded-3xl shadow-md border border-border text-center">
          <h2 className="text-3xl md:text-5xl font-light mb-6 text-foreground">Our Vision & Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto">
            We envision a world where education is accessible to all. Our mission is to provide flexible, engaging, and effective learning solutions that cater to the needs of learners of all ages.
          </p>
        </div>
    
        {/* Key Features Section */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-light mb-12 text-foreground">Why <span className="text-primary">EaseLearn?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Interactive Learning', description: 'Hands-on learning experiences with real-world applications.' },
              { title: 'Expert Instructors', description: 'Learn from industry leaders and skilled professionals.' },
              { title: 'Global Community', description: 'Join a supportive community of learners from around the world.' },
              { title: 'Certification Programs', description: 'Earn certificates to boost your resume and career prospects.' },
              { title: 'Anytime, Anywhere', description: 'Access your courses from any device, anytime.' },
              { title: 'Affordable Education', description: 'High-quality education at an affordable price.' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 bg-card border border-border shadow-sm rounded-3xl text-left"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                   <div className="h-6 w-6 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-2xl font-light mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
    
        {/* Call to Action Section */}
        <div className="text-center bg-primary text-primary-foreground py-16 px-6 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Start Learning Today</h2>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-10">
              Join our growing community of learners and get access to high-quality courses designed to help you succeed in your career.
            </p>
            <motion.a
              href="/courses"
              className="inline-block bg-background text-foreground py-4 px-10 rounded-full font-light shadow-md hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
