import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../context/CourseContext';
import { UserData } from '../context/UserContext';
import { server } from '../main';
import { Skeleton } from '../components/Skeleton';
import toast from 'react-hot-toast';
import axios from 'axios';

function CourseDescription({user}) {
    const navigate = useNavigate()
    const params = useParams();
    const {fetchCourse, course} = CourseData()
    const { fetchUser } = UserData()
    const [loading, setLoading] = useState(true)
    const [paymentLoading, setPaymentLoading] = useState(false);

    const checkoutHandler = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to purchase");
            navigate("/login");
            return;
        }

        try {
            setPaymentLoading(true);

            // Create Stripe session on backend
            const { data } = await axios.post(`${server}/api/payment/create-session`, 
                { courseId: course._id },
                { headers: { token } }
            );

            // Redirect user to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error("Failed to get checkout URL");
                setPaymentLoading(false);
            }
        } catch (error) {
            setPaymentLoading(false);
            toast.error(error.response?.data?.message || "Failed to initialize payment");
        }
    };
    
    useEffect(()=>{
        const loadData = async () => {
          setLoading(true);
          await fetchCourse(params.id);
          setLoading(false);
        };
        loadData();
    }, [params.id])

  if (loading || !course) {
    return (
      <div className="min-h-screen pt-28 bg-background px-4 md:px-8 pb-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <Skeleton className="w-full h-[300px] md:h-[400px] rounded-3xl" />
          </div>
          <div className="w-full md:w-1/2 bg-card p-8 md:p-10 rounded-3xl shadow-md border border-border flex flex-col gap-4">
            <Skeleton className="w-3/4 h-10" />
            <Skeleton className="w-1/2 h-6" />
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-full h-32 mt-4" />
            <div className="mt-auto pt-6 border-t border-border flex justify-between items-center">
              <Skeleton className="w-20 h-8" />
              <Skeleton className="w-1/2 h-14 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-28 bg-background px-4 md:px-8 pb-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Course Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={`${server}/${course.image}`}
              alt={course.title}
              className="w-full object-cover rounded-3xl shadow-xl border border-border"
            />
          </div>

          {/* Course Details */}
          <div className="w-full md:w-1/2 bg-card p-8 md:p-10 rounded-3xl shadow-md border border-border flex flex-col">
            <div className="flex-1">
              <h1 className="text-4xl font-light mb-4 text-foreground leading-tight">{course.title}</h1>
              <p className="text-lg mb-2 text-muted-foreground font-light">Instructor: <span className="text-foreground">{course.createdBy}</span></p>
              <p className="text-lg mb-6 text-muted-foreground font-light">Duration: <span className="text-foreground">{course.duration} Weeks</span></p>
              
              {/* Ratings and Reviews */}
              <div className="mb-8">
                <p className="text-lg mb-2 text-foreground font-light">Ratings and Reviews:</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((star, index) => (
                    <svg
                      key={index}
                      className={`w-6 h-6 fill-current ${
                        index < (course.rating || 3) ? 'text-yellow-400' : 'text-muted'
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.747l-6 5.853 1.413 8.23L12 18.896l-7.413 4.934L6 15.6 0 9.747l8.332-1.592L12 .587z" />
                    </svg>
                  ))}
                  <span className="ml-3 text-muted-foreground font-light">{course.rating || 3}.0</span>
                </div>
              </div>

              {/* Course Long Description */}
              <div className="mb-8">
                <h3 className="text-xl font-light text-foreground mb-3">About This Course</h3>
                <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {course.description}
                </p>
              </div>
            </div>

            {/* Price and Action Section */}
            <div className="pt-6 border-t border-border mt-auto">
              <div className="flex items-center justify-between mb-6">
                <span className="text-muted-foreground text-lg">Price</span>
                <span className="text-3xl font-light text-foreground">₹{course.price}</span>
              </div>
              
              {user && (
                user.subscription?.includes(course._id) || 
                user.purchasedCourses?.some(pc => 
                  (pc.course && pc.course.toString() === course._id) || 
                  pc === course._id
                )
              ) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light py-4 px-6 rounded-xl transition-colors shadow-md text-lg"
                >
                  Start Studying
                </button>
              ) : (
                <button
                  onClick={checkoutHandler}
                  disabled={paymentLoading}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-light py-4 px-6 rounded-xl transition-colors shadow-md text-lg disabled:opacity-50"
                >
                  {paymentLoading ? "Processing..." : "Buy Now"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDescription
