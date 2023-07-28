"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const domain_1 = require("../../domain");
const utils_1 = require("../../utils");
const core_1 = require("../core");
class PaymentService extends core_1.GenericService {
    constructor() {
        super(domain_1.PaymentModel);
    }
    async Create(entity) {
        const { sender, receptor, amount } = entity;
        const senderProduct = await domain_1.ProductModel.findOne({ pin: sender });
        const receptorProduct = await domain_1.ProductModel.findOne({ pin: receptor });
        const taxes = amount + (amount * 0.18);
        if (!senderProduct || !receptorProduct) {
            throw Error('BR: Product not found');
        }
        if (senderProduct.balance < taxes) {
            throw new Error('BR: Insufficient funds');
        }
        senderProduct.balance -= taxes;
        receptorProduct.balance += amount;
        await domain_1.ProductModel.findByIdAndUpdate(senderProduct._id, senderProduct);
        await domain_1.ProductModel.findByIdAndUpdate(receptorProduct._id, receptorProduct);
        return await super.Create(entity);
    }
    async GetBySender(sender) {
        return await domain_1.PaymentModel.find({ sender }).exec();
    }
    async LoanPayment(entity) {
        const { sender, amount, receptor } = entity;
        const product = await domain_1.ProductModel.findOne({ pin: sender });
        const loan = await domain_1.ProductModel.findOne({ pin: receptor });
        const taxes = amount + (amount * 0.18);
        if (product === null || loan === null) {
            throw new Error('BR: Product not found');
        }
        if (loan.type !== utils_1.AccountType.LOAN) {
            throw new Error('BR: Invalid product');
        }
        if (product.balance < taxes) {
            throw new Error('BR: Insufficient funds');
        }
        if (product.type === utils_1.AccountType.CREDIT && product.limit < loan.balance + (loan.balance * 0.18)) {
            throw new Error('BR: Insufficient funds');
        }
        if (loan.balance < amount) {
            product.balance -= loan.balance;
            loan.balance = 0;
            loan.active = false;
        }
        else {
            product.balance -= taxes;
            loan.balance -= amount;
        }
        await domain_1.ProductModel.findByIdAndUpdate(product._id, product);
        await domain_1.ProductModel.findByIdAndUpdate(loan._id, loan);
        return await super.Create(entity);
    }
    async CreditPayment(entity) {
        const { sender, amount, receptor } = entity;
        const product = await domain_1.ProductModel.findOne({ pin: sender });
        const credit = await domain_1.ProductModel.findOne({ pin: receptor });
        const taxes = amount + (amount * 0.18);
        if (product === null || credit === null) {
            throw new Error('BR: Product not found');
        }
        if (product.type === utils_1.AccountType.CREDIT || product.type === utils_1.AccountType.LOAN) {
            throw new Error('BR: Invalid product');
        }
        if (product.balance < taxes) {
            throw new Error('BR: Insufficient funds');
        }
        if (credit.limit < amount) {
            product.balance -= credit.limit + (credit.limit * 0.18);
            credit.balance = credit.limit;
        }
        else {
            product.balance -= taxes;
            credit.balance += amount;
        }
        await domain_1.ProductModel.findByIdAndUpdate(product._id, product);
        await domain_1.ProductModel.findByIdAndUpdate(credit._id, credit);
        return await super.Create(entity);
    }
}
exports.PaymentService = PaymentService;
