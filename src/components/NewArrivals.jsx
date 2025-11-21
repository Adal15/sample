import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../CartContext/CartContext";
import constantApi from "../constantApi";

function NewArrivals() {
  const baseUrl = `${constantApi.imageUrl}/uploads/itemsImage/`;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.post(`${constantApi.baseUrl}/item/list`);
      console.log("response is ", response.data.data);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        Top New Arrivals
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded">
            <div className="h-60 flex justify-center items-center overflow-hidden">
              {product.item_master_image[0]?.main_image && (
                <Link to={`/items/${product.id}`}>
                  <img
                    src={`${baseUrl}${product.item_master_image[0].main_image}`}
                    alt={product.item_name}
                    className="w-full h-full object-cover"
                  />
                </Link>
              )}
            </div>
            <div className="">
              <div className="pt-4 pb-3 px-4 h-32">
                <Link to={`/items/${product.id}`}>
                  <h4 className=" font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                    {product.item_name}
                  </h4>
                </Link>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">
                    Rs {product.itemprice}
                  </p>
                </div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className=" w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
