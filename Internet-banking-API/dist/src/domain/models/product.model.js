"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.Product = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const utils_1 = require("../../utils");
const base_entity_1 = require("./base.entity");
const user_model_1 = require("./user.model");
class Product extends base_entity_1.BaseEntity {
}
exports.Product = Product;
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "pin", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "cvv", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "expirationDate", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "cardNumber", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "cardHolder", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "balance", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "principal", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "limit", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "active", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: utils_1.AccountType, default: utils_1.AccountType.SAVING }),
    __metadata("design:type", Number)
], Product.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_model_1.User }),
    __metadata("design:type", Object)
], Product.prototype, "user", void 0);
exports.ProductModel = (0, typegoose_1.getModelForClass)(Product);
