import React from 'react'
import { useFilterContext } from '../context/Filter_Contaxt';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
    const { filter_products, grid_view } = useFilterContext();

    if(grid_view === true){
      return <GridView products = { filter_products } />
    }

    if(grid_view === false){
      return <ListView products = { filter_products } />
    }
  return (
    <div>
      Products
    </div>
  )
}

export default ProductList;
