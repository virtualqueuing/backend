const { Router } = require('express');

const {
  getProductList,
  getProductByCode,
  addProduct,
  updateProductByCode,
  //June 7th, Stephy's code --start//
  getProductByState,
  //June 7th, Stephy's code --end//
} = require('../controllers/product');

const productRouter = Router();

productRouter.get('', getProductList);
productRouter.post('', addProduct);
productRouter.get('/:code', getProductByCode);
productRouter.put('/:code', updateProductByCode);
 //June 7th, Stephy's code --start//
 productRouter.get('/:state', getProductByState);
//June 7th, Stephy's code --end//

module.exports = productRouter;
