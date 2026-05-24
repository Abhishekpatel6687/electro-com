import express from "express";
import {upload}  from "../middlewares/multer.js";
import {
  addProduct,
  getAllProducts,
} from "../controllers/productsController.js";

const router = express.Router();

router.post(
  "/",
  // upload.single("image"), // 👈 middleware use
  upload.array("images", 5), // 👈 multiple images
  addProduct
);

router.get("/", getAllProducts);

export default router;
