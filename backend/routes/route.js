router.post(
  "/add-product",
  upload.single("image"),
  addProductController
);