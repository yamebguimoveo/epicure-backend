"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chef = void 0;
const mongoose_1 = require("mongoose");
const chefSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    imageSrc: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Chef = (0, mongoose_1.model)("Chef", chefSchema);
//# sourceMappingURL=chef.model.js.map