import { Courses } from "../models/courses.js"
import { Lecture } from "../models/lecture.js"
import { User } from "../models/userModel.js"

export const getAllCourses = async (req , res)=>{
    try{

        const courses = await Courses.find()

        res.json({
            courses, 
        })
    }catch(err){
            res.status(404).json({
                message : err.message
            })
    }
}

export const getSingleCourse =  async (req , res)=>{
    try{

        const course = await Courses.findById(req.params.id)

        res.json({
            course, 
        })
    }catch(err){
            res.status(404).json({
                message : err.message
            })
    }
}

export const getAllLectures = async  (req , res)=>{
  try{
    let  lectures = await Lecture.find({course : req.params.id})
    
    let user = await User.findById(req.user._id)

    if(user.role === "admin"){
        return res.json({lectures})
    }

    const hasPurchased = user.purchasedCourses.some(p => p.course.toString() === req.params.id);
    if (!hasPurchased && !user.subscription.includes(req.params.id)) {
        return res.status(403).json({
            message: "Access Denied. Please purchase the course to view lectures."
        });
    }

    res.json({lectures})
  }catch(err){
    res.status(404).json({
        message : err.message
    })
  }
} 


export const getSingleLecture = async (req , res)=>{
    try{
        
        const lecture = await Lecture.findById(req.params.id)

let user = await User.findById(req.user._id)

    if(user.role === "admin"){
        return res.json({lecture})
    }

    // Since a lecture is within a course, we need to find the course ID this lecture belongs to.
    const hasPurchased = user.purchasedCourses.some(p => p.course.toString() === lecture.course.toString());
    if (!hasPurchased && !user.subscription.includes(lecture.course)) {
        return res.status(403).json({
            message: "Access Denied. Please purchase the course to view this lecture."
        });
    }

    res.json({lecture})
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

export const updateProgress = async (req, res) => {
    try {
        const { courseId, lectureId } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ message: "User not found" });

        const purchasedCourseIndex = user.purchasedCourses.findIndex(
            (p) => p.course.toString() === courseId
        );

        if (purchasedCourseIndex === -1 && user.role !== "admin") {
            return res.status(403).json({ message: "You have not purchased this course." });
        }

        // If admin, we can still just return success
        if (purchasedCourseIndex === -1 && user.role === "admin") {
            return res.status(200).json({ message: "Admin access, progress bypassed." });
        }

        const courseProgress = user.purchasedCourses[purchasedCourseIndex];
        
        // Check if lecture is already in timeline
        const alreadyCompleted = courseProgress.timeline.some(t => t.lectureId === lectureId);
        if (!alreadyCompleted) {
            courseProgress.timeline.push({
                lectureId,
                completed: true,
                completedAt: new Date()
            });
        }

        // Calculate progress percentage
        const totalLectures = await Lecture.countDocuments({ course: courseId });
        const completedLectures = courseProgress.timeline.length;

        let progressPercent = 0;
        if (totalLectures > 0) {
            progressPercent = Math.round((completedLectures / totalLectures) * 100);
        }

        courseProgress.progress = progressPercent > 100 ? 100 : progressPercent;

        if (courseProgress.progress === 100) {
            courseProgress.completed = true;
            courseProgress.completedAt = new Date();
        }

        await user.save();

        res.status(200).json({
            message: "Progress updated",
            progress: courseProgress.progress,
            completed: courseProgress.completed,
            timeline: courseProgress.timeline
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getProgress = async (req, res) => {
    try {
        const { id: courseId } = req.params;
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ message: "User not found" });

        const purchasedCourse = user.purchasedCourses.find(
            (p) => p.course.toString() === courseId
        );

        if (!purchasedCourse && user.role !== "admin") {
            return res.status(403).json({ message: "You have not purchased this course." });
        }

        if (!purchasedCourse && user.role === "admin") {
            return res.status(200).json({
                progress: 100,
                completed: true,
                timeline: []
            });
        }

        res.status(200).json({
            progress: purchasedCourse.progress,
            completed: purchasedCourse.completed,
            timeline: purchasedCourse.timeline
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};