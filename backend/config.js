import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGOLAB_URI;

console.log(PORT, MONGODB_URI);