import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


app.use(express.json());

app.use("/api/products", productRoute);

app.use("/api/user", userRoute);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));   
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port 5000 kings');
});
