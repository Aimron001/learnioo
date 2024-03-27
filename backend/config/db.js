import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MongoDB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB