import mongoose from "mongoose";

const viewProductSchema = new mongoose.Schema({
    productID: {
        type: Number,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        ref: "User",
        required: true,
    }
});

export const ViewProduct = mongoose.model("ViewProduct", viewProductSchema);
// will represent items that have been recently viewed by a user