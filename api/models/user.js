const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Name = new Schema({
  firstName: {
    type: String,
    default: null
  },
  lastName: {
    type: String,
    default: null
  }
}, {
  _id: false
});

const UserSchema = new Schema({
  name: Name,
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;