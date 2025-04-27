import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const checkAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const adminUser = await User.findOne({ isAdmin: true }).select("-password");
    if (!adminUser) {
      console.log("No admin user found");
    } else {
      console.log("Admin user details:", adminUser);
    }
    process.exit(0);
  } catch (error) {
    console.error("Error fetching admin user:", error);
    process.exit(1);
  }
};

checkAdminUser();
