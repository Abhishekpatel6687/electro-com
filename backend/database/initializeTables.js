import { createProductImagesTable } from "./tables/imageTable.js";
import { createProductsTable } from "./tables/productTable.js";
import { createUserTable } from "./tables/userTable.js";
import { createCartTable } from "./tables/AddToCartTable.js";
import { createOrderItemsTable, createOrdersTable } from "./tables/orderTable.js";


export const initializeTables = async () => {
  try {
    await createUserTable();
    await createProductsTable();
    await createProductImagesTable();
    await createCartTable();
    await createOrdersTable();
    await createOrderItemsTable();

    console.log("All tables initialized 🚀");
  } catch (error) {
    console.error("Table initialization error:", error);
  }
};