import express from "express";
import {protect,requireAdmin} from "../../middleware/authMiddleware.js";
import {getPlans,createPlan,editPlan} from "../../controllers/Promotion/promotionPlanController.js";
const router=express.Router();
router.get("/all",protect,requireAdmin,(req,res)=>{req.query.includeInactive="true";return getPlans(req,res)});
router.get("/",getPlans);router.post("/",protect,requireAdmin,createPlan);router.patch("/:id",protect,requireAdmin,editPlan);
export default router;
