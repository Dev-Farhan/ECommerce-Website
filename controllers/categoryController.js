import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//create Category Route
export const categoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        meassage: "Name is Required !!!",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(401).send({
        meassage: "Category  is Already Registered !!!",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category Created 😊",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    });
  }
};

//Update Category Route
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Updated Successfully 👌",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Udpdate Category !!!",
    });
  }
};

//all Category Route
export const getAllCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(201).send({
      success: true,
      message: "All Categories 👌",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Get ALL Category !!!",
    });
  }
};

//get single category

export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(201).send({
      success: true,
      message: "getting Single Categories 👌",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Get Single Category !!!",
    });
  }
};

//delete Category

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(201).send({
      success: true,
      message: "Delete Category Successfully 👌",
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Get Delete Category !!!",
    });
  }
};
