import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI || " ";

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(mongoUri);
    console.log(`DB connection is established `);
    return connection;
  } catch (e) {
    console.error(
      `database connection failed => ${JSON.stringify({ mongoUri: mongoUri, error: e })}`,
    );
    process.exit(1);
  }
};

export default dbConnection;
