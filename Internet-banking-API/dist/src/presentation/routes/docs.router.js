"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.docs = void 0;
const express_1 = require("express");
const swagger_themes_1 = require("swagger-themes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const libs_1 = require("../../shared/libs");
exports.docs = (0, express_1.Router)();
const theme = new swagger_themes_1.SwaggerTheme('v3').getBuffer('dark');
exports.docs.use('/', swagger_ui_express_1.default.serve);
exports.docs.get('/', swagger_ui_express_1.default.setup(libs_1.swaggerSetup, {
    customSiteTitle: 'Internet - Banking  API Docs',
    customCss: `.swagger-ui .topbar { display: none } .description{ display: none } .info__contact{ display: none } ${theme}`
}));
