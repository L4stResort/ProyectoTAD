const mongoose = require("mongoose");

const UserHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: String,
  products: [
    {
      _id: String,
      name: String,
      price: Number,
      image: String,
      category: String,
    }
  ],
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cardType: String,
  cardNumber: String,
});

module.exports = mongoose.model("UserHistory", UserHistorySchema);