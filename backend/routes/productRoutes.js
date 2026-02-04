import express from "express";
import {upload}  from "../middlewares/multer.js";
import {
  addProduct,
  getAllProducts,
} from "../controllers/productsController.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"), // 👈 middleware use
  addProduct
);

router.get("/", getAllProducts);

export default router;
