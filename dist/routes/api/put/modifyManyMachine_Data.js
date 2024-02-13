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
function default_1(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let transactionList = [];
        for (const record of input) {
            const recordId = record.id;
            delete record.id;
            const updateObject = {
                where: {
                    id: recordId
                },
                data: Object.assign(Object.assign({}, record), { timestamp_machine_data_timestampTotimestamp: {
                        upsert: {
                            create: { createdAt: new Date },
                            update: { modifiedAt: new Date }
                        }
                    } }),
                select: {
                    id: true,
                    gameName: true
                }
            };
            transactionList.push(prismaClient_1.prismaClient.machine_data.update(updateObject));
        }
        return prismaClient_1.prismaClient.$transaction(transactionList);
    });
}
exports.default = default_1;
//# sourceMappingURL=modifyManyMachine_Data.js.map