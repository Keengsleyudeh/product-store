import mongoose from "mongoose";

//create schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Product = mongoose.model("Product", productSchema);
// Export the Product model so it can be used in other parts of the application

export default Product;