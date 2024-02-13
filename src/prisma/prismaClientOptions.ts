import {Prisma} from "@prisma/client";
export const prismaClientOptions:Prisma.PrismaClientOptions={
    log:[
        {
            level:'query',
            emit: 'event'
        },
        {
            level: 'error',
            emit: 'event'
        }
    ]
}