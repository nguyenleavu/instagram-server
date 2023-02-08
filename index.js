const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const rootRouter = require('./routers');
cors = require('cors');

const app = express();

// cors
app.use(cors());

// use Json
app.use(express.json());

// static files
app.use('/public', express.static(path.join(__dirname, './public')));

// router
app.use('/api', rootRouter);

// port
const port = process.env.PORT || 4000;

app.listen(port, async () => {
    console.log(`http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
