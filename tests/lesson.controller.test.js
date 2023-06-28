const request = require('supertest')
const app = require('../index.js')

describe('/', () => {

    test('Should return 200 and 5 (amount by default) lessons', async () => {
        const lessons = [
            {
                "id": 1,
                "date": "2019-09-01T00:00:00.000Z",
                "title": "Green Color",
                "status": 1,
                "visitcount": "3",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    },
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 2,
                "date": "2019-09-02T00:00:00.000Z",
                "title": "Red Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    },
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            },
            {
                "id": 3,
                "date": "2019-09-03T00:00:00.000Z",
                "title": "Orange Color",
                "status": 1,
                "visitcount": "0",
                "students": [],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 4,
                "date": "2019-09-04T00:00:00.000Z",
                "title": "Blue Color",
                "status": 1,
                "visitcount": "4",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            },
            {
                "id": 5,
                "date": "2019-05-10T00:00:00.000Z",
                "title": "Purple Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ],
                "teachers": []
            }
        ]
        await request(app)
            .get('/')
            .expect(200)
            .then((r) => {
                expect(r.body).toMatchObject(lessons);
                expect(r.body).toHaveLength(5);
            })
    })
})

describe('/?date={date}', () => {

    test('Should return 200 and filtered lesson by one date /?date=2019-09-02', async () => {
        const lesson = [
            {
                "id": 2,
                "date": "2019-09-02T00:00:00.000Z",
                "title": "Red Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    },
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            }
        ]
        await request(app)
            .get('/?date=2019-09-02')
            .expect(200)
            .then((r) => {
                expect(r.body).toMatchObject(lesson);
            })
    })

    test('Should return 200 and filtered lesson by two dates /?date=2019-09-01,2019-09-03', async () => {
        const lessons = [
            {
                "id": 1,
                "date": "2019-09-01T00:00:00.000Z",
                "title": "Green Color",
                "status": 1,
                "visitcount": "3",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    },
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 2,
                "date": "2019-09-02T00:00:00.000Z",
                "title": "Red Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    },
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            },
            {
                "id": 3,
                "date": "2019-09-03T00:00:00.000Z",
                "title": "Orange Color",
                "status": 1,
                "visitcount": "0",
                "students": [],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            }
        ]
        await request(app)
            .get('/?date=2019-09-01,2019-09-03')
            .expect(200)
            .then((r) => {
                expect(r.body).toMatchObject(lessons);
            })  
    })

    test('Should return 400 and exception message by non-existing date /?date=2025-02-05', async () => {
        const message = {
            "message": "Не найдено занятий с выбранными критериями"
        }
        await request(app)
            .get('/?date=2025-02-05')
            .expect(400)
            .then((r) => {
                expect(r.body).toMatchObject(message);
            })  
    })
})

describe('/?status={number}', () => {

    test('Should return 200 and filtered lessons by status /?status=1', async () => {
        const lessons = [
            {
                "id": 1,
                "date": "2019-09-01T00:00:00.000Z",
                "title": "Green Color",
                "status": 1,
                "visitcount": "3",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    },
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 3,
                "date": "2019-09-03T00:00:00.000Z",
                "title": "Orange Color",
                "status": 1,
                "visitcount": "0",
                "students": [],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 4,
                "date": "2019-09-04T00:00:00.000Z",
                "title": "Blue Color",
                "status": 1,
                "visitcount": "4",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            },
            {
                "id": 6,
                "date": "2019-05-15T00:00:00.000Z",
                "title": "Red Color",
                "status": 1,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 8,
                "date": "2019-06-17T00:00:00.000Z",
                "title": "Black Color",
                "status": 1,
                "visitcount": "3",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 2,
                        "name": "Marina"
                    },
                    {
                        "id": 3,
                        "name": "Angelina"
                    },
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            }
        ]
        await request(app)
            .get('/?status=1')
            .expect(200)
            .then((r) => {
                expect(r.body).toMatchObject(lessons);
            })  
    })
})

describe('/?teacherIds={number}', () => {

    test('Should return 200 and filtered lessons by teacherIds /?teacherIds=3,4', async () => {
        const lessons = [
            {
                "id": 1,
                "date": "2019-09-01T00:00:00.000Z",
                "title": "Green Color",
                "status": 1,
                "visitcount": "3",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 2,
                "date": "2019-09-02T00:00:00.000Z",
                "title": "Red Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            },
            {
                "id": 3,
                "date": "2019-09-03T00:00:00.000Z",
                "title": "Orange Color",
                "status": 1,
                "visitcount": "0",
                "students": [],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 4,
                "date": "2019-09-04T00:00:00.000Z",
                "title": "Blue Color",
                "status": 1,
                "visitcount": "4",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            },
            {
                "id": 6,
                "date": "2019-05-15T00:00:00.000Z",
                "title": "Red Color",
                "status": 1,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            }
        ]
        await request(app)
            .get('/?teacherIds=3,4')
            .expect(200)
            .then((r) => {
                expect(r.body).toMatchObject(lessons);
            })  
    })

    test('Should return 400 and exception message /?teacherIds=7,8,9', async () => {
        const message = {
            "message": "Не найдено занятий с выбранными критериями"
        }
        await request(app)
            .get('/?teacherIds=7,8,9')
            .expect(400)
            .then((r) => {
                expect(r.body).toMatchObject(message);
            })  
    })
})

describe('/?studentsCount={number}', () => {

    test('Should return 200 and filtered lessons by one number studentsCount /?studentsCount=2', async () => {
        const lessons = [
            {
                "id": 2,
                "date": "2019-09-02T00:00:00.000Z",
                "title": "Red Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    },
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            },
            {
                "id": 5,
                "date": "2019-05-10T00:00:00.000Z",
                "title": "Purple Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ],
                "teachers": []
            },
            {
                "id": 6,
                "date": "2019-05-15T00:00:00.000Z",
                "title": "Red Color",
                "status": 1,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 7,
                "date": "2019-06-17T00:00:00.000Z",
                "title": "White Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    }
                ]
            },
            {
                "id": 10,
                "date": "2019-06-24T00:00:00.000Z",
                "title": "Brown Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            }
        ]
        await request(app)
            .get('/?studentsCount=2')
            .expect(200)
            .then((r) => {
                expect(r.body).toMatchObject(lessons);
            })  
    })

    test('Should return 200 and filtered lessons by two numbers studentsCount /?studentsCount=2,3', async () => {
        const lessons = [
            {
                "id": 1,
                "date": "2019-09-01T00:00:00.000Z",
                "title": "Green Color",
                "status": 1,
                "visitcount": "3",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    },
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 2,
                "date": "2019-09-02T00:00:00.000Z",
                "title": "Red Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    },
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            },
            {
                "id": 5,
                "date": "2019-05-10T00:00:00.000Z",
                "title": "Purple Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ],
                "teachers": []
            },
            {
                "id": 6,
                "date": "2019-05-15T00:00:00.000Z",
                "title": "Red Color",
                "status": 1,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 7,
                "date": "2019-06-17T00:00:00.000Z",
                "title": "White Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    }
                ]
            }
        ]
        await request(app)
            .get('/?studentsCount=2,3')
            .expect(200)
            .then((r) => {
                expect(r.body).toMatchObject(lessons);
            })  
    })
})

describe('/?date=2019-09-02&status=0&teahcerIds=1&studentsCount=2', () => {

    test('Should return 200 and filtered lessons by page number and by lessonsPerPage number', async () => {
        const lesson = [
            {
                "id": 2,
                "date": "2019-09-02T00:00:00.000Z",
                "title": "Red Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    },
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            }
        ]
        await request(app)
            .get('/?date=2019-09-02&status=0&teahcerIds=1&studentsCount=2')
            .expect(200)
            .then((r) => {
                expect(r.body).toMatchObject(lesson);
            })  
    })
})

describe('/?page={number}', () => {

    test('Should return 200 and filtered lessons by page number /?page=2', async () => {
        const lessons = [
            {
                "id": 6,
                "date": "2019-05-15T00:00:00.000Z",
                "title": "Red Color",
                "status": 1,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 7,
                "date": "2019-06-17T00:00:00.000Z",
                "title": "White Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    }
                ]
            },
            {
                "id": 8,
                "date": "2019-06-17T00:00:00.000Z",
                "title": "Black Color",
                "status": 1,
                "visitcount": "3",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 2,
                        "name": "Marina"
                    },
                    {
                        "id": 3,
                        "name": "Angelina"
                    },
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            },
            {
                "id": 9,
                "date": "2019-06-20T00:00:00.000Z",
                "title": "Yellow Color",
                "status": 1,
                "visitcount": "1",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 10,
                "date": "2019-06-24T00:00:00.000Z",
                "title": "Brown Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            }
        ]
        await request(app)
            .get('/?page=2')
            .expect(200)
            .then((r) => {
                expect(r.body).toMatchObject(lessons);
            })  
    })
})

describe('/?lessonsPerPage={number}&page={number}', () => {

    test('Should return 200 and filtered lessons by page number and by lessonsPerPage number /?lessonsPerPage=4&page=2', async () => {
        const lessons = [
            {
                "id": 5,
                "date": "2019-05-10T00:00:00.000Z",
                "title": "Purple Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ],
                "teachers": []
            },
            {
                "id": 6,
                "date": "2019-05-15T00:00:00.000Z",
                "title": "Red Color",
                "status": 1,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 3,
                        "name": "Angelina"
                    }
                ]
            },
            {
                "id": 7,
                "date": "2019-06-17T00:00:00.000Z",
                "title": "White Color",
                "status": 0,
                "visitcount": "2",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 1,
                        "name": "Sveta"
                    }
                ]
            },
            {
                "id": 8,
                "date": "2019-06-17T00:00:00.000Z",
                "title": "Black Color",
                "status": 1,
                "visitcount": "3",
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ],
                "teachers": [
                    {
                        "id": 2,
                        "name": "Marina"
                    },
                    {
                        "id": 3,
                        "name": "Angelina"
                    },
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ]
            }
        ]
        await request(app)
            .get('/?lessonsPerPage=4&page=2')
            .expect(200)
            .then((r) => {
                expect(r.body).toMatchObject(lessons);
            })  
    })
})