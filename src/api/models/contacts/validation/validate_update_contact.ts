import Joi from "joi";
import {Prisma} from "@prisma/client";
import {contactType} from "./contactType";
import {UUID} from "../../../../validation/schemas/UUID";

export const validate_update_contact =
    Joi.object<Prisma.contactsUpdateInput>({
        id:UUID.required(),
        name:Joi.string().optional().max(32).alphanum(),
        type:contactType.optional(),
        supplies:Joi.array<string>().items(Joi.string().min(1).max(32).alphanum()).optional(),
        comments:Joi.object<Prisma.commentsCreateNestedManyWithoutContactsInput>({
            createMany:Joi.object<Prisma.commentsCreateManyContactsInputEnvelope>().optional(),
            connectOrCreate:Joi.object<Prisma.commentsCreateOrConnectWithoutContactsInput>().optional()
        }).optional(),
        contacts_addresses:Joi.object<Prisma.contacts_addressesCreateNestedManyWithoutContactsInput>({
            createMany:Joi.object<Prisma.contacts_addressesCreateManyContactsInputEnvelope>().optional(),
            connectOrCreate:Joi.object<Prisma.contacts_addressesCreateOrConnectWithoutContactsInput>().optional()
        }).optional(),
        contacts_phone:Joi.object<Prisma.contacts_phoneCreateNestedManyWithoutContactsInput>({
            createMany:Joi.object<Prisma.contacts_phoneCreateManyContactsInputEnvelope>().optional(),
            connectOrCreate:Joi.object<Prisma.contacts_phoneCreateOrConnectWithoutContactsInput>().optional()
        }).optional(),
        contacts_internet:Joi.object<Prisma.contacts_internetCreateNestedManyWithoutContactsInput>({
            createMany:Joi.object<Prisma.contacts_internetCreateManyContactsInputEnvelope>().optional(),
            connectOrCreate:Joi.object<Prisma.contacts_internetCreateOrConnectWithoutContactsInput>().optional()
        }).optional(),
        attachments:Joi.object<Prisma.attachmentsCreateNestedManyWithoutContactsInput>({
            createMany:Joi.object<Prisma.attachmentsCreateManyContactsInputEnvelope>().optional(),
            connectOrCreate:Joi.object<Prisma.attachmentsCreateOrConnectWithoutContactsInput>().optional()
        }).optional(),
        users:Joi.object<Prisma.usersCreateOrConnectWithoutContactsInput>({
            where:Joi.object<Prisma.usersWhereUniqueInput>().required(),
            create:Joi.object<Prisma.usersCreateWithoutContactsInput>().required()
        }).optional()
    })
