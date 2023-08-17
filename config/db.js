import chalk from "chalk";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      chalk.bgGreen`Connected To MOngoDB Database ${conn.connection.host}`
    );
  } catch (error) {
    console.log(chalk.bgRed`Error in MongoDB ${error}`);
  }
};
