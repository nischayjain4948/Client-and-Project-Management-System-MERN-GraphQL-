const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Local MongoDB connected on default port 27017`.cyan.underline.bold);


    }
    catch (error) {
        console.error("error while connect the mongo! ", error);
    }



}

module.exports = connectDB;