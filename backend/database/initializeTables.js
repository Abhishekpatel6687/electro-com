import { createProductImagesTable } from "./tables/imageTable.js";
import { createProductsTable } from "./tables/productTable.js";
import { createUserTable } from "./tables/userTable.js";

export const initializeTables = async () => {
  try {
    await createUserTable();
    await createProductsTable();
    await createProductImagesTable();

    console.log("All tables initialized 🚀");
  } catch (error) {
    console.error("Table initialization error:", error);
  }
};