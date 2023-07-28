"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryService = void 0;
const domain_1 = require("../../domain");
const core_1 = require("../core");
class BeneficiaryService extends core_1.GenericService {
    constructor() {
        super(domain_1.BeneficiaryModel);
    }
    async GetBySender(sender) {
        return await domain_1.BeneficiaryModel.find({ sender }).exec();
    }
}
exports.BeneficiaryService = BeneficiaryService;
