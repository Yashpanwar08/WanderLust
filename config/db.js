const mongoose = require("mongoose");

async function connectDB() {
    try {

        console.log("DB_URL:", process.env.DB_URL);

        await mongoose.connect(process.env.DB_URL);

        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Error");
        console.error(err);

        process.exit(1);
    }
}

module.exports = connectDB;