"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFeatures = void 0;
const luxon_1 = require("luxon");
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        const queryObj = Object.assign({}, this.queryString);
        console.log(queryObj);
        if (queryObj.isOpen) {
            const { hour, minute } = luxon_1.DateTime.now()
                .setZone("Europe/Paris")
                .plus({ hour: 1 });
            const currentTime = hour * 60 + minute;
            console.log(currentTime);
            let queryStr = {
                "openingHours.open": { $lt: currentTime },
                "openingHours.close": { $gt: currentTime },
            };
            this.query = this.query.find(queryStr);
            console.log(this.query);
            return this;
        }
        else {
            const excludedFields = ["page", "sort", "limit"];
            excludedFields.forEach((el) => delete queryObj[el]);
            let queryStr = JSON.stringify(queryObj);
            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
            console.log(JSON.parse(queryStr));
            this.query = this.query.find(JSON.parse(queryStr));
            return this;
        }
    }
    sort() {
        if (this.queryString.sort) {
            this.query = this.query.sort(this.queryString.sort);
        }
        else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const spaceFields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(spaceFields);
        }
        else {
            this.query = this.query.select("-__v");
        }
        return this;
    }
    paginate() {
        if (this.queryString.page || this.queryString.limit) {
            const page = this.queryString.page * 1 || 1;
            const limit = this.queryString.limit * 1 || 1;
            const skip = (page - 1) * limit;
            this.query = this.query.skip(skip).limit(limit);
        }
        return this;
    }
}
exports.APIFeatures = APIFeatures;
//# sourceMappingURL=ApiFeatures.js.map