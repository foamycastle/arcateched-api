import {Prisma} from "@prisma/client";
import {prismaClient} from "../../../../../prisma/prismaClient";

export default function byName(payload:string) {
    return prismaClient.contacts.findMany({
        where:{
            OR:[
                {
                    name:{
                        equals:payload,
                        mode:"insensitive"
                    }
                },
                {
                    name:{
                        contains:payload,
                        mode:"insensitive"
                    }
                },
                {
                    name:{
                        startsWith:payload,
                        mode:"insensitive"
                    }
                },
                {
                    name:{
                        endsWith:payload,
                        mode:"insensitive"
                    }
                }
            ]
        },
        select:{
            id:true,
            name:true,
        }
    })
}
