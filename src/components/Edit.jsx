import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../utils/Context';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Edit() {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: ""
  });
  const { id } = useParams();

  useEffect(() => {
    const selectedProduct = products.find(product => product.id === parseInt(id));
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [id, products]);

  const onChangeHandle = (e) => {
    setProduct({...product, [e.target.name]: e.target.value });
  }

  const AddProductHandle = (event) => {
    event.preventDefault();

    if (!product.title.trim() || !product.image.trim() || !product.category.trim() || !product.price.trim() || !product.description.trim()) {
      toast.error('All fields are required');
      return;
    }

    const updatedProducts = products.map(p => (p.id === product.id ? product : p));
    setProducts(updatedProducts);

    // Store products in local storage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Show confirmation message before redirecting (optional)
    toast.success('Product updated successfully');

    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="flex justify-center flex-col items-center gap-3">
      <h1 className="font-bold font-sans text-3xl">Edit Product</h1>
      <form onSubmit={AddProductHandle} className="flex justify-center items-center flex-col w-[70%] gap-3">
        <input
          type="URL"
          placeholder="Image URL"
          className="w-full border border-r-gray-800 h-11 bg-slate-50"
          value={product?.image}
          name='image'
          onChange={onChangeHandle}
        />
        <input
          className="w-full border border-r-gray-800 h-11 bg-slate-50"
          type="text"
          placeholder="Title"
          value={product?.title}
          name='title'
          onChange={onChangeHandle}
        />
        <div className="w-full flex justify-between">
          <input
            value={product?.category}
            className="w-[48%] h-11 bg-slate-50 border border-r-gray-800"
            type="text"
            placeholder="Category"
            name='category'
            onChange={onChangeHandle}
          />
          <input
            value={product?.price}
            className="w-[47%] h-11 bg-slate-50 border border-r-gray-800"
            type="number"
            placeholder="Price"
            name='price'
            onChange={onChangeHandle}
          />
        </div>
        <textarea
          className="w-full border border-r-gray-800 h-44 bg-slate-50"
          name="Description"
          id=""
          cols="30"
          placeholder="Description"
          onChange={onChangeHandle}
          value={product?.description}
        ></textarea>
        <button className="h-11 w-48 border-2 hover:border-4 border-blue-400 text-blue-400 font-bold">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default Edit;
