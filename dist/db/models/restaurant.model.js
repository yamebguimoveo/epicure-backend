"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    chef: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Chef",
        required: true,
    },
    imageSrc: {
        type: String,
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    new: {
        type: Boolean,
    },
    mostPopular: {
        type: Boolean,
        default: false,
    },
    openingHours: {
        _id: false,
        type: {
            open: String,
            close: String,
        },
        default: { open: "07:00", close: "21:00" },
        minlength: 5,
        maxlength: 5,
    },
}, { timestamps: true });
exports.Restaurant = (0, mongoose_1.model)("Restaurant", restaurantSchema);
//# sourceMappingURL=restaurant.model.js.map