import express from 'express'
import { getAllCourses, getAllLectures, getSingleCourse, getSingleLecture, updateProgress, getProgress } from '../controller/coursesController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router()

router.get('/all' , getAllCourses)
router.get('/lectures/:id' , isAuth , getAllLectures)
router.get('/lecture/:id' , isAuth , getSingleLecture)

router.post('/progress', isAuth, updateProgress);
router.get('/:id/progress', isAuth, getProgress);

router.get('/:id' , getSingleCourse)

export default router;