# lessons-project
Запуск сервера с nodemon - npm run dev. Сервер запускается на порте 5000
Запуск тестов - npm test

В проекте имеется два эндпоинта - '/'(корневой) и '/lessons'.
По '/' при указании query параметров возвращаются отфильтрованные занятия, по '/lessons' можно создать новые занятия.
Query параметры: '/?date=', '/?status=', '/?teacherIds=', '/?studentsCount=', пагинация '/?page=', '/?lessonsPerPage='
Пример json тела для создания занятий:
{
    "teacherIds": [1,2],
    "title": "Cool lesson",
    "days": [1],
    "firstDate": "2016-01-22",
    // "lessonsCount": 4 либо lastDate, либо lessonsCount
    "lastDate": "2016-02-15"
}
