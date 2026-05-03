import express from "express";
import { createOrder, verifyPayment, getUserOrders } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/:userId", getUserOrders);

export default router;