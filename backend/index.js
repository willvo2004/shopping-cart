import express from 'express';
import { PORT, MONGODB_URI } from './config.js'
import { User } from './models/user.js';
import mongoose from 'mongoose';
import { getAllUsers } from './middleware/getAllUsers.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello World Beast mode activated');
});

app.use('/user', userRoute)

// get all users in the database
app.use(getAllUsers);

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to database");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })