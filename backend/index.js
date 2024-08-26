const express = require('express');
const app = express()
const path = require('path')
const connectDB = require('./connectDB/connect');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const cloudinary = require('cloudinary').v2;
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes')
const companyRoutes = require('./routes/companyRoutes')
const jobRoutes = require('./routes/jobRoutes')
const applicationRoutes = require('./routes/applicationRoutes');

app.use(express.json({ limit: "50mb" }));// parse payload data
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);



app.get('/test', (req, res) => {
    res.send("This test route for testing purpose.");
});
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "..", "frontend", "dist");
    app.use(express.static(frontendPath));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(frontendPath, "index.html"))
    })
}



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("Something went wrong, Please check the Database");
    }
}

start();