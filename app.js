
const express = require('express');
const cors = require('cors')
const { connectToMongo } = require('./lib/db');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes')
const  userRoutes = require('./routes/userRoutes')
const app = express();
app.use(cors());
app.use(express.json())

// app.use('/auth', authRoutes)
app.use('/oauth', authRoutes)
app.use('/email', emailRoutes)
app.use('/api/users',userRoutes)


// http://localhost:3000/oauth/authorization
// http://localhost:3000/0auth/authorization




const port = process.env.PORT || 3000;
connectToMongo().then(() => {
    app.get("/", (req, res) => {
        res.send("Test Outlook");
    });

    app.listen(port, () => {
        console.log(`Server is Running at port : http://localhost:${port}`);
    });
}).catch(error => {
    console.error("Error connecting to MongoDB:", error);
});
