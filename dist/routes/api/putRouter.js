"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putRouter = void 0;
const validateUpdateMachine_Data_1 = __importDefault(require("../../validation/put/validateUpdateMachine_Data"));
const modifyMachine_Data_1 = __importDefault(require("./put/modifyMachine_Data"));
const modifyManyMachine_Data_1 = __importDefault(require("./put/modifyManyMachine_Data"));
const express = require("express");
exports.putRouter = express.Router();
exports.putRouter.use(/\/game$/g, validateUpdateMachine_Data_1.default);
exports.putRouter.put(/\/game$/g, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, modifyMachine_Data_1.default)(req.body)
        .then(result => res.json(result))
        .catch(error => res.status(500).json({ error: { message: error.message } }));
}));
exports.putRouter.put(/\/game\/many$/g, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, modifyManyMachine_Data_1.default)(req.body)
        .then(result => res.json(result))
        .catch(error => res.status(500).json({ error: { message: error.message } }));
}));
console.log('putRouter');
//# sourceMappingURL=putRouter.js.map