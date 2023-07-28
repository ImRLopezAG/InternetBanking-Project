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
exports.ProductController = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const apps_1 = require("../../apps");
const domain_1 = require("../../domain");
const utils_1 = require("../../utils");
let ProductController = exports.ProductController = class ProductController extends apps_1.GenericController {
    constructor(service) {
        super(service);
        this.service = service;
        this.AddBalance = this.AddBalance.bind(this);
        this.GetByPin = this.GetByPin.bind(this);
        this.GetByOwner = this.GetByOwner.bind(this);
    }
    async AddBalance(req, res, next) {
        try {
            const { pin, balance } = req.body;
            const product = await this.service.AddBalance(pin, balance);
            console.log(product);
            return res.status(200).json(product);
        }
        catch (error) {
            if (error instanceof Error) {
                return next(error);
            }
            return res.status(500).send('Internal server error');
        }
    }
    async GetByPin(req, res, next) {
        try {
            const { pin } = req.params;
            const product = await this.service.GetByPin(pin);
            return res.status(200).json(product);
        }
        catch (error) {
            if (error instanceof Error) {
                return next(error);
            }
            return res.status(500).send('Internal server error');
        }
    }
    async GetByOwner(req, res, next) {
        try {
            const { owner } = req.params;
            const products = await this.service.GetByOwner(owner);
            return res.status(200).json(products);
        }
        catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return next(error);
            }
            return res.status(500).send('Internal server error');
        }
    }
    async Create(req, res, next) {
        try {
            const entity = req.body;
            const { limit } = req.body;
            if (!entity.user || !entity.type) {
                return res.status(400).send(`${!entity.user ? 'User' : 'Type'} is required`);
            }
            if (entity.type === utils_1.AccountType.CREDIT && !limit) {
                return res.status(400).send('Limit is required for credit accounts');
            }
            if (limit && entity.type !== utils_1.AccountType.CREDIT) {
                return res.status(400).send('Limit is only for credit accounts');
            }
            const { cardNumber, pin, cvv, expirationDate, cardHolder } = domain_1.Generate.card();
            entity.cardNumber = cardNumber;
            entity.pin = pin;
            entity.cvv = cvv;
            entity.expirationDate = expirationDate;
            entity.cardHolder = cardHolder;
            entity.active = true;
            entity.principal = false;
            entity.balance = entity.type !== utils_1.AccountType.CREDIT ? entity.balance : limit;
            return await super.Create(req, res, next);
        }
        catch (error) {
            if (error instanceof Error) {
                return next(error);
            }
            return res.status(500).send('Internal server error');
        }
    }
};
exports.ProductController = ProductController = __decorate([
    (0, tsyringe_1.injectable)(),
    (0, tsyringe_1.scoped)(tsyringe_1.Lifecycle.ContainerScoped),
    __metadata("design:paramtypes", [apps_1.ProductService])
], ProductController);
