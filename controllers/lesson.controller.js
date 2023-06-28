const db = require('../db.js');

class LessonController {

    /**
     * Получение занятий
     * 
     * @param {*} req запрос
     * @param {*} res ответ
     */
    async getLessons(req, res) {
        try {
            const date = req.query.date;
            const status = req.query.status;
            const teacherIds = req.query.teacherIds;
            const studentsCount = req.query.studentsCount;
            let page = req.query.page || 0;
            let lessonsPerPage = req.query.lessonsPerPage || 5;

            // Из-за того, что при создании таблицы lessons был неправильно указан тип колонки даты(нужно без timezone), приходится подгонять дату под правильный регион
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
                res.status(400).json({message: 'Не найдено занятий с выбранными критериями'});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    /**
     * Создание занятий
     * 
     * @param {*} req запрос
     * @param {*} res ответ
     */
    async createLessons(req, res) {
        try {
            const teacherIds = req.body.teacherIds;
            const title = req.body.title;
            const days = req.body.days;
            const firstDate = req.body.firstDate;
            let lastDate = req.body.lastDate;
            let lessonsCount = req.body.lessonsCount;
            let leapYear = new Date(firstDate).getFullYear() % 4 == 0 ? true : false;
            let daysInYear = leapYear? 366 : 365;

            let weekNum = 0;
            let insertLessonsValue = [];
            let insertLessonTeachersValue = [];
            let insertLessonTeachersRequest = `INSERT INTO lesson_teachers (lesson_id, teacher_id) VALUES`
            let insertLessonsRequest = `INSERT INTO lessons (date, title, status) VALUES`;

            const dayOfWeekReq = await db.query(`SELECT extract(dow from date '${firstDate}')`);
            const extractDayOfWeek = dayOfWeekReq.rows[0].extract;

            // Из-за того, что при создании таблицы lessons был неправильно указан тип колонки даты(нужно без timezone), приходится подгонять дату под правильный регион
            const dateWeekBeginningReq = await db.query(`SELECT (DATE '${firstDate}' - ${extractDayOfWeek})::timestamp at time zone 'UTC' AT TIME ZONE 'Europe/Moscow' as date`);
            const dateWeekBeginningDate = dateWeekBeginningReq.rows[0].date;
            let stop = false;

            while (!stop) {
                days.forEach(day => {
                    let newDate = addDays(dateWeekBeginningDate, day + weekNum*7);
                    if (!weekNum && day < extractDayOfWeek) {
                        return;
                    }
                    if (lessonsCount == 0 || insertLessonsValue.length == 300 || (lastDate && newDate.getTime() > new Date(lastDate).getTime()) ||
                    (newDate.getTime() > addDays(firstDate, daysInYear).getTime())) {
                        stop = true;
                        return;
                    }
                    insertLessonsValue.push(` (DATE '${newDate.toISOString()}', '${title}', 0)`);
                    lessonsCount -= 1;
            });
                weekNum += 1;
            }

            console.log(insertLessonsValue);
            insertLessonsRequest += insertLessonsValue.join(',') + 'RETURNING id';
            console.log(insertLessonsRequest);
            const lessonIds = await db.query(insertLessonsRequest)
            console.log(lessonIds.rows);
            
            lessonIds.rows.forEach(lesson => {
                teacherIds.forEach(teacherId => {
                    insertLessonTeachersValue.push(` (${lesson.id}, ${teacherId})`);
                });
            });
            
            console.log(insertLessonTeachersValue);
            insertLessonTeachersRequest += insertLessonTeachersValue.join(',');
            await db.query(insertLessonTeachersRequest);
            
            res.send(lessonIds.rows);
        } catch (error) {
            res.status(400).json(error);
        }

        function addDays(date, days) {
            let result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
    }
}

module.exports = new LessonController();