import express from "express";
import {
    addToCart,
    getAddToCart,
    updateAddToCart,
    deleteCartItem,
    deleteAllCartItem
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/",addToCart);

router.get("/:userId", getAddToCart);
router.put("/:id", updateAddToCart);
router.delete("/deleteCartItem/:id", deleteCartItem);
router.delete("/deleteAllCartItem/:userId", deleteAllCartItem);


export default router;
