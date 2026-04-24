import express from "express";
import {
    addToCart,
    getAddToCart,
    updateAddToCart,
    deleteCartItem
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/",addToCart);

router.get("/:userId", getAddToCart);
router.put("/:id", updateAddToCart);
router.delete("/:id", deleteCartItem);

export default router;
