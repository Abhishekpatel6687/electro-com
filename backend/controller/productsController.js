export const addProductController = async (req, res) => {
  const { name, price } = req.body;

  const image = req.file
    ? `uploads/products/${req.file.filename}`
    : null;

  // DB me image save karo
};
