import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";

// create category controller now define at Categoryroute
export let createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(401).send({
        message: "name is required",
      });
    }

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      res
        .status(200)
        .send({ success: true, message: "category already existed" });
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(201)
      .send({ success: true, message: "category created", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Category Server Error",
      error,
    });
  }
};

// update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "category update successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "update category error",
      error,
    });
  }
};

// getAll category controller
export const getCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "getting all category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "get all categories failed",
      error,
    });
  }
};

// single categorry controller
export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });

    res.status(200).send({
      success: true,
      message: "get single category finded",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "single category not found",
      error,
    });
  }
};


// delete category controller
export const deleteCategoryController = async(req,res)=>{
    try {
        const { id} = req.params;
        const category = await CategoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success :true,
            message :"category deleted successfully",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:"delete failed",
            error,
        })
    }
}