import React, { useEffect, useState } from 'react'
import FilterSection from './FilterSection'
import ProductList from './ProductList'
import axios from 'axios'

import { useProductContext } from '../../Context/ProductsContext'
import { fetchProducts, fetchAllProducts, fetchError, fetchClearProducts, fetchCatgories } from '../../Actions/ProductsAction'

const Products = () => {

  // const [products, setProducts] = useState([]);
  // const [allProducts, setAllProducts] = useState([]);
  // const [error, setError] = useState('');

  const { state, dispatch } = useProductContext();
  const { products, allProducts, error, categories } = state;
  const token = sessionStorage.getItem('Token');


  // useEffect(() => {
  //   const fetchProductData = async() => {
  //     try {
  //       const response = await axios.get(`https://localhost:7148/api/Products`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         }
  //       });
  //       setProducts(response.data);
  //       setAllProducts(response.data);
  //     } catch (err) {
  //       setError('Error fetching products');
  //       console.error(err);
  //   }
  //   }
  //   fetchProductData();
  // }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://localhost:7148/api/Products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        dispatch(fetchProducts(response.data));
        dispatch(fetchAllProducts(response.data));
        dispatch(fetchCatgories(getUniqueCategories(response.data)));
      } catch (error) {
        dispatch(fetchError(`Some problem occured ${error.message}`));
      }
    }
    fetchProductData();
  }, []);


  // const fetchProductCategory = async(category) => {
  //   try {
  //     const response = await axios.get(`https://localhost:7148/api/Products/category/${category}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     });
  //     setProducts(response.data);
  //   } catch (err) {
  //     setError('Error fetching products by category');
  //     console.error(err);
  //   }
  // };

  const fetchProductCategory = async (category) => {
    try {
      const response = await axios.get(`https://localhost:7148/api/Products/category/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      dispatch(fetchProducts(response.data));
    } catch (error) {
      dispatch(fetchError(`Some problem occured ${error.message}`));
    }
  }

  const getUniqueCategories = (data) => {
    const allCategories = data.map((product) => product.productCategory);
    return [...new Set(allCategories)];
  };

  //   const clearFilters = () => {
  //     setProducts(allProducts); 
  // };

  const clearFilters = () => {
    dispatch(fetchClearProducts());
  }

  return (
    <section className="flex flex-col md:flex-row">


      <div className="w-full md:w-1/3 p-4">
        <FilterSection categories={categories} onCategoryClick={fetchProductCategory} onClearFilters={clearFilters} />
      </div>



      <div className="w-full md:w-2/3 p-4">
        <ProductList products={products} />
      </div>
    </section>
  )
}

export default Products
