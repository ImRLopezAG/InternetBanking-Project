"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const domain_1 = require("../../domain");
const core_1 = require("../core");
class UserService extends core_1.GenericService {
    constructor() {
        super(domain_1.UserModel);
    }
    async GetByUserName(username) {
        try {
            const user = await domain_1.UserModel.findOne({ username }).exec();
            return user;
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error while getting user by username');
        }
    }
    async GetByEmail(email) {
        try {
            const user = await domain_1.UserModel.findOne({ email }).exec();
            return user;
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error while getting user by email');
        }
    }
    async Create(user) {
        const entity = await super.Create(user);
        try {
            const { pin, cvv, expirationDate, cardNumber, cardHolder } = domain_1.Generate.card();
            const product = new domain_1.Product({
                pin,
                cvv,
                expirationDate,
                cardNumber,
                cardHolder,
                user: entity._id
            });
            await product.save();
        }
        catch (error) {
            return entity;
        }
        return entity;
    }
}
exports.UserService = UserService;
