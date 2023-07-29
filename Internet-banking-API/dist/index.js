"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const app_1 = __importDefault(require("./src/app"));
const domain_1 = require("./src/domain");
const utils_1 = require("./src/utils");
(0, domain_1.DbContext)()
    .then(() => {
    const user = new domain_1.UserModel();
    domain_1.UserModel.find({ username: 'admin' }).then((res) => {
        if (!res.length) {
            user.firstName = 'admin';
            user.lastName = 'admin';
            user.username = 'admin';
            user.password = 'admin';
            user.email = 'admin@example.com';
            user.role = 1;
            user.save()
                .then((res) => console.log(`first user saved:\n ${JSON.stringify(res.toJSON())}`))
                .catch((err) => console.log(err));
        }
    }).catch((err) => {
        console.log(err);
    });
    app_1.default.listen(utils_1.PORT, () => {
        console.log(`Server started on port: ${utils_1.PORT.startsWith('https') ? utils_1.PORT : `http://localhost:${utils_1.PORT}`}`);
    });
})
    .catch((err) => {
    console.log(err.message);
});
