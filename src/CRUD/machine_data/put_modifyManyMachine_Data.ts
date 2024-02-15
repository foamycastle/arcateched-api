import {prismaClient} from "../../prisma/prismaClient";
import {Prisma} from "@prisma/client";

export default async function (input:Array<Prisma.machine_dataUpdateInput>){
    let transactionList:Prisma.PrismaPromise<any>[]=[];
    for(const record of input){
        const recordId = record.id
        delete record.id
        const updateObject:Prisma.machine_dataUpdateArgs={
            where:{
                id:<string>recordId
            },
            data:{
                ...record,
                timestampObject:{
                    upsert:{
                        create:{createdAt:new Date},
                        update:{modifiedAt:new Date}
                    }
                }
            },
            select:{
                id:true,
                name:true
            }
        }
        transactionList.push(
            prismaClient.machine_data.update(updateObject)
        )
    }
    return prismaClient.$transaction(transactionList)
}