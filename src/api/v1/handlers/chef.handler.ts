import { Chef } from "../../../db/models/chef.model";
import { APIFeatures } from "../utils/ApiFeatures";

export class ChefHandler {
  public async getChefs(reqQuery: any) {
    try {
      const query = Chef.find();
      const features = new APIFeatures(query, reqQuery)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const chefs = await query;
      return chefs;
    } catch (err) {
      throw err;
    }
  }
  public async createChef(chef: any) {
    try {
      const newChef = await Chef.create(chef);
      return newChef;
    } catch (err) {
      throw err;
    }
  }

  public async getChef(id: string) {
    try {
      const chef = await Chef.findById(id);
      return chef;
    } catch (err) {
      throw err;
    }
  }

  public async deleteChef(id: string) {
    try {
      const chef = await Chef.findByIdAndDelete(id);
      return chef;
    } catch (err) {
      throw err;
    }
  }

  public async updateChef(id: string, update: any) {
    try {
      const newChef = await Chef.findByIdAndUpdate(id, update, { new: true });
      return newChef;
    } catch (err) {
      throw err;
    }
  }
}
