import Express from "express";
import modelRouter from "./modelRouter";
import utilityRouter from "./utilityRouter";
export const router = Express.Router({
    strict:true,
    caseSensitive:true
});

router.use('/models',modelRouter)
router.use('/ui',utilityRouter)

export default router;
