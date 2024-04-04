const { Product} = require('../models/product');
const Admin = require('../models/admin');

const admin = new Admin('admin', '0000');

exports.getAddProduct = (req, res, next) => {
  if (!admin.isLoggedIn) {
    return res.render('admin/login', {
      pageTitle: 'Login',
    });
  }
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
  });
};

exports.getLogin = (req, res, next) => {
  if (admin.isLoggedIn) {
    return res.redirect('/admin/products');
  }
  res.render('admin/login', {
    pageTitle: 'Login',
  });
};

exports.getEditProduct = (req, res, next) => {
  if (!admin.isLoggedIn) {
    return res.render('admin/login', {
      pageTitle: 'Login',
    });
  }

  const id = req.query.id;

  if (!id) {
    return res.redirect('/admin/products');
  }

  Product.findById(id)
    .then(product => {
      if (!product) {
        return res.redirect('/admin/products');
      }
      res.render('admin/edit-product', {
        product: product,
        pageTitle: 'Edit Product',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.query.id;
  Product.delete(id);
  res.redirect('/admin/products');
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title || 'no-title';
  const price = req.body.price || 0;
  const description = req.body.description || 'no-description';
  const product = new Product(title, price, description);
  product.save();

  res.redirect('/admin/products');
};

exports.postLogin = (req, res, next) => {
  admin.login(req.body.username, req.body.password);

  if (admin.isLoggedIn) {
    res.redirect('/admin/products');
  } else {
    res.redirect('/admin/login');
  }
};

exports.getLogout = (req, res, next) => {
  admin.logout();
  res.redirect('/admin/login');
};

exports.getProducts = (req, res, next) => {
  if (!admin.isLoggedIn) {
    return res.render('admin/login', {
      pageTitle: 'Login',
    });
  }

  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Products',
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).render('error', {
        pageTitle: 'Error',
        errorCode: 500,
        errorMesage: 'Something went wrong',
    });
    });
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title || 'no-title';
  const price = req.body.price || 0;
  const description = req.body.description || 'no-description';

  Product.edit(id, title, price, description);

  res.redirect('/admin/products');
};


exports.getAdmin = (req, res, next) => {
  if (!admin.isLoggedIn) {
    return res.render('admin/login', {
      pageTitle: 'Login',
    });
  }
  res.redirect('/admin/products');
};


