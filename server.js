const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

mongoose.connect(
  process.env.DATABASE,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to Database...");
    }
  },
);
const app = express();
const port = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require Apis
const userRoutes = require("./routes/user");
app.use("/api", userRoutes);

const productRoutes = require("./routes/product");
app.use("/api", productRoutes);

const ownerRoutes = require("./routes/owner");
app.use("/api", ownerRoutes);

const categoryRoutes = require("./routes/category");
app.use("/api", categoryRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`));
