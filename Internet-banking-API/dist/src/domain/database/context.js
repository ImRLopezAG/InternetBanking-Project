"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbContext = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../utils/constants");
const DbContext = async () => {
    try {
        await (0, mongoose_1.connect)(constants_1.MONGODB_URI, {
            dbName: constants_1.DB_NAME
        });
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};
exports.DbContext = DbContext;
