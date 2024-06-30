const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const authRouter = require('./routes/authRoutes.js');
const profileRouter = require('./routes/profileRoutes.js');
const projectRouter = require('./routes/projectRoutes.js');
const {
    userLogoutController
} = require('./controllers/authController.js');

const app = express();


dotenv.config();

app.use(express.json({
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
}));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
}));

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log(error));

app.get('/', userLogoutController);
app.use('/auth', authRouter);
app.use('/user', profileRouter);
app.use('/user/:id', projectRouter);


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));