import {Prisma} from "@prisma/client";

const preparedQuery = () => {
    return Prisma.validator<>()({})
}
export default preparedQuery