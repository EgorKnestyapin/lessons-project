const Router = require('express');
const LessonController = require('../controllers/lesson.controller.js');

const router = new Router();

router.get('/', LessonController.getLessons);
router.post('/lessons', LessonController.createLessons);

module.exports = router;