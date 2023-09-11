import express from "express";
import { deleteUser, getAllUser, getSingleUser, updateUser } from "./../controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.put('/:id', authenticate, restrict(['patient']), updateUser);

router.delete('/:id', authenticate, restrict(['patient']), deleteUser);

router.get('/:id', authenticate, restrict(['patient']), getSingleUser);

router.get('/', authenticate, restrict(['admin']),getAllUser);

export default router;