"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateGame = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
function validateCreateGame(input) {
    return joi_1.default.object({
        gameName: joi_1.default.string()
            .required()
            .min(4)
            .max(64).truncate()
            .trim(),
        modelNumber: joi_1.default.string()
            .max(32)
            .trim(),
        serialNumber: joi_1.default.string()
            .max(32)
            .trim(),
        dateEntered: joi_1.default.date(),
        dateOfMfg: joi_1.default.date()
            .less(joi_1.default.ref('dateEntered')),
        mfg: joi_1.default.string()
            .required()
            .uuid({
            version: [
                'uuidv1',
                'uuidv4'
            ]
        }),
        cabinetKey: joi_1.default.ref('mfg'),
        serviceKey: joi_1.default.ref('mfg'),
        gameType: joi_1.default.array()
            .items(joi_1.default.object(Object.entries(client_1.gameType))),
        gameZone: joi_1.default.ref('mfg'),
    });
}
exports.validateCreateGame = validateCreateGame;
//# sourceMappingURL=validation.js.map