"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    return res.status(500).send({ message: err.message });
};
exports.errorHandler = errorHandler;
