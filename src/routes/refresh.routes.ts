import { Router } from "express";
import refreshToken from "../controller/refresh.controller";
const router =Router()

router.post("/refresh", refreshToken);

export default router