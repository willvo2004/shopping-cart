import { User } from "../models/user.js";

export const userLogin = async (request, response, next) => {
    const {email, password} = request.body;

    try {
        const user = await User.findOne({email, password});
        
        if (!user) {
            return response.status(401).json({ message: "Invalid email or password" });
        }

        else if (user.password !== password) {
            return response.status(401).json({ message: "Invalid email or password" });
        }

        else {
            response.status(200).json({ message: "Login successful" });
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ message: "Internal server error" });
    }
}

export const userRegister = async (request, response, next) => {
    try {
        if (!request.body.email || !request.body.password || !request.body.birthdate || !request.body.postalCode) {
            return response.status(400).send('Missing required fields');
        }
        const user = new User({
            email: request.body.email,
            password: request.body.password,
            birthdate: request.body.birthdate,
            postalCode: request.body.postalCode
        });
        await user.save();
        response.status(201).send('User created'); // response form the server 
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal server error');
    }
}