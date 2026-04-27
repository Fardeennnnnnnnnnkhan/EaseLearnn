import React, { useRef } from "react";
import "./Home.css";
import AvailableCourses from "../AvailableCourses.jsx";
import FAQ from "../FAQ.jsx";
import Velora from "../../components/VELORA/Velora.jsx"

function Home() {
  const containerRef = useRef(null);

  return (
    <div className="w-full min-h-screen text-foreground bg-background overflow-x-hidden font-sans" ref={containerRef}>
      
      {/* Hero Section */}
      <Velora/>

      {/* Featured Courses Overview */}
      <section className="relative w-full py-24 md:py-32 bg-background z-20">
        <div className="container mx-auto px-6">
          <AvailableCourses />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative w-full py-24 bg-muted/20 border-t border-border z-20">
        <div className="container mx-auto px-6">
          <FAQ />
        </div>
      </section>

    </div>
  );
}

export default Home;