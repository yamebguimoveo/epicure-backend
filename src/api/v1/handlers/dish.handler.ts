import { Dish } from "../../../db/models/dish.model";
import { Restaurant } from "../../../db/models/restaurant.model";
import { APIFeatures } from "../utils/ApiFeatures";

export class DishHandler {
  public async getDishes(reqQuery: any) {
    try {
      let query = Dish.find();
      const features = new APIFeatures(query, reqQuery)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      query = query.populate({
        path: "restaurant",
        select: "_id name",
      });
      const dishes = await query;
      return dishes;
    } catch (err) {
      console.log(err);

      throw err;
    }
  }
  public async createDish(dish: any) {
    try {
      const newDish = await Dish.create(dish);
      return newDish;
    } catch (err) {
      throw err;
    }
  }

  public async getDish(id: string) {
    try {
      const newDish = await Dish.findById(id).populate("restaurant");
      return newDish;
    } catch (err) {
      throw err;
    }
  }

  public async deleteDish(id: string) {
    try {
      console.log(id);
      const newDish = await Dish.findByIdAndDelete(id);
      return newDish;
    } catch (err) {
      throw err;
    }
  }

  public async updateDish(id: string, update: any) {
    try {
      console.log(id, update);
      const newDish = await Dish.findByIdAndUpdate(id, update, { new: true });
      return newDish;
    } catch (err) {
      throw err;
    }
  }
}
