import Joi from "joi";
import {Prisma} from "@prisma/client";
import {contactType} from "./contactType";

export const validate_new_contact =
    Joi.object<Prisma.contactsCreateInput>({
        name:Joi.string().optional().max(32).alphanum(),
        type:contactType.optional(),
        supplies:Joi.array<string>().items(Joi.string().min(1).max(32).alphanum()).optional(),
        comments:Joi.object<Prisma.commentsCreateNestedManyWithoutContactsInput>({
            create:Joi.object<Prisma.commentsCreateInput>().optional(),
            createMany:Joi.object<Prisma.commentsCreateManyContactsInputEnvelope>().optional()
        }).optional(),
        contacts_addresses:Joi.object<Prisma.contacts_addressesCreateNestedManyWithoutContactsInput>({
            create:Joi.object<Prisma.contacts_addressesCreateInput>().optional(),
            createMany:Joi.object<Prisma.contacts_addressesCreateManyContactsInputEnvelope>().optional()
        }).optional(),
        contacts_phone:Joi.object<Prisma.contacts_phoneCreateNestedManyWithoutContactsInput>({
            create:Joi.object<Prisma.contacts_phoneCreateInput>().optional(),
            createMany:Joi.object<Prisma.contacts_phoneCreateManyContactsInputEnvelope>().optional()
        }).optional(),
        contacts_internet:Joi.object<Prisma.contacts_internetCreateNestedManyWithoutContactsInput>({
            create:Joi.object<Prisma.contacts_internetCreateInput>().optional(),
            createMany:Joi.object<Prisma.contacts_internetCreateManyContactsInputEnvelope>().optional()
        }).optional(),
        attachments:Joi.object<Prisma.attachmentsCreateNestedManyWithoutContactsInput>({
            create:Joi.object<Prisma.attachmentsCreateInput>().optional(),
            createMany:Joi.object<Prisma.attachmentsCreateManyContactsInputEnvelope>().optional(),
            connectOrCreate:Joi.object<Prisma.attachmentsCreateOrConnectWithoutContactsInput>().optional()
        }).optional(),
        users:Joi.object<Prisma.usersCreateOrConnectWithoutContactsInput>({
            where:Joi.object<Prisma.usersWhereUniqueInput>().required(),
            create:Joi.object<Prisma.usersCreateWithoutContactsInput>().required()
        }).optional()
    })
