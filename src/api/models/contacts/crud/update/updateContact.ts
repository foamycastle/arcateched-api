import {Prisma} from "@prisma/client";
import {prismaClient} from "../../../../../prisma/prismaClient";

export default function updateContact(payload:Prisma.contactsUpdateInput) {
    const dateNow=new Date()
    const updateId = payload.id
    delete payload.id
    return prismaClient.contacts.update({
        where:{
            id:<string>updateId
        },
        data:{
            ...payload,
            timestampObject:{
                upsert:{
                    create:{createdAt:dateNow},
                    update:{modifiedAt:dateNow}
                }
            }
        }
    })
}