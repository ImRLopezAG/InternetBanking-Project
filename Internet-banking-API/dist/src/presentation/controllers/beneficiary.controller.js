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
exports.BeneficiaryController = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const apps_1 = require("../../apps");
let BeneficiaryController = exports.BeneficiaryController = class BeneficiaryController extends apps_1.GenericController {
    constructor(service) {
        super(service);
        this.service = service;
    }
    async GetBySender(req, res, next) {
        try {
            const { sender } = req.params;
            const beneficiaries = await this.service.GetBySender(sender);
            return res.status(200).json(beneficiaries);
        }
        catch (error) {
            if (error instanceof Error) {
                return next(error);
            }
        }
    }
};
exports.BeneficiaryController = BeneficiaryController = __decorate([
    (0, tsyringe_1.injectable)(),
    (0, tsyringe_1.scoped)(tsyringe_1.Lifecycle.ContainerScoped),
    __metadata("design:paramtypes", [apps_1.BeneficiaryService])
], BeneficiaryController);
