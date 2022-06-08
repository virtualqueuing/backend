const { Router } = require('express');

const {
  getProductList,
  getProductByCode,
  addProduct,
  updateProductByCode,
  getProductByState,
} = require('../controllers/product');

const productRouter = Router();

productRouter.get('', getProductList);
productRouter.post('', addProduct);
productRouter.get('/:code', getProductByCode);
productRouter.put('/:code', updateProductByCode);
productRouter.get('/:state', getProductByState);


module.exports = productRouter;
