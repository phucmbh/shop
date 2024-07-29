const adminRouter = require('./admin');
const categoryRouter = require('./category.route');
const productRouter = require('./product.route');
const purchaseRouter = require('./purchase.route');
const userRouter = require('./user.route');

const initRouters = (app) => {
  app.use('/admin', adminRouter);
  app.use('/categories', categoryRouter);
  app.use('/products', productRouter);
  app.use('/purchases', purchaseRouter);
  app.use('/users', userRouter);
  
};

module.exports = initRouters;
