import React from 'react';
import { server } from '../main';
import { CourseData } from '../context/CourseContext';
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import { RiStarFill, RiTimeLine, RiVideoLine } from 'react-icons/ri';

function CourseCard({ course }) {
  const navigate = useNavigate();
  const { isAuth, user } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized to perform this action.");
      return;
    }
    if (confirm("Are You Sure You want to delete this Course?")) {
      try {
        const response = await axios.delete(`${server}/admin/course/${id}`, {
          headers: { token: token },
        });
        if (response && response.data) {
          toast.success(response.data.message);
          fetchCourses();
        }
      } catch (err) {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="group relative w-full rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1">
      {/* Course Image Header */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
        <img
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={`${server}/${course.image}`}
          alt={course.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {course.category && (
            <span className="bg-background/90 backdrop-blur-md text-foreground text-[10px] uppercase font-light tracking-wider px-2.5 py-1 rounded-sm shadow-sm ring-1 ring-border/50">
              {course.category}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Title & Instructor */}
        <div className="mb-2">
          <h3 className="text-lg leading-tight font-light text-foreground line-clamp-2 md:line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-1">
            by <span className="font-light text-foreground">{course.createdBy || "Expert Instructor"}</span>
          </p>
        </div>

        {/* Info Tags */}
        <div className="flex items-center gap-4 mt-2 text-xs font-light text-muted-foreground">
          <div className="flex items-center gap-1">
             <RiStarFill className="text-yellow-500 text-sm" />
             <span className="text-foreground">4.8</span>
             <span>(1.2k)</span>
          </div>
          <div className="flex items-center gap-1">
             <RiTimeLine className="text-sm" />
             <span>{course.duration ? `${course.duration} hours` : "Self-paced"}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-5">
          <div className="flex items-end gap-2 mb-4">
            <span className="text-2xl font-light text-foreground">₹{course.price}</span>
            {course.price > 0 && (
               <span className="text-sm font-light line-through text-muted-foreground mb-1">
                 ₹{Math.round(course.price * 1.5)}
               </span>
            )}
          </div>

          <div className="space-y-2">
            {isAuth ? (
              user && user.role !== "admin" ? (
                user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light py-3 rounded-xl transition-all shadow-sm"
                  >
                    Continue Learning
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    Enroll Now
                  </button>
                )
              ) : (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light py-3 rounded-xl transition-all shadow-sm"
                >
                  View Course
                </button>
              )
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-light py-3 rounded-xl transition-all border border-primary/20"
              >
                Log in to Enroll
              </button>
            )}

            {user && user.role === "admin" && (
              <button
                onClick={() => deleteHandler(course._id)}
                className="w-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground font-light py-2 rounded-lg transition-colors border border-destructive/20 mt-2"
              >
                Delete Course
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

