import React, { useContext, useState } from 'react';
import { ProductContext } from '../utils/Context';
import { useNavigate } from 'react-router-dom';
import {nanoid} from 'nanoid';
import { toast } from 'react-toastify';

const Create = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  const AddProductHandle = (event) => {
    event.preventDefault();

    if (!title.trim() || !image.trim() || !category.trim() || !price.trim() || !description.trim()) {
      toast.error('All fields are required');
      return;
    }

    const product = {
      id: nanoid(),
      image,
      title,
      category,
      price,
      description,
    };

    setProducts([...products, product]);

    // Store products in local storage
    localStorage.setItem('products', JSON.stringify([...products, product]));

    // Show confirmation message before redirecting (optional)
    toast.success("product added successfully");
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="flex justify-center flex-col items-center gap-3">
      <h1 className="font-bold font-sans text-3xl">Add New Product</h1>
      <form onSubmit={AddProductHandle} className="flex justify-center items-center flex-col w-[70%] gap-3">
        <input
          type="URL"
          placeholder="Image URL"
          className="w-full border border-r-gray-800 h-11 bg-slate-50"
          value={image}
          onChange={handleImageChange}
        />
        <input
          className="w-full border border-r-gray-800 h-11 bg-slate-50"
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <div className="w-full flex justify-between">
          <input
            value={category}
            className="w-[48%] h-11 bg-slate-50 border border-r-gray-800"
            type="text"
            placeholder="Category"
            onChange={handleCategoryChange}
          />
          <input
            value={price}
            className="w-[47%] h-11 bg-slate-50 border border-r-gray-800"
            type="number"
            placeholder="Price"
            onChange={handlePriceChange}
          />
        </div>
        <textarea
          className="w-full border border-r-gray-800 h-44 bg-slate-50"
          name="Description"
          id=""
          cols="30"
          placeholder="Description"
          onChange={handleDescChange}
          value={description}
        ></textarea>
        <button className="h-11 w-48 border-2 hover:border-4 border-blue-400 text-blue-400 font-bold">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Create;
