"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var mongoURI = process.env.MONGO_URI;
if (mongoURI) {
    mongoose_1["default"]
        .connect(mongoURI)
        .then(function (con) {
        console.log("db connect success");
    })["catch"](function (err) { return console.log(err); });
}
