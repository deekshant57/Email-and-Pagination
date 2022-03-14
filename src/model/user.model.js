const mongoose = require("mongoose");

// creating model

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
