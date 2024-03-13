import express from 'express';
import { PORT, mongoDBURL } from './config.js'
import { User } from './models/users.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello World');
});

app.post('/user', async (request, response) => {
    try {
        if (!request.body.firstName || !request.body.lastName || !request.body.email || !request.body.password) {
            return response.status(400).send('Missing required fields');
        }
        const user = new User({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password
        });
        await user.save();
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal server error');
    }
});

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Connected to database");
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })