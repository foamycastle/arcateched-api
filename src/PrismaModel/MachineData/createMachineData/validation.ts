import Joi from "joi";
import * as MachineDataValidation from "../../../validation/model/MachineData"
import {Prisma} from "@prisma/client";

type machineDataInputValidationType = {
    [key in keyof Prisma.machine_dataCreateInput]: Joi.AnySchema;
};
const inputValidation = Joi.object({
    data:Joi.object<machineDataInputValidationType>({
        name:           MachineDataValidation.name,
        serialNumber:   MachineDataValidation.serialNumber,
        modelNumber:    MachineDataValidation.modelNumber.allow("").optional(),
        dateOfMfg:      MachineDataValidation.dateMaxNow.allow(null).optional(),
        playerCount:    MachineDataValidation.playerCount.allow(null).optional(),
        occupied:       Joi.number().precision(3).allow(null).optional(),
        gameType:       MachineDataValidation.gameType.allow(null).optional(),
        currentDraw:    MachineDataValidation.currentDraw.optional().allow(null),
        powerConsumption: MachineDataValidation.powerConsumption.optional().allow(null),
        optimalVoltage: MachineDataValidation.optimalVoltage.optional().allow(null),
        phase:          MachineDataValidation.phase.optional().allow(null),
        intPS:          MachineDataValidation.intPS.optional().allow(null)
    })
})

export default inputValidation