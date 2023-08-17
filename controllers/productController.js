import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs, { statSync } from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, price, category, description, quantity } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required!!!" });
      case !description:
        return res.status(500).send({ error: "Description is Required!!!" });
      case !price:
        return res.status(500).send({ error: "Price is Required!!!" });
      case !category:
        return res.status(500).send({ error: "Category is Required!!!" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required!!!" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and Should be less than 1mb!!!" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Added Successfully😘",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Create Product Controller!!!",
      error,
    });
  }
};

// Get All Product Controller
export const getAllProducts = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      countTotal: product.length,
      message: "Successfully Get All the Products👌",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Get All Controller!!!",
      error,
    });
  }
};

// Get Single Product Controller
export const singleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(201).send({
      success: true,
      message: "Successfully Get the Single product!!!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Single Product Controller!!!",
      error,
    });
  }
};

//Get Photo Controller
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(201).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Get Photo Controller!!!",
      error,
    });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Delete Product Controller!!!",
      error,
    });
  }
};

//update product Controller
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required!!!" });
      case !description:
        return res.status(500).send({ error: "Description is Required!!!" });
      case !price:
        return res.status(500).send({ error: "Price is Required!!!" });
      case !category:
        return res.status(500).send({ error: "Category is Required!!!" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required!!!" });
      // case !photo:
      //   return res
      //     .status(500)
      //     .send({ error: "Photo is Required and Should be less than 1mb!!!" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully😘",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Update Controller",
      error,
    });
  }
};

//filter
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked && checked.length > 0) args.category = checked;
    if (radio.length > 0) args.category = { $gte: radio[0], lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Product Filter Controller",
      error,
    });
  }
};
