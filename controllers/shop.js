const { Product , cart} = require("../models/product");
exports.getProducts = (req, res, next) => {
  let itemsPerPage;
  let view;
  let pageTitle;

  if (req.route.path === "/") {
    itemsPerPage = 3;
    view = "shop/index";
    pageTitle = "Shop";
  } else if (req.route.path === "/products") {
    itemsPerPage = 6;
    view = "shop/product-list";
    pageTitle = "List";
  }

  const page = +req.query.page || 1;

  let totalProducts;

  Product.fetchAll()
    .then((products) => {
      totalProducts = products.length;
      const startIndex = (page - 1) * itemsPerPage;
      const paginatedProducts = products.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      res.render(view, {
        prods: paginatedProducts,
        pageTitle: pageTitle,
        currentPage: page,
        hasNextPage: itemsPerPage * page < totalProducts,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalProducts / itemsPerPage),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render("error", {
        pageTitle: "Error",
        errorCode: 500,
        errorMesage: "Something went wrong",
      });
    });
};

exports.getProductDetails = (req, res, next) => {
  // console.log(req.query.id);

  const id = req.query.id;

  if (!id) {
    return res.redirect('/');
  }

  Product.findById(id)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('shop/product-details', {
        product: product,
        pageTitle: 'Edit Product',
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render("error", {
        pageTitle: "Error",
        errorCode: 500,
        errorMesage: "Something went wrong",
      });
    });
};

exports.getCart = (req, res, next) => {    
  res.render('shop/cart', {
    pageTitle: 'Cart',
    cart: cart,
  });
};

exports.postAddToCart = (req, res, next) =>{
  const id = req.body.productId;

  if (!id) {
    return res.redirect('/');
  }

  Product.addToCart(id)
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render("error", {
        pageTitle: "Error",
        errorCode: 500,
        errorMesage: "Something went wrong",
      });
    });
};

exports.postDeleteFromCart = (req, res, next) =>{
  const id = req.body.productId;

  if (!id) {
    return res.redirect('/');
  }

  Product.deleteFromCart(id)
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render("error", {
        pageTitle: "Error",
        errorCode: 500,
        errorMesage: "Something went wrong",
      });
    });
};

