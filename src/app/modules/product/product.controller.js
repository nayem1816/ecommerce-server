const sendResponse = require("../../../shared/sendResponse");
const ProductService = require("./product.service");

const createProduct = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("Please upload a file");
    }

    const productImage = {
      url: req.file.path,
      public_id: req.file.filename,
    };

    const data = JSON.parse(req.body.data);

    const result = await ProductService.createProductService(
      data,
      productImage
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const result = await ProductService.getAllProductService();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Get all product successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProduct,
};
