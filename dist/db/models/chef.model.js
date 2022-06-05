"use strict";
exports.__esModule = true;
exports.Chef = void 0;
var mongoose_1 = require("mongoose");
var chefSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    imageSrc: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.Chef = (0, mongoose_1.model)("Chef", chefSchema);
