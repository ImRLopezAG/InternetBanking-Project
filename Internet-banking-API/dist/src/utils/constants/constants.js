"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.MONGODB_URI = exports.SECRET = exports.BASE = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.BASE = process.env.BASE;
exports.SECRET = process.env.JWT_SECRET;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.DB_NAME = process.env.DB_NAME;
