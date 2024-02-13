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
Object.defineProperty(exports, "__esModule", { value: true });
const machine_data_create_validation_schema_1 = require("../schemas/machine_data_create_validation_schema");
function validateCreateMachine_Data(input, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield machine_data_create_validation_schema_1.machine_dataCreateValidationSchema.validateAsync(input.body)
            .then(validated => {
            if (validated.error) {
                res
                    .status(400)
                    .json({
                    error: {
                        validationError: validated.error
                    }
                });
                return;
            }
            next();
        });
    });
}
exports.default = validateCreateMachine_Data;
//# sourceMappingURL=validateCreateMachine_Data.js.map