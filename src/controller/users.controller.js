const express = require("express");

const path = require("path");

const User = require("../model/user.model");

const router = express.Router();

const transporter = require("../configs/mail");

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pagesize || 20;

    const skip = (page - 1) * pageSize;
    const user = await User.find().skip(skip).limit(pageSize).lean().exec();
    const totalPages = Math.ceil(
      (await User.find().countDocuments()) / pageSize
    );
    return res.status(200).send({ user, totalPages });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    transporter.sendMail({
      from: "'Admin' <admim@admin.com>",
      to: user.email,
      subject: "your account is successfully created",
      text: `Hi ${user.firstName} Please confirm your email address `,
      alternatives: [
        {
          contentType: "text/html",
          path: path.join(__dirname, "../mailers/user-creation.html"),
        },
      ],
    });
    return res.status(200).send({ message: "User created Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
