import {Prisma} from "@prisma/client";
import {prismaClient} from "../../../../../prisma/prismaClient";

export default function createContact(payload:Prisma.contactsCreateInput) {
    const dateNow = new Date()
    if(!payload.contacts_addresses){
        payload.contacts_addresses={
            create:{
                timestampObject:{
                    create:{
                        createdAt:dateNow
                    }
                }
            }
        }
    }
    if(!payload.contacts_phone){
        payload.contacts_phone={
            create:{
                timestampObject:{
                    create:{
                        createdAt:dateNow
                    }
                }
            }
        }
    }
    if(!payload.contacts_internet){
        payload.contacts_internet={
            create:{
                timestampObject:{
                    create:{
                        createdAt:dateNow
                    }
                }
            }
        }
    }
    return prismaClient.contacts.create({
        data:{
            ...payload,
            timestampObject:{
                create:{
                    createdAt:dateNow
                }
            }
        }
    })
}