"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function validateCreateMachine_Data(input, res, next) {
    const valid = joi_1.default.object({
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
        mfgUUID: joi_1.default.string()
            .uuid({
            version: [
                'uuidv1',
                'uuidv4'
            ]
        }),
        cabinetKey: joi_1.default.ref('mfg'),
        serviceKey: joi_1.default.ref('mfg'),
        gameType: joi_1.default.array(),
        gameZone: joi_1.default.ref('mfg'),
        occupied: joi_1.default.number().precision(3)
    }).validate(input.body);
    if (valid.error) {
        res
            .status(400)
            .json({
            error: {
                validationError: valid.error.details
            }
        });
    }
    next("route");
}
exports.default = validateCreateMachine_Data;
//# sourceMappingURL=validateCreateMachine_Data.js.map