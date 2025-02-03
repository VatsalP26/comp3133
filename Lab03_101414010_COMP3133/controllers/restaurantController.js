const Restaurant = require("../models/Restaurants");

class RestaurantController {
  static async getAllRestaurants(req, res) {
    try {
      const restaurants = await Restaurant.find({});

      if (restaurants.length === 0) {
        return res.status(404).json({ error: "No restaurants found in the database." });
      }

      res.status(200).json(restaurants);
    } catch (err) {
      res.status(500).json({ error: "Unexpected error while retrieving restaurants. Please try again later." });
    }
  }

  static async getRestaurantsByCuisine(req, res) {
    try {
      const cuisine = req.params.cuisine?.trim();

      if (!cuisine) {
        return res.status(400).json({ error: "Cuisine type is required in the request URL." });
      }

      const restaurants = await Restaurant.find({ cuisine: cuisine });

      if (restaurants.length === 0) {
        return res.status(404).json({ error: `No restaurants found serving '${cuisine}' cuisine.` });
      }

      res.status(200).json(restaurants);
    } catch (err) {
      res.status(500).json({ error: "An issue occurred while retrieving cuisine-based restaurants." });
    }
  }

  static async getRestaurantsSorted(req, res) {
    try {
      let { sortBy } = req.query;
      sortBy = sortBy?.toUpperCase();

      if (!sortBy || !["ASC", "DESC"].includes(sortBy)) {
        return res.status(400).json({ error: "Invalid sorting parameter. Use 'ASC' for ascending or 'DESC' for descending order." });
      }

      const sortOrder = sortBy === "DESC" ? -1 : 1;
      const restaurants = await Restaurant.find({}).sort({ restaurant_id: sortOrder });

      if (restaurants.length === 0) {
        return res.status(404).json({ error: "No restaurants available for sorting." });
      }

      res.status(200).json(restaurants);
    } catch (err) {
      res.status(500).json({ error: "Sorting error encountered. Please check your request and try again." });
    }
  }

  static async getDelicatessenRestaurants(req, res) {
    try {
      const restaurants = await Restaurant.find({
        cuisine: "Delicatessen",
        city: { $ne: "Brooklyn" }
      })
        .select("name cuisine city -_id")
        .sort({ name: 1 });

      if (restaurants.length === 0) {
        return res.status(404).json({ error: "No Delicatessen restaurants found outside Brooklyn." });
      }

      res.status(200).json(restaurants);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve Delicatessen restaurants. Try again later." });
    }
  }
}

module.exports = RestaurantController;
