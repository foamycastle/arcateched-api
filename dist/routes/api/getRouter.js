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
exports.getRouter = void 0;
const allGameNames_1 = __importDefault(require("./get/allGameNames"));
const gameByID_1 = __importDefault(require("./get/gameByID"));
const getContactType_1 = __importDefault(require("./get/getContactType"));
const touchTimestamp_1 = __importDefault(require("./put/touchTimestamp"));
const validateContactType_1 = __importDefault(require("../../validation/get/validateContactType"));
const validateUUID_1 = __importDefault(require("../../validation/get/validateUUID"));
const express = require("express");
exports.getRouter = express.Router();
exports.getRouter.get('/machine_data/names', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, allGameNames_1.default)()
        .then((results) => {
        res.json(results);
    })
        .catch((error) => {
        res
            .status(500)
            .json(error);
    });
}));
exports.getRouter.use('/machine_data/:id', validateUUID_1.default);
exports.getRouter.get("/machine_data/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, gameByID_1.default)(req.params.id)
        .then((results) => {
        (0, touchTimestamp_1.default)(results.timestamp_machine_data_timestampTotimestamp.id);
        res.json(results);
    })
        .catch((error) => {
        if (error.code) {
            switch (error.code) {
                case 'P2025':
                    res.status(404);
                    break;
                default:
                    res.status(500);
                    break;
            }
        }
        res.json(error);
    });
}));
exports.getRouter.param('contactType', validateContactType_1.default);
exports.getRouter.get("/contacts/byType/:contactType", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getContactType_1.default)(req.params.contactType)
        .then(results => res.json(results))
        .catch(error => res.status(400).json({ error: { message: error.message } }));
}));
console.log('getRouter');
//# sourceMappingURL=getRouter.js.map