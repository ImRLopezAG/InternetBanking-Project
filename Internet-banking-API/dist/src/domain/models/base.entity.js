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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = require("mongoose");
let BaseEntity = exports.BaseEntity = class BaseEntity extends mongoose_1.Document {
    toJSON() {
        const obj = this.toObject();
        const { updatedAt, password, __v } = obj, rest = __rest(obj, ["updatedAt", "password", "__v"]);
        return rest;
    }
};
__decorate([
    (0, typegoose_1.prop)({ default: () => new Date().toISOString() }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: () => new Date().toISOString() }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
exports.BaseEntity = BaseEntity = __decorate([
    (0, typegoose_1.pre)('findOneAndUpdate', function (next) {
        const update = this.getUpdate();
        update.updatedAt = new Date().toISOString();
        next();
    })
], BaseEntity);
