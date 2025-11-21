import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import constantApi from "../constantApi";
import { useCart } from "../CartContext/CartContext";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const BASE_URL = constantApi.baseUrl;

  useEffect(() => {
    axios
      .post(`${BASE_URL}/item/details`, {
        id: params.id,
      })
      .then((res) => {
        setProduct(res.data.data);
        console.log(
          "response from product detail is form items list is ",
          res.data.data
        );
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }
  const baseUrl = `${constantApi.imageUrl}/uploads/itemsImage/`;

  // const imageFilename = product.item_image.split("/").pop();
  // const imageUrl = `${baseUrl}${imageFilename}`;
  console.log("product list is", product.item_master_image[0].id);

  return (
    <>
      <div className="container grid grid-cols-2 gap-8 p-6">
        {/* Product Image and Thumbnails */}
        <div>
          <img
            src={`${baseUrl}${product.item_master_image[0]?.main_image}`}
            alt="Main"
            className="w-full h-40 object-cover rounded-lg shadow-md"
          />
          {/* <div className="grid grid-cols-4 gap-2 mt-4">
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={product.item_name}
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
              />
            ))}
          </div> */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {product.item_master_image[0]?.left_image && (
              <img
                src={`${baseUrl}${product.item_master_image[0].left_image}`}
                alt="Left"
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
              />
            )}
            {product.item_master_image[0]?.right_image && (
              <img
                src={`${baseUrl}${product.item_master_image[0].right_image}`}
                alt="Right"
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
              />
            )}
            {product.item_master_image[0]?.front_image && (
              <img
                src={`${baseUrl}${product.item_master_image[0].front_image}`}
                alt="Front"
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
              />
            )}
            {product.item_master_image[0]?.back_image && (
              <img
                src={`${baseUrl}${product.item_master_image[0].back_image}`}
                alt="Back"
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
              />
            )}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h2 className="text-3xl font-semibold mb-2">{product.item_name}</h2>
          <p className="text-gray-700 mb-4">{product.itemdesc}</p>

          <div className="space-y-2">
            <p className="text-gray-800 font-semibold">
              Availability: <span className="text-green-600">In Stock</span>
            </p>
            <p className="text-gray-800 font-semibold">
              Brand:{" "}
              <span className="text-gray-600">{product.brand.brandname}</span>
            </p>
            <p className="text-gray-800 font-semibold">
              Category:{" "}
              <span className="text-gray-600">
                {product.family_master.itemfamname}
              </span>
            </p>
          </div>

          {/* Pricing Section */}
          <div className="flex items-baseline space-x-3 font-roboto mt-4">
            <p className="text-xl text-gray-900 font-semibold">
              ₹{product.itemprice}
            </p>
            <p className="text-base text-red-500 line-through">
              ₹{product.itemlanprice}
            </p>
          </div>

          {/* Size Selection */}
          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-2">
              Select Size
            </h3>
            <div className="flex gap-3">
              <label className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-100">
                <input type="radio" name="size" className="hidden" />
                {product.size_master.itemsizename}
              </label>
            </div>
          </div>

          {/* Product Details Table */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold border-b pb-2">
              Product Details
            </h3>
            <p className="text-gray-600 mt-3">{product.itemdesclong}</p>
            <table className="w-full text-left text-gray-600 text-sm mt-4 border border-gray-200">
              <tbody>
                <tr>
                  <th className="px-4 py-2 border">Color</th>
                  <td className="px-4 py-2 border">
                    {product.item_color.itemcolname}
                  </td>
                </tr>
                <tr>
                  <th className="px-4 py-2 border">Material</th>
                  <td className="px-4 py-2 border">Latex</td>
                </tr>
                <tr>
                  <th className="px-4 py-2 border">Weight</th>
                  <td className="px-4 py-2 border">{product.itmwweight}gm</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div class="container pb-16">
        <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
          Related products
        </h2>
        <div class="grid grid-cols-4 gap-6">
          <div class="bg-white shadow rounded overflow-hidden group">
            <div class="relative">
              <img
                src="../assets/images/products/product1.jpg"
                alt="product 1"
                class="w-full"
              />
              <div
                class="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
              >
                <a
                  href="#"
                  class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                  title="view product"
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </a>
                <a
                  href="#"
                  class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                  title="add to wishlist"
                >
                  <i class="fa-solid fa-heart"></i>
                </a>
              </div>
            </div>
            <div class="pt-4 pb-3 px-4">
              <a href="#">
                <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                  Guyer Chair
                </h4>
              </a>
              <div class="flex items-baseline mb-1 space-x-2">
                <p class="text-xl text-primary font-semibold">$45.00</p>
                <p class="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div class="flex items-center">
                <div class="flex gap-1 text-sm text-yellow-400">
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                </div>
                <div class="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <a
              href="#"
              class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
            >
              Add to cart
            </a>
          </div>
          <div class="bg-white shadow rounded overflow-hidden group">
            <div class="relative">
              <img
                src="../assets/images/products/product4.jpg"
                alt="product 1"
                class="w-full"
              />
              <div
                class="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
              >
                <a
                  href="#"
                  class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                  title="view product"
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </a>
                <a
                  href="#"
                  class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                  title="add to wishlist"
                >
                  <i class="fa-solid fa-heart"></i>
                </a>
              </div>
            </div>
            <div class="pt-4 pb-3 px-4">
              <a href="#">
                <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                  Bed King Size
                </h4>
              </a>
              <div class="flex items-baseline mb-1 space-x-2">
                <p class="text-xl text-primary font-semibold">$45.00</p>
                <p class="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div class="flex items-center">
                <div class="flex gap-1 text-sm text-yellow-400">
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                </div>
                <div class="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <a
              href="#"
              class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
            >
              Add to cart
            </a>
          </div>
          <div class="bg-white shadow rounded overflow-hidden group">
            <div class="relative">
              <img
                src="../assets/images/products/product2.jpg"
                alt="product 1"
                class="w-full"
              />
              <div
                class="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
              >
                <a
                  href="#"
                  class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                  title="view product"
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </a>
                <a
                  href="#"
                  class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                  title="add to wishlist"
                >
                  <i class="fa-solid fa-heart"></i>
                </a>
              </div>
            </div>
            <div class="pt-4 pb-3 px-4">
              <a href="#">
                <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                  Couple Sofa
                </h4>
              </a>
              <div class="flex items-baseline mb-1 space-x-2">
                <p class="text-xl text-primary font-semibold">$45.00</p>
                <p class="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div class="flex items-center">
                <div class="flex gap-1 text-sm text-yellow-400">
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                </div>
                <div class="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <a
              href="#"
              class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
            >
              Add to cart
            </a>
          </div>
          <div class="bg-white shadow rounded overflow-hidden group">
            <div class="relative">
              <img
                src="../assets/images/products/product3.jpg"
                alt="product 1"
                class="w-full"
              />
              <div
                class="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
              >
                <a
                  href="#"
                  class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                  title="view product"
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </a>
                <a
                  href="#"
                  class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                  title="add to wishlist"
                >
                  <i class="fa-solid fa-heart"></i>
                </a>
              </div>
            </div>
            <div class="pt-4 pb-3 px-4">
              <a href="#">
                <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                  Mattrass X
                </h4>
              </a>
              <div class="flex items-baseline mb-1 space-x-2">
                <p class="text-xl text-primary font-semibold">$45.00</p>
                <p class="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div class="flex items-center">
                <div class="flex gap-1 text-sm text-yellow-400">
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                  <span>
                    <i class="fa-solid fa-star"></i>
                  </span>
                </div>
                <div class="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <a
              href="#"
              class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
            >
              Add to cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
