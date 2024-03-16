import { User } from '../models/user.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
    next();
}