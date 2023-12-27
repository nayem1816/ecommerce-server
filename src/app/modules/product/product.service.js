const Product = require("./product.model");

const createProductService = async (payload, productImage) => {
  const requiredFields = ["productName", "sizePrice", "stock"];

  for (const field of requiredFields) {
    if (!payload[field]) {
      throw new ApiError(400, `Please provide ${field}`);
    }
  }

  const newData = {
    ...payload,
  };

  if (productImage) {
    newData.productImage = productImage;
  }

  const result = await Product.create(newData);

  return result;
};

const getAllProductService = async () => {
  const result = await Product.find({});

  return result;
};

module.exports = {
  createProductService,
  getAllProductService,
};
