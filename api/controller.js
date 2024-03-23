const userController = {};
const User = require("./../database/models/user");
const Chat = require("./../database/models/chat");
const jwt = require("jsonwebtoken");

userController.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let findUser = await User.findOne({ email: email }).exec();

    if (!findUser) {
      return res.status(400).json({
        status: false,
        message: "User not found.",
      });
    }

    if (!(findUser.password === password)) {
      return res.status(400).json({
        status: false,
        message: "Password is wrong.",
      });
    }

    const token = jwt.sign({ id: findUser._id }, "supersecret", {
      expiresIn: "1h",
    });
    findUser.password = undefined;
    return res.status(200).json({
      status: true,
      message: "Login successfully",
      data: findUser,
      token,
    });
  } catch (error) {
    console.log(error, "error>>>>..");
    return res.status(500).json({
      status: false,
      message: "Internal server exception",
    });
  }
};

userController.register = async (req, res) => {
  try {
    let { email, password } = req.body;
    let findUser = await User.findOne({ email: email }).exec();

    if (findUser) {
      return res.status(400).json({
        status: false,
        message: "User Already exist",
      });
    }

    let user = await User.create({ email, password });
    const token = jwt.sign({ id: user._id }, "supersecret", {
      expiresIn: "1h",
    });
    user.password = undefined;
    console.log(user, "user");
    return res.status(200).json({
      status: true,
      message: "Login successfully",
      data: user,
      token,
    });
  } catch (error) {
    console.log(error, "error>>.");
    return res.status(500).json({
      status: false,
      message: "Internal server exception",
    });
  }
};

userController.saveMessage = async (req, res) => {
  try {
    let { message, receiverId, senderId } = req.body;

    let saveMessage = await Chat.create({ message, receiverId, senderId });

    return res.status(200).json({
      status: true,
      message: "Saved message",
      data: saveMessage,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server exception",
    });
  }
};

userController.getMessage = async (req, res) => {
  try {
    let getMessage = await Chat.find({ }).sort({ createdAt : 1 }).exec();
    return res.status(200).json({
      status: true,
      message: "Get message",
      data: getMessage,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server exception",
    });
  }
};
module.exports = userController;
