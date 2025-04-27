import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const users = await User.find({}).select("email userType isAdmin employeeId");
    if (users.length === 0) {
      console.log("No users found in the database.");
    } else {
      console.log("Users in database:");
      users.forEach(user => {
        console.log(user);
      });
    }
    process.exit(0);
  } catch (error) {
    console.error("Error listing users:", error);
    process.exit(1);
  }
};

listUsers();
