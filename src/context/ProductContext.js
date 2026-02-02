import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/ProductReducer";
import { products } from "../Helpers/ProductData";

const AppContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
 
  const getProducts = async (products) => {
    dispatch({ type: "SET_LOADING" });
    try {
  
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // my 2nd api call for single product

  const getSingleProduct = async () => {
    console.log("get single product function called",products);

    try {
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: products });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(products);
  }, []);

  return (
    <>
      <AppContext.Provider value={{ ...state, getSingleProduct }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
