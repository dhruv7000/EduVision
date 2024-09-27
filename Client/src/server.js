const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 7000;

const SecretKey = process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");

mongoose.connect("mongodb://127.0.0.1:27017/majorDB")
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((err) => {
    console.error("Database Connection Error:", err);
  });

const UserSchema = new mongoose.Schema({
  userID: Number,
  userName: String,
  email: String,
  password: String,
  confirmPassword: String,
  photo: String,
  photoUrlname: String,
  phone: Number,
  age: Number,
  country: String,
  state: String,
  city: String,
  pincode: Number
}, { collection: 'Users' });

const Users = mongoose.model("Users", UserSchema);

app.post("/api/register", async (req, res) => {

  const { userName, email, password, confirmPassword, photo, phone, age, country, state, city, pincode } = req.body;

  if (!userName || !email || !password || !confirmPassword || !photo || !phone || !age || !country || !state || !city || !pincode) {
    return res.status(400).send("All fields are required");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const existingUsername = await Users.findOne({ userName });
    const existingEmail = await Users.findOne({ email });

    if (existingUsername) {
      return res.status(400).send("Username already taken");
    }
    if (existingEmail) {
      return res.status(400).send("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new Users({
      userName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      photo,
      phone,
      age,
      country,
      state,
      city,
      pincode
    });
    await userData.save();
    return res.status(200).send("Register successful");
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).send("Register failed due to server error");
  }
});

app.post('/api/login', async (req, res) => {
  const { userName, password } = req.body;
  console.log("Login request received:", { userName, password });

  if (!userName || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const user = await Users.findOne({ userName });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("Invalid username or password");
    }

    const token = jwt.sign({ userId: user._id, userName: user.userName }, SecretKey, { expiresIn: '10m' });

    res.json({ result: user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Login failed due to server error");
  }
});

app.put('/api/updateProfile', async (req, res) => {
  const { _id, userName, email, phone, age, country, state, city, pincode, photo } = req.body;

  if (!_id || !userName || !email || !phone || !age || !country || !state || !city || !pincode) {
    return res.status(400).send("All fields are required");
  }

  try {
    const updatedUser = await Users.findByIdAndUpdate(
      _id,
      { userName, email, phone, age, country, state, city, pincode, photo },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).send("Failed to update profile due to server error");
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
