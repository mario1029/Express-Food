"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_1 = __importDefault(require("./session"));
const users_1 = __importDefault(require("./users"));
const premisses_1 = __importDefault(require("./premisses"));
const auth_1 = require("@validations/auth");
const router = express_1.Router();
router.use('/session', session_1.default);
router.use('/users', users_1.default);
router.use('/premisses', auth_1.isAuth, premisses_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map