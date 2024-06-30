const userRouter = require('./admin.user.route');
const authRouter = require('./admin.auth.route');
const categoryRouter = require('./admin.category.route');
const productRouter = require('./admin.product.route');

const router = require('express').Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/', authRouter);

module.exports = router;
