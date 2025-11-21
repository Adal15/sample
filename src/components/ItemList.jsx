import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../CartContext/CartContext";
import constantApi from "../constantApi";

function ItemList() {
  const baseUrl = `${constantApi.imageUrl}/uploads/itemsImage/`;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.post(`${constantApi.baseUrl}/item/list`);
      const categoryIdNum = parseInt(categoryId, 10); // Convert categoryId to a number
      const filteredData = response.data.data.filter(
        (item) => item.item_department.id === categoryIdNum
      );
      setProducts(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]); // Include categoryId in the dependency array

  return (
    <div className="container pb-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow rounded overflow-hidden group mt-12"
          >
            <div className="relative">
              <div className="h-60 flex justify-center items-center overflow-hidden">
                <img
                  // src={`${baseUrl}/${product.item_image}`}
                  src={`${baseUrl}${product.item_master_image[0].main_image}`}
                  alt={product.item_name}
                  className="w-full h-48 object-cover mb-3 rounded"
                />
                {/* <img
                        src={`${baseUrl}${item.item_master_image[0].main_image}`}
                        alt={item.item_name}
                        className="w-full h-full object-cover"
                      /> */}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <Link
                  to={`/items/${product.id}`}
                  className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                  title="View product"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                  title="Add to wishlist"
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <Link to={`/items/${product.id}`}>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                  {product.item_name}
                </h4>
              </Link>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-semibold">
                  Rs {product.itemprice}
                </p>
                {product.itemlanprice && (
                  <p className="text-sm text-gray-400 line-through">
                    Rs {product.itemlanprice}
                  </p>
                )}
              </div>
              {product.itemrating && (
                <div className="flex items-center">
                  <div className="flex gap-1 text-sm text-yellow-400">
                    {Array.from({ length: product.itemrating }, (_, index) => (
                      <span key={index}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                    ))}
                  </div>
                  {product.itemreviews && (
                    <div className="text-xs text-gray-500 ml-3">
                      ({product.itemreviews})
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => addToCart(product)}
              className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
