import Express from "express";
import modelRouter from "./modelRouter";
export const router = Express.Router({
    strict:true,
    caseSensitive:true
});

router.use('/models',modelRouter)

export default router;
