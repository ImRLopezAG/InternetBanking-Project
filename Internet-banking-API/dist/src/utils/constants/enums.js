"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["ADMIN"] = 1] = "ADMIN";
    UserRole[UserRole["Client"] = 2] = "Client";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var AccountType;
(function (AccountType) {
    AccountType[AccountType["DEBIT"] = 1] = "DEBIT";
    AccountType[AccountType["CREDIT"] = 2] = "CREDIT";
    AccountType[AccountType["SAVING"] = 3] = "SAVING";
    AccountType[AccountType["LOAN"] = 4] = "LOAN";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
