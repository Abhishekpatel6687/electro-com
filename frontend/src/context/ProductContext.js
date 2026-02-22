import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/ProductReducer";
// import { products } from "../Helpers/ProductData";

const AppContext = createContext();



const API = "http://localhost:8080/api/products";
// const API = "https://electro-com.onrender.com/api/products"

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

console.log("initialState",initialState);
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
 
  const getProducts = async () => {
    dispatch({ type: "SET_LOADING" });
    
    try {
    const res = await axios.get(API);
      dispatch({ type: "SET_API_DATA", payload: res.data });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  
  // my 2nd api call for single product
  const getSingleProduct = async (product) => {
    console.log("get single product function called",product);

    try {
        const res = await axios.get(`${API}/${product.id}`);
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: res.data });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <AppContext.Provider value={{ ...state, getSingleProduct, getProducts }}>
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
