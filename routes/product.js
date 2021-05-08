const router = require("express").Router();
const Product = require("../models/product");
const upload = require("../middleware/upload-photo");

router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    console.log(upload);
    let product = new Product();
    product.owner = req.body.owner;
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;
    product.ownerID = req.body.ownerID;
    product.categoryID = req.body.categoryID;

    await product.save();

    console.log(product);

    res.json({
      status: true,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(error).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();

    res.json({
      status: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });

    res.json({
      status: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.put("/product/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          photo: req.file.location,
          price: req.body.price,
          stockQuantity: req.body.stockQuantity,
          rating: req.body.rating,
          owner: req.body.ownerID,
          category: req.body.categoryID,
        },
      },
      { upsert: true },
    );

    res.json({
      status: true,
      product: product,
      updatedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndDelete({ _id: req.params.id });

    res.json({
      status: true,
      deletedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
