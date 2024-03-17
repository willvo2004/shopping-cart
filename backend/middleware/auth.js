import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const userAuth = async (request, response, next) => {
    const token = request.cookies.accessToken;
    if (!token) {
        console.log(token);
        return response.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        request.user = decodedToken;
        next();
    } catch (error) {
        console.log(error);
        return response.status(401).json({ message: "Unauthorized" });
    }
}
