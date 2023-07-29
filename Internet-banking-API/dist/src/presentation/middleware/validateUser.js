"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.senderValidation = exports.authValidation = exports.adminValidation = exports.ownerValidation = exports.userValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../domain/models");
const constants_1 = require("../../utils/constants");
const services = models_1.UserModel;
const userValidation = async (req, res, next) => {
    const { username, email } = req.body;
    const regexInvalidUserName = /[a-zA-Z0-9]/g;
    const regexInvalidEmail = /\S+@\S+\.\S+/;
    if (!regexInvalidUserName.test(username)) {
        return res.status(400).json({ error: 'Username is invalid' });
    }
    if (!regexInvalidEmail.test(email)) {
        return res.status(400).json({ error: 'Email is invalid' });
    }
    if (username === undefined || email === undefined) {
        return res.status(400).json({
            status: 400,
            message: 'The property username or email is required'
        });
    }
    const userByUsername = await services.findOne({ username }).exec();
    if ((userByUsername === null || userByUsername === void 0 ? void 0 : userByUsername.username) === username) {
        return res
            .status(400)
            .json({ status: 400, message: 'Username already in use' });
    }
    const userByEmail = await services.findOne({ email }).exec();
    if ((userByEmail === null || userByEmail === void 0 ? void 0 : userByEmail.email) === email) {
        return res
            .status(400)
            .json({ status: 400, message: 'Email already in use' });
    }
    return next();
};
exports.userValidation = userValidation;
const ownerValidation = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization === undefined)
        return res.status(401).json({ error: 'Access denied, you need to login' });
    const { id } = req.params;
    try {
        const payload = jwtValid({ authorization });
        if (payload.message)
            return res.status(401).json({ error: payload.message });
        const user = await services.findById(payload.uid);
        const entity = await services.findById(id);
        if ((user === null || user === void 0 ? void 0 : user.id) !== (entity === null || entity === void 0 ? void 0 : entity.id)) {
            return res.status(403).json({
                status: 403,
                message: 'The user is not the owner of the resource'
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send('Internal server error');
        }
        return res.status(401).send('Unauthorized');
    }
    return next();
};
exports.ownerValidation = ownerValidation;
const adminValidation = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (authorization === undefined)
            return res.status(401).json({ error: 'Access denied, you need to login' });
        const payload = jwtValid({ authorization });
        if (payload.message) {
            return res.status(401).json({ error: payload.message });
        }
        if (payload.role !== constants_1.UserRole.ADMIN) {
            return res.status(401).json({
                status: 401,
                message: 'Access denied, you need to login'
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return next(error);
        }
        return res.status(403).send('Unauthorized');
    }
    return next();
};
exports.adminValidation = adminValidation;
const authValidation = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (authorization === undefined) {
            return res.status(401).json({ error: 'Access denied, you need to authenticate' });
        }
        const payload = jwtValid({ authorization });
        if (payload.message) {
            return res.status(401).json({ error: payload.message });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return next(error);
        }
        return res.status(401).send('Unauthorized');
    }
    return next();
};
exports.authValidation = authValidation;
const senderValidation = async (req, res, next) => {
    const { sender } = req.params;
    const { authorization } = req.headers;
    const senderBody = req.body.sender;
    const users = await services.find().exec();
    try {
        if (authorization === undefined)
            return res.status(401).json({ error: 'Access denied, you need to login' });
        if (users.some(user => user.id === sender || user.id === senderBody)) {
            return res.status(400).json({ error: 'Sender is invalid' });
        }
        const payload = jwtValid({ authorization });
        if (payload.message) {
            return res.status(401).json({ error: payload.message });
        }
        if (payload.uid !== sender || payload.uid !== senderBody) {
            return res.status(401).json({
                status: 401,
                message: 'Access denied, you login with your own account'
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return next(error);
        }
        return res.status(401).send('Unauthorized');
    }
    return next();
};
exports.senderValidation = senderValidation;
const jwtValid = ({ authorization }) => {
    const token = authorization.split(' ')[1];
    const payload = jsonwebtoken_1.default.verify(token, constants_1.SECRET);
    if ((authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[0]) !== 'Bearer') {
        payload.message = 'Access denied, use an authorization token';
        return payload;
    }
    if (token === undefined) {
        payload.message = 'Access denied, you need to login';
        return payload;
    }
    return payload;
};
