
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("😀😀😀😀😀😀 Outlook database connected 😀😀😀😀😀😀");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

module.exports = { connectToMongo };
