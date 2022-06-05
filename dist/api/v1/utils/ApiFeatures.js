"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.APIFeatures = void 0;
var APIFeatures = /** @class */ (function () {
    function APIFeatures(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    APIFeatures.prototype.filter = function () {
        var queryObj = __assign({}, this.queryString);
        var excludedFields = ["page", "sort", "limit"];
        excludedFields.forEach(function (el) { return delete queryObj[el]; });
        var queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, function (match) { return "$".concat(match); });
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    };
    APIFeatures.prototype.sort = function () {
        if (this.queryString.sort) {
            this.query = this.query.sort(this.queryString.sort);
        }
        else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    };
    APIFeatures.prototype.limitFields = function () {
        if (this.queryString.fields) {
            var spaceFields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(spaceFields);
        }
        else {
            this.query = this.query.select("-__v");
        }
        return this;
    };
    APIFeatures.prototype.paginate = function () {
        if (this.queryString.page || this.queryString.limit) {
            var page = this.queryString.page * 1 || 1;
            var limit = this.queryString.limit * 1 || 1;
            var skip = (page - 1) * limit;
            this.query = this.query.skip(skip).limit(limit);
        }
        return this;
    };
    return APIFeatures;
}());
exports.APIFeatures = APIFeatures;
