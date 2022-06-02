
export class APIFeatures {
  query: any;
  queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    console.log(queryStr);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const spaceFields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(spaceFields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    if (this.queryString.page || this.queryString.limit) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 1;
      const skip = (page - 1) * limit;
      console.log(page, skip, limit);

      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }
}
