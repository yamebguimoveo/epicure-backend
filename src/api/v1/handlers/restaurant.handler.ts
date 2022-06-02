import { Restaurant } from "../../../db/models/restaurant.model";
import { APIFeatures } from "../utils/ApiFeatures";
require("../../../db/models/chef.model.ts");

export class RestaurantHandler {
  public async getRestaurants(reqQuery: any) {
    try {
      let query = Restaurant.find();
      new APIFeatures(query, reqQuery).filter().sort().limitFields().paginate();
      const restaurants = await query.populate("chef");

      return restaurants;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  public async createRestaurant(dish: any) {
    try {
      const newRestaurant = await Restaurant.create(dish);
      return newRestaurant;
    } catch (err) {
      throw err;
    }
  }

  public async getRestaurant(id: string) {
    try {
      const restaurant = await Restaurant.findById(id).populate({
        path: "chef",
        select: "_id name",
      });
      return restaurant;
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  public async deleteRestaurant(id: string) {
    try {
      console.log(id);
      const restaurant = await Restaurant.findByIdAndDelete(id).populate({
        path: "chef",
        select: "name _id",
      });
      return restaurant;
    } catch (err) {
      throw err;
    }
  }

  public async updateRestaurant(id: string, update: any) {
    try {
      console.log(id, update);
      const newRestaurant = await Restaurant.findByIdAndUpdate(id, update, {
        new: true,
      }).populate({ path: "chef", select: "name _id" });
      return newRestaurant;
    } catch (err) {
      throw err;
    }
  }
}
