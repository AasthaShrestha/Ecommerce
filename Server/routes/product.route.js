const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/auth.middleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").at(-1);
    cb(null, uniqueSuffix + "." + extension);
  },
});
const upload = multer({ storage: storage });
const {
  getProductById,
  deleteProduct,
  updateProduct,
  getProducts,
  addProduct,
  createOrder,
  getFeaturedProducts,
  getLatestProducts
} = require("../controllers/product.controller");

router.get("/", getProducts);
router.get("/featured",getFeaturedProducts );
router.get("/latest", getLatestProducts);

router.post("/", checkAuth(), upload.single("image"), addProduct);

router.patch("/:id", checkAuth("Admin"), updateProduct);

router.delete("/:id", checkAuth("Admin"), deleteProduct);

router.get("/:id", getProductById);
router.post("/order", checkAuth(), createOrder);

module.exports = router;
