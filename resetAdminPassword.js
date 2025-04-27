import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const newPassword = "admin123";
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const adminUser = await User.findOne({ employeeId: "admin001" });
    if (!adminUser) {
      console.log("Admin user not found");
      process.exit(1);
    }

    adminUser.password = hashedPassword;
    await adminUser.save();

    console.log("Admin password reset successfully to 'admin123'");
    process.exit(0);
  } catch (error) {
    console.error("Error resetting admin password:", error);
    process.exit(1);
  }
};

resetAdminPassword();
