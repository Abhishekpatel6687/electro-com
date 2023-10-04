import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from "../reducer/FilterReducer";
 
const FilterContext = createContext();

const initalState = {
    filter_products: [],
    all_products: [],        
    grid_view: true, 
    sorting_value: "lowest",
    filters: {
    text:"",
    category: "all",
    company:"all",
    },
}

export const FilterContextProvider = ({ children }) => {

    const { products } = useProductContext();
    // console.log("products", products)

    const [state, dispatch] = useReducer(reducer, initalState)

    // to set the grid view
    const setGridView =() =>{
        return dispatch({ type: "SET_GRID_VIEW" })
    }

    // to set the list view
    const setListView =() =>{
        return dispatch({type: "SET_LIST_VIEW" })
    };

    // sorting function 
    const sorting = (event) => {
        let userValue = event.target.value;
        dispatch({ type: "GET_SORT_VALUE", payload:userValue })
    }

    //upadte the filter value
    const updateFilterValue = (event) =>{
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({type:"UPDATE_FILTER_VALUE", payload:{name, value}})
    }
    
    // to sort the product
    useEffect(() => {
        dispatch({type:"FILTER_PRODUCTS"})
      dispatch({ type: "SORTING_PRODUCTS", payload:products })
    },[products, state.sorting_value, state.filters])

    useEffect(() => { 
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload: products })
    },[products])

    return(
    <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting, updateFilterValue }}>
        { children }
    </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};