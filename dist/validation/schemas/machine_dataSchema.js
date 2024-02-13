"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.machine_dataSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.machine_dataSchema = joi_1.default.object({
    id: joi_1.default.string()
        .uuid({
        version: [
            'uuidv1',
            'uuidv4'
        ]
    }),
    gameName: joi_1.default.string()
        .required()
        .min(4)
        .max(64).truncate()
        .trim(),
    modelNumber: joi_1.default.string()
        .max(32)
        .trim(),
    serialNumber: joi_1.default.string()
        .required()
        .max(32)
        .trim(),
    dateEntered: joi_1.default.date(),
    dateOfMfg: joi_1.default.date()
        .less(joi_1.default.ref('dateEntered')),
    mfgUUID: joi_1.default.ref('id'),
    cabinetKey: joi_1.default.ref('id'),
    serviceKey: joi_1.default.ref('id'),
    gameType: joi_1.default.array(),
    gameZone: joi_1.default.ref('id'),
    occupied: joi_1.default.number().precision(3)
});
//# sourceMappingURL=machine_dataSchema.js.map