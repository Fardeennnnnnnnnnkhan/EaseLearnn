import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const instructors = [
  {
    name: 'Dr. Alice Johnson',
    expertise: 'Data Science',
    description: 'Dr. Alice has over 15 years of experience in Data Science, specializing in machine learning and AI.',
    qualifications: 'PhD in Computer Science',
    experience: '15+ years',
    fields: ['Machine Learning', 'AI', 'Data Analytics'],
    image: 'https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'Dr. Alice has been a leader in research, development, and teaching in the field of data science. Her work focuses on creating AI models for real-world applications.'
  },
  {
    name: 'John Smith',
    expertise: 'Full Stack Development',
    description: 'John is a seasoned developer with extensive knowledge in both front-end and back-end technologies.',
    qualifications: 'M.Sc in Computer Science',
    experience: '10+ years',
    fields: ['React', 'Node.js', 'SQL', 'NoSQL'],
    image: 'https://images.pexels.com/photos/8472880/pexels-photo-8472880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'John has developed scalable web applications using modern technologies and frameworks, providing seamless user experiences.'
  },
  {
    name: 'Sarah Lee',
    expertise: 'Cyber Security',
    description: 'Sarah provides robust security solutions with a deep understanding of network security and threat management.',
    qualifications: 'B.Tech in Cyber Security',
    experience: '8+ years',
    fields: ['Network Security', 'Penetration Testing', 'Ethical Hacking'],
    image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'Sarah is skilled in identifying vulnerabilities and implementing secure systems, ensuring the highest level of cybersecurity.'
  },
];

const Instructors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % instructors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [instructors.length]);

  return (
<section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-teal-900/40 to-black px-6 py-12">
    {/* Heading */}
    <h2 className="text-5xl font-light text-foreground mb-12 drop-shadow-lg">
      Our Instructors
    </h2>

    {/* Instructor Card */}
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#171717] p-8 rounded-2xl shadow-2xl border border-gray-800">
      {/* Instructor Image */}
      <motion.div
        className="w-full lg:w-1/2 flex justify-center"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={instructors[currentIndex].image}
          alt={instructors[currentIndex].name}
          className="w-full max-h-96 object-cover rounded-xl shadow-lg border-4 border-teal-950"
        />
      </motion.div>

      {/* Instructor Details */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col justify-center items-start space-y-5 p-8 bg-[#171717] rounded-xl shadow-lg border-l-4 border-gray-600"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-4xl font-light text-foreground">
          {instructors[currentIndex].name}
        </h3>
        <p className="text-lg text-blue-400 font-light">
          {instructors[currentIndex].expertise}
        </p>
        <p className="text-gray-300 leading-relaxed">{instructors[currentIndex].description}</p>
        <p className="text-gray-300">
          <span className="font-light text-blue-400">Qualifications:</span> {instructors[currentIndex].qualifications}
        </p>
        <p className="text-gray-300">
          <span className="font-light text-blue-400">Experience:</span> {instructors[currentIndex].experience} years
        </p>
        <p className="text-gray-300">
          <span className="font-light text-blue-400">Fields:</span> {instructors[currentIndex].fields.join(", ")}
        </p>
        <p className="text-gray-400 italic">{instructors[currentIndex].bio}</p>
      </motion.div>
    </div>
  </section>

  );
};

export default Instructors;
