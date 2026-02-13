import { createUserTable } from "./tables/userTable.js";
// import { createProductTable } from "./tables/productTable.js";

export const initializeTables = async () => {
  try {
    await createUserTable();
    // await createProductTable();

    console.log("All tables initialized 🚀");

  } catch (error) {
    console.error("Error initializing tables ❌", error);
  }
};
