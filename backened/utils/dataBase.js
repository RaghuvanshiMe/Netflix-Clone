import mongoose from 'mongoose';

const databaseconnection = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ MongoDb is connected");
    } catch (error) {
        console.error("❌ MongoDb connection error:", error);
    }
}

export default databaseconnection;
