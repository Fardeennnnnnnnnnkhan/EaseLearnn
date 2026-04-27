import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../context/CourseContext'
import { server } from '../main'
import { Link } from 'react-router-dom'

function Study({user}) {
    const params = useParams()
    const navigate = useNavigate()
    const {fetchCourse , course} = CourseData()
    // if(user && user.role !== "admin" && !user.subscription.includes(params.id)) 
    //     return navigate('/')
    useEffect(() => {
     fetchCourse(params.id)
    }, [])
    
  return (
    <div className="flex justify-center items-center min-h-screen bg-background px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-primary/5"></div>

      {course && (
        <div className="relative max-w-lg w-full bg-card shadow-xl rounded-3xl p-10 border border-border flex flex-col items-center text-center">
          {/* Course Image */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
            <img
              className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-background relative z-10"
              src={`${server}/${course.image}`}
              alt={course.title}
            />
          </div>

          {/* Course Title */}
          <h2 className="text-3xl text-foreground font-light mb-3 tracking-tight">
            {course.title}
          </h2>

          {/* Course Description */}
          <p className="text-muted-foreground text-sm mb-6 max-w-sm">{course.description}</p>

          {/* Course Info */}
          <div className="space-y-2 mb-6 w-full text-sm">
            <div className="flex justify-between pb-2 border-b border-border">
              <span className="font-light text-muted-foreground">Instructor</span>
              <span className="font-light text-foreground">{course.createdBy}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="font-light text-muted-foreground">Duration</span>
              <span className="font-light text-foreground">{course.duration} Weeks</span>
            </div>
          </div>

          {/* Action Button */}
          <Link to={`/lectures/${course._id}`} className="w-full">
            <button className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-light rounded-xl shadow-md transition-all mt-2">
              Go to Classroom
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Study
