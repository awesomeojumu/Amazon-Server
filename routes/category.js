const router = require("express").Router();
const Category = require("../models/category");

router.post("/categories", async (req, res) => {
  try {
    let category = new Category();
    category.type = req.body.type;

    await category.save();

    res.json({
      status: true,
      message: "Category Added Successfully...",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.get("/categories", async (req, res) => {
  try {
    let categories = await Category.find();

    res.json({
      status: true,
      categories: categories,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.get("/category/:id", async (req, res) => {
  try {
    let category = await Category.findOne({ _id: req.params.id });

    res.json({
      status: true,
      category: category,
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});

router.put("/category/:id", async (req, res) => {
  try {
    let category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          type: req.body.type,
        },
      },
      { upsert: true },
    );

    res.json({
      status: true,
      updatedProduct: category,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.delete("/category/:id", async (req, res) => {
  try {
    let category = await Category.findOneAndDelete({ _id: req.params.id });

    res.json({
      status: true,
      deletedProduct: category,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
