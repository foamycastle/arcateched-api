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
const prismaClient_1 = require("../../../prisma/prismaClient");
function gameByID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.prismaClient.machine_data.findFirstOrThrow({
            where: {
                id: id
            },
            include: {
                contacts: true,
                attachments: true,
                issues: true,
                comments: true,
                keys_machine_data_cabinetKeyTokeys: true,
                keys_machine_data_serviceKeyTokeys: true,
                timestamp_machine_data_timestampTotimestamp: true,
                todo: true,
                machine_zones: true
            }
        });
    });
}
exports.default = gameByID;
//# sourceMappingURL=gameByID.js.map