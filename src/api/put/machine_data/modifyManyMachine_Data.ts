import {prismaClient} from "../../../../prisma/prismaClient";
import {Prisma} from "@prisma/client";
import {Request} from "express";
import Joi from "joi";

export default async function (input){
    let transactionList:Prisma.PrismaPromise<any>[]=[];
    for(const record of input){
        const recordId = record.id
        delete record.id
        const updateObject:Prisma.machine_dataUpdateArgs={
            where:{
                id:recordId
            },
            data:{
                ...record,
                timestamp_machine_data_timestampTotimestamp:{
                    upsert:{
                        create:{createdAt:new Date},
                        update:{modifiedAt:new Date}
                    }
                }
            },
            select:{
                id:true,
                gameName:true
            }
        }
        transactionList.push(
            prismaClient.machine_data.update(updateObject)
        )
    }
    return prismaClient.$transaction(transactionList)
}