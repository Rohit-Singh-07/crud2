import React, { useContext, useState, useEffect } from 'react'
import Card from './Card'
import {ProductContext} from '../utils/Context'
import { Link, useLocation } from 'react-router-dom'
import axios from "../utils/axios";
import Loading from './Loading';


export default function Cards() {
  const [products] = useContext(ProductContext)
  const { search, pathname } = useLocation();
  const category = decodeURIComponent(search.split('=')[1]) ;
  const [filteredproducts, setFilteredProducts] = useState(null)

  const getFilteredProducts = async () => {
    try {
      const { data } = await axios(`/products/category/${category}`);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filteredproducts || category == "undefined") setFilteredProducts(products)
    if (category != "undefined") {getFilteredProducts();}
  }, [category, products]);

  return (
    <>
    {pathname !== "/" || search.length > 0 && <Link to={'/'} className='h-10 w-32 border-2 flex justify-center items-center'>Home</Link>}
    <div className='h-full flex flex-wrap gap-9 p-6 overflow-auto w-full'>
      {filteredproducts ? filteredproducts.map((item, index) => <Card item = {item}></Card>): <Loading/>}
    </div>
    </>
  )
}
