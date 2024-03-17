import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
export const userLogin = async (request, response, next) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return response
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return response
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3h" }
    );
    response.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
    
    response.status(200).json({ message: "Login successful"});
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const userRegister = async (request, response, next) => {
  try {
    if (
      !request.body.email ||
      !request.body.password ||
      !request.body.birthdate ||
      !request.body.postalCode
    ) {
      return response.status(400).send("Missing required fields");
    }
    const hash = bcrypt.hashSync(request.body.password, 10);

    const user = new User({
      email: request.body.email,
      password: hash,
      birthdate: request.body.birthdate,
      postalCode: request.body.postalCode,
    });
    await user.save();
    response.status(201).send("User created"); // response form the server
  } catch (error) {
    console.log(error);
    response.status(500).send("Internal server error");
  }
};

export const userLogout = async (request, response, next) => {
  response.clearCookie("accessToken");
  response.status(200).send("Logged out");
};

