const express = require('express');
const router = require('./routes/lesson.router.js');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/', router);
app.use('/lessons', router);

async function startApp() {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
    } catch (error) {
        console.log(error);
    }
}

startApp();