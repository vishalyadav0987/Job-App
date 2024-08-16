const express = require('express');
const app = express()
const connectDB = require('./connectDB/connect');
require('dotenv').config();
// const PORT = process.env.PORT || 5000;
const PORT = 3000 || 5000;
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes')
const companyRoutes = require('./routes/companyRoutes')
const jobRoutes = require('./routes/jobRoutes')

app.use(express.json({ limit: "50mb" }));// parse payload data
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser())


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);



app.get('/test', (req, res) => {
    res.send("This test route for testing purpose.");
});



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