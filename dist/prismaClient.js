"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const prismaClientOptions_1 = require("./prismaClientOptions");
let prismaClient;
global.__prismaClient = new client_1.PrismaClient(prismaClientOptions_1.prismaClientOptions);
exports.prismaClient = prismaClient = global.__prismaClient;
//# sourceMappingURL=prismaClient.js.map