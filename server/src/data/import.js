const Product = require('../model/Product');
const products = require('./product.json');
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://hphucdev:hphucdev@cluster0.cgmx86u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    autoIndex: true,
  }
);

Product.collection.insertMany(products).then(
  () => {
    return console.log('Import products done');
  },
  (error) => {
    return console.log(error);
  }
);
