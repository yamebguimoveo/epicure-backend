"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProperties = void 0;
const removeProperties = (queryString) => {
    const queryObj = Object.assign({}, queryString);
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    return JSON.parse(queryStr);
};
exports.removeProperties = removeProperties;
//# sourceMappingURL=index.js.map