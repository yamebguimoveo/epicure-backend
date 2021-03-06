import { Restaurant } from "../../../db/models/restaurant.model";
import { removeProperties } from "../utils";
import { APIFeatures } from "../utils/ApiFeatures";
import { openRestaurantsFilterFunc } from "../utils/restaurantsFilter";
// require("../../../db/models/chef.model.ts");
import { DateTime } from "luxon";

export class RestaurantHandler {
  // public async updateRestaurantAvailavle() {
  //   try {
  //     const { hour, minute } = DateTime.now()
  //       .setZone("Europe/Paris")
  //       .plus({ hour: 1 });
  //     const currentTime = hour * 60 + minute;

  //     // const allRestaurants = await Restaurant.find({});
  //     // const restaurantsOpenID = openRestaurantsFilterFunc(true, allRestaurants);
  //     // await Restaurant.updateMany({ isOpen: true }, { isOpen: false });
  //     // restaurantsOpenID.forEach(async (id: any) => {
  //     //   console.log(id + "$$$$");

  //     //   await Restaurant.findByIdAndUpdate(id._id, { isOpen: true });
  //     // });
  //     // return restaurantsOpenID;
  //   } catch (err) {
  //     throw err;
  //   }
  // }
  public async getRestaurants(reqQuery: any) {
    try {
      console.log(reqQuery, "\n this is request query ");

      let query = Restaurant.find();

      const queryForIsOpen = () => {
        const { hour, minute } = DateTime.now()
          .setZone("Europe/Paris")
          .plus({ hour: 1 });
        const currentTime = hour * 60 + minute;
        let queryStr = {
          "openingHours.open": { $lt: currentTime },
          "openingHours.close": { $gt: currentTime },
        };
        return queryStr;
      };
      new APIFeatures(query, reqQuery).filter().sort().limitFields().paginate();
      let restaurants: any = await query.populate("chef");
      let count = reqQuery.isOpen
        ? await Restaurant.count( queryForIsOpen())
        : await Restaurant.count( removeProperties(reqQuery) );
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
