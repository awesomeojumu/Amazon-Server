const router = require("express").Router();
const User = require("../models/user");

router.post("/users", async (req, res) => {
  try {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    await user.save();

    res.json({
      status: true,
      message: "User Saved...",
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    let users = await User.find();

    res.json({
      status: true,
      users: users,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });

    res.json({
      status: true,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { upsert: true },
    );

    res.json({
      status: true,
      updatedProduct: user,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    let user = await User.findOneAndDelete({ _id: req.params.id });

    res.json({
      status: true,
      deletedProduct: user,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
