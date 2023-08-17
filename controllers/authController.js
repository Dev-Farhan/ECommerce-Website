import chalk from "chalk";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHepler.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validation
    if ((!name, !email, !password, !phone, !address, !answer)) {
      return res.send({ message: "All Field IS Mandatrory " });
    }
    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register Please Login ",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register SUccessfully",
      user,
    });
  } catch (error) {
    console.log(chalk.bgRed, error);
    res.send(500).send({
      success: false,
      message: "Error in Registerion",
      error,
    });
  }
};

//POST login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        meassage: "Invalid Email & Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        meassage: "Email is not Registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        meassage: "Invalid Password",
      });
    }
    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(chalk.bgRed, error);
    res.send(500).send({
      success: false,
      message: "Error in Registerion",
      error,
    });
  }
};

//forget password
export const forgetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if ((!email, !answer, !newPassword)) {
      res.status(400).send({
        message: "All Field is Mandatory",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(404).send({
        message: "Wrong Email & Password",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
};
//test user -auth
export const testController = async (req, res) => {
  //   console.log("Protected Route");
  res.send("Protected Route");
};
