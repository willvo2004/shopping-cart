import { ViewProduct } from "../models/viewProduct.js";

export const trackViewed = async (request, response, next) => {
    const { productID, productImage } = request.body;
    const userID = request.user;
    const viewedProducts = await ViewProduct.findOne({ productID, productImage, userID })
    if (viewedProducts) {
        console.log(viewedProducts);
        return response.status(400).json({ message: "Product already viewed" });
    }
    try {
        const viewProduct = new ViewProduct({
            productID,
            productImage,
            userID
        });
        await viewProduct.save();
        response.status(200).json({ message: "Product viewed" });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Internal server error" });
    }
}

export const getViewedProducts = async (request, response, next) => {
    const userID = request.user;
    try {
        const viewedProducts = await ViewProduct.find({ userID });
        response.status(200).json(viewedProducts);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ message: "Internal server error" });
    }   
}