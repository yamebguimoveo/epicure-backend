import { Restaurant } from "../../../db/models/restaurant.model";
import { removeProperties } from "../utils";
import { APIFeatures } from "../utils/ApiFeatures";
import { openRestaurantsFilterFunc } from "../utils/restaurantsFilter";
// require("../../../db/models/chef.model.ts");

export class RestaurantHandler {
  public async getRestaurants(reqQuery: any) {
    try {
      /* 
      get a query for all hte restaurant
      then loop each restaurant
      then you have a single object.
      check if it open using the openRestaurantFilterFunc - for a single.
      acoording to the answer:
      findByIdAndUpdate: {isOpen: answer}
      
      */
      if (reqQuery.isOpen !== undefined) {
        const allRestaurants = await Restaurant.find({});
        const restaurantsOpenID = openRestaurantsFilterFunc(
          reqQuery,
          allRestaurants
        );
        await Restaurant.updateMany({}, { isOpen: false });
        restaurantsOpenID.forEach(async (id: any) => {
          await Restaurant.findByIdAndUpdate(id, { isOpen: true });
        });
      }

      console.log(reqQuery, "\n this is request query ");

      let query = Restaurant.find();

      new APIFeatures(query, reqQuery).filter().sort().limitFields().paginate();
      let restaurants: any = await query.populate("chef");
      let count = await Restaurant.count(removeProperties(reqQuery));
      return { restaurants, count };
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
      throw err;
    }
  }

  public async deleteRestaurant(id: string) {
    try {
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
      const newRestaurant = await Restaurant.findByIdAndUpdate(id, update, {
        new: true,
      }).populate({ path: "chef", select: "name _id" });
      return newRestaurant;
    } catch (err) {
      throw err;
    }
  }
}
