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
const prismaClient_1 = require("../prisma/prismaClient");
function checkForExistingGame(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const count = prismaClient_1.prismaClient.machine_data.count({
            where: {
                gameName: req.body.gameName,
                serialNumber: req.body.serialNumber
            }
        }).then((count) => {
            if (count === 0) {
                next();
                return;
            }
            res
                .status(400)
                .json({ error: { message: "Game already exists with current serial number" } });
        })
            .catch(error => res.status(500).json({ error: { message: error.message } }));
    });
}
exports.default = checkForExistingGame;
//# sourceMappingURL=checkForExistingGame.js.map