"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const domain_1 = require("../../domain");
const core_1 = require("../core");
class ProductService extends core_1.GenericService {
    constructor() {
        super(domain_1.ProductModel);
    }
    async GetByPin(pin) {
        return await domain_1.ProductModel.findOne({ pin });
    }
    async AddBalance(pin, balance) {
        const product = await domain_1.ProductModel.findOne({ pin });
        if (!product) {
            throw new Error('Product not found');
        }
        product.balance += balance;
        return await super.Update(product._id, product);
    }
    async GetByOwner(owner) {
        return await domain_1.ProductModel.find({ user: owner });
    }
}
exports.ProductService = ProductService;
