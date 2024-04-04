const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct);
router.get("/products", adminController.getProducts);
router.get("/login", adminController.getLogin);
router.get("/logout", adminController.getLogout);
router.get("/edit-product", adminController.getEditProduct);
router.get("/", adminController.getAdmin);

router.post("/add-product", adminController.postAddProduct);
router.post("/login", adminController.postLogin);
router.post("/edit-product", adminController.postEditProduct);
router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
