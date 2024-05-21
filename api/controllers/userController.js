const mongoose = require("mongoose");
const User = require("../models/user");

// Middleware
const { hashPassword } = require("../utils/authUtils");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    return res.status(200).json({users: users});
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve users from the database." });
  }
}

exports.newUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user) {
      return res.status(404).json({ error: "No user information provided." });
    }

    if (!(user.name.firstName && user.name.lastName)) {
      return res.status(409).json({ error: "Your name needs to be complete." });
    }
    
    const userDB = await User.findOne({
      email: user.email
    });

    if (userDB) {
      return res.status(409).json({ error: `User with an email of ${user.email} already exists.` });
    }

    const hashedPassword = hashPassword(user.password);

    const newUser = await User.create({
      ...user,
      password: hashedPassword
    });

    return res.status(200).json({ user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create a new user." });
  }
}

exports.findUserById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({ error: "No user ID provided." });
    }
    
    const userDB = await User.findById(id, "-password");

    return res.status(200).json({ user: userDB });
  } catch (error) {
    return res.status(500).json({ error: "Failed to find user in the database." });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { user } = req.body;
    const id = req.params.id;

    if (!user) {
      return res.status(404).json({ error: "No user information provided." });
    }

    const userDB = await User.findById(id);

    if (!userDB) {
      return res.status(404).json({ error: "User does not exists." });
    }
    
    const updateFields = {
      "name.firstName": user.name.firstName || userDB.name.firstName,
      "name.lastName": user.name.lastName || userDB.name.lastName,
      email: user.email || userDB.email,
      password: userDB.password,
    };

    const filteredUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([key, value]) => value !== undefined)
    );

    if (Object.keys(filteredUpdateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      filteredUpdateFields,
      { new: true }
    );

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user in the database." });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const userDB = await User.findById(id);
    
    if (!userDB) {
      return res.status(404).json({ error: "User does not exists." });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({ msg: "Successfully deleted user." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete user in the database." });
  }
}