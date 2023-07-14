import mongoose from "mongoose";
import colors from "colors";

const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology:true,
        useNewUrlParser: true
    });
    console.log(`connection mongodb database at ${conn.connection.host}`);
  } catch (error) {
    console.log(`Errors in MongoDb  ${error}`.bgRed.white);
  }
};

export default connectDB;
