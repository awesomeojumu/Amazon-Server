const router = require("express").Router();
const Owner = require("../models/owner");
const upload = require("../middleware/upload-photo");

router.post("/owners", upload.single("photo"), async (req, res) => {
  try {
    let owner = new Owner();
    owner.name = req.body.name;
    owner.photo = req.body.photo;
    owner.about = req.body.about;

    await owner.save();

    res.json({
      status: true,
      message: "Owner Saved...",
    });
  } catch (err) {
    res.json({
      status: false,
      details: "Something went wrong",
      message: err.message,
    });
  }
});

router.get("/owners/", async (req, res) => {
  try {
    let owner = await Owner.find();

    res.json({
      status: true,
      owner: owner,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.get("/owner/:id", async (req, res) => {
  try {
    let owner = await Owner.findOne({ _id: req.params.id });

    res.json({
      status: true,
      owner: owner,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.put("/owner/:id", async (req, res) => {
  try {
    let owner = await Owner.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          about: req.body.about,
          photo: req.body.photo,
        },
      },
      { upsert: true },
    );

    res.json({
      status: true,
      updatedProduct: owner,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.delete("/owner/:id", async (req, res) => {
  try {
    let owner = await Owner.findOneAndDelete({ _id: req.params.id });

    res.json({
      status: true,
      deletedProduct: owner,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
