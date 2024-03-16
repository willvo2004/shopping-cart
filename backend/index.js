import express from 'express';
import { PORT, MONGODB_URI } from './config.js'
import { User } from './models/user.js';
import mongoose from 'mongoose';
import { getAllUsers } from './middleware/getAllUsers.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello World Beast mode activated');
});

app.use('/user', userRoute)

// get all users in the database
app.use(getAllUsers)

app.get('/user', async (request, response) => {
    console.log("Penis mode activated");
});

app.get('/user/:userid', async (request, response) => {
    try {

        const { userid } = request.params;

        const users = await User.findById(userid);
        response.status(200).send(users);
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal server error');
    }
})

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