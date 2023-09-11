import express from "express";
import { deleteDoctor, getAllDoctor, getSingleDoctor, updateDoctor } from "../controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.put('/:id', authenticate, restrict(['patient']), updateDoctor);
router.delete('/:id', authenticate, restrict(['patient']), deleteDoctor);
router.get('/:id', getSingleDoctor);
router.get('/', getAllDoctor);

export default router;