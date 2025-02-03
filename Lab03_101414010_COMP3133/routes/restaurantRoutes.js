const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/restaurantController.js");

router.get("/restaurants", RestaurantController.getAllRestaurants);
router.get("/restaurants/cuisine/:cuisine", RestaurantController.getRestaurantsByCuisine);
router.get("/restaurants/sort", RestaurantController.getRestaurantsSorted);
router.get("/restaurants/delicatessen", RestaurantController.getDelicatessenRestaurants);

module.exports = router;