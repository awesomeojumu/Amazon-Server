const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
});

module.exports = mongoose.model("User", UserSchema);
