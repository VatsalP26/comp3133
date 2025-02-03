const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  address: {
    building: String,
    street: String,
    zipcode: String,
  },
  city: { type: String, required: true },
  cuisine: { type: String, required: true },
  name: { type: String, required: true },
  restaurant_id: { type: String, required: true },
},{
    collection: "Restaurants"
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);