import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from '../utils/Context'

function Details() {
  const navigate = useNavigate()
  const [products, setProducts] = useContext(ProductContext)
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const handleDelete = (id) => {
    let filteredProducts = products.filter((product) => product.id !== id)
    setProducts(filteredProducts)
    localStorage.setItem("products", JSON.stringify(filteredProducts))
    navigate("/")
  };

  useEffect(() => {
    if (!product) {
      setProduct(products.filter((p) => p.id == id)[0])
    }
  }, [products, id, product]);

  return (
    product ? 
    <div className="flex justify-center items-center h-screen w-full px-64 gap-12">
      <img src={product.image} alt="" className="h-80 w-72 object-contain"/>
      <div className="text-xl">
        <h1 className="font-bold">{product.title}</h1>
        <h2><span className="font-semibold">Price: ₹</span>{product.price}</h2>
        <p><span className="font-semibold">Description: </span>{product.description}</p>
        <div>
          <Link className="h-11 border-2 hover:border-4 hover:py-2  border-blue-400 text-blue-400 font-bold py-2 px-7 mr-4" to={`/edit/${product.id}`} >Edit</Link>
          <button className="h-11 w-28 border-2 hover:border-4 border-blue-400 text-blue-400 font-bold" onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      </div>
    </div>
    : <Loading />
  );
}

export default Details;
