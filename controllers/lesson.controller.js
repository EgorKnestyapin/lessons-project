const db = require('../db.js');

class LessonController {

    async getLessons(req, res) {
        try {
            const date = req.query.date;
            const status = req.query.status;
            const teacherIds = req.query.teacherIds;
            const studentsCount = req.query.studentsCount;
            let page = req.query.page || 0;
            let lessonsPerPage = req.query.lessonsPerPage || 5;
            let request = `SELECT lessons.id, (date::timestamp at time zone 'UTC' AT TIME ZONE 'Europe/Moscow') as date, title, status, count(distinct students.id) as visitCount,
            COALESCE (json_agg(distinct jsonb_build_object('id',students.id, 'name',students.name, 'visit',true)) filter(where students.id is not null), '[]'::json) as students, 
            COALESCE (json_agg(distinct jsonb_build_object('id',teachers.id, 'name',teachers.name)) filter(where teachers.id is not null), '[]'::json) as teachers 
            FROM lessons LEFT JOIN "lesson_teachers" lessonTeacher ON lessonTeacher.lesson_id = lessons.id LEFT JOIN teachers ON teachers.id = lessonTeacher.teacher_id
            LEFT JOIN "lesson_students" lessonStudent ON lessonStudent.lesson_id = lessons.id LEFT JOIN students ON students.id = lessonStudent.student_id WHERE true`;

            if (date) {
                const dateArr = date.split(',');
                if (dateArr.length == 1) request += ` AND date IN ('${dateArr}')`;
                else if (dateArr.length == 2) request += ` AND CAST(date AS date) BETWEEN '${dateArr[0]}' AND '${dateArr[1]}'`;
            }

            if (status) {
                request += ` AND status IN ('${status}')`;
            }

            if (teacherIds) {
                request += ` AND teachers.id IN (${teacherIds})`;
            }

            if (studentsCount) {
                request += ` GROUP BY lessons.id`
                const studentsCountArr = studentsCount.split(',');
                if (studentsCountArr.length == 1) request += ` HAVING count(distinct students.id) IN ('${studentsCount}')`;
                else if (studentsCountArr.length == 2) {
                    request += ` HAVING ${studentsCountArr[0]} <= count(distinct students.id) AND count(distinct students.id) <= ${studentsCountArr[1]}`;
                }
            }

            if (!studentsCount) request += ` GROUP BY lessons.id`
            request += ' ORDER BY lessons.id'

            if (page) {
                page -= 1;
                page *= lessonsPerPage;
            }

            request += ` OFFSET ${page} LIMIT ${lessonsPerPage}`
            console.log(request);
            const lessons = await db.query(request);

            if (lessons.rowCount) {
                res.send(lessons.rows)
            } else {
                res.status(400).send('Не найдено занятий с выбранными критериями')
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async createLessons(req, res) {

    }
}

module.exports = new LessonController();