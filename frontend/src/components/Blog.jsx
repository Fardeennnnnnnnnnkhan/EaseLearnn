import { motion } from "framer-motion";

const blogs = [
  {
    title: "Mastering JavaScript in 30 Days",
    description: "A step-by-step guide to becoming a JavaScript pro. This guide covers everything from basic syntax and concepts to advanced topics like closures, asynchronous programming, and design patterns. By the end of this journey, you'll be equipped with the knowledge to build complex applications efficiently.",
    image: "https://ellipsiseducation.com/wp-content/uploads/2023/03/javascript.png",
  },
  {
    title: "React Best Practices for 2024",
    description: "Learn the latest React techniques and performance optimization tips. This includes best practices for component structure, state management with modern libraries, optimizing rendering with memoization, and ensuring your app remains scalable and maintainable for the long run.",
    image: "https://bilginc.com/editorFiles/3147aa77.png",
  },
  {
    title: "How to Ace Coding Interviews",
    description: "Top algorithms, problem-solving strategies, and interview tips to help you land your dream job. This guide covers data structures, algorithmic patterns, system design concepts, and real-world coding challenges to prepare you for both technical and behavioral interview rounds.",
    image: "https://plus.unsplash.com/premium_photo-1672997189907-220e1305bb56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJ2aWV3c3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

const Blogs = () => {
  return (
    <div className="w-full py-16 bg-gradient-to-t from-teal-900/40 to-black bg-black text-foreground flex flex-col items-center">
      <h2 className="text-4xl font-light text-teal-400 mb-8">Latest Blogs & Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-4">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            className="bg-[#171717] p-6 rounded-lg shadow-lg text-center"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-contain rounded-md mb-4"
            />
            <h3 className="text-lg font-light text-teal-400">{blog.title}</h3>
            <p className="text-gray-300">{blog.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
