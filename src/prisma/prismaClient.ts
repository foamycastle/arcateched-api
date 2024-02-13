import {PrismaClient} from "@prisma/client";
import {prismaClientOptions} from "./prismaClientOptions";

export let prismaClient: PrismaClient;

declare global {
    var __prismaClient: PrismaClient | undefined
}

global.__prismaClient = new PrismaClient(prismaClientOptions)
prismaClient = global.__prismaClient


