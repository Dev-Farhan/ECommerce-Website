import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  deleteCategory,
  getAllCategory,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create-category", requireSignIn, isAdmin, categoryController);

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

router.get("/get-category", getAllCategory);

router.get("/single-category/:slug", singleCategoryController);

router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

export default router;
