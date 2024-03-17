import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productID: {
        type: Number,
        required: true,
        unique: true
    },
});