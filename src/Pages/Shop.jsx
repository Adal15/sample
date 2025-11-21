import { useEffect, useState } from "react";
import constantApi from "../constantApi";
import axios from "axios";
import { useCart } from "../CartContext/CartContext";
import { Link } from "react-router-dom";
import Select from "react-select";

function Shop() {
  const [categories, setCategories] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);

  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);

  const BASE_URL = constantApi.baseUrl; // Update with your backend URL

  useEffect(() => {
    axios
      .post(`${constantApi.baseUrl}/item_department/list`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const [products, setProducts] = useState([]);

  const handleCategory = (id) => {
    setFilterCategories((prev) => {
      if (prev.includes(id)) {
        return prev.filter((categoryId) => categoryId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(`${constantApi.baseUrl}/item/list`);
      // Ensure filterCategories is an array
      const selectedCategories = Array.isArray(filterCategories)
        ? filterCategories
        : [filterCategories];

      if (selectedCategories.length === 0) {
        setProducts(response.data.data);
      } else {
        const filterData = response.data.data.filter((category) =>
          selectedCategories.includes(category.item_department.id)
        );
        setProducts(filterData);
        console.log("filterData", filterData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBrand = async () => {
    try {
      const response = await axios.post(`${constantApi.baseUrl}/brand/list`);
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchSize = async () => {
    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/size_master/list`
      );
      // console.log("response is size ", response.data.data);
      setSizes(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBrand();
    fetchSize();
  }, [filterCategories]);

  const baseUrl = `${constantApi.imageUrl}/uploads/itemsImage/`;
  const { addToCart } = useCart();

  const handleCategoryChange = (selectedOptions) => {
    setFilterCategories(selectedOptions.map((option) => option.value));
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.itemdeptname,
  }));

  return (
    <>
      <div class="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        {/* <!-- ./sidebar --> */}
        {/* <div class="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block"> */}
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded hidden md:block h-screen sticky top-0 overflow-y-auto">
          <div class="divide-y divide-gray-200 space-y-5">
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <Select
                options={categoryOptions}
                isMulti
                onChange={handleCategoryChange}
                value={categoryOptions.filter((option) =>
                  filterCategories.includes(option.value)
                )}
                placeholder="Select categories..."
                className="text-gray-600"
              />
            </div>

            {/* <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div
                    onClick={() => handleCategory(category.id)}
                    key={category.id}
                    className="flex items-center"
                  >
                    <input
                      type="checkbox"
                      name={`cat-${category.id}`}
                      id={`cat-${category.id}`}
                      className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                      onChange={() => handleCategory(category.id)}
                      checked={filterCategories.includes(category.id)}
                    />
                    <label
                      htmlFor={`cat-${category.id}`}
                      className="text-gray-600 ml-3 cursor-pointer"
                    >
                      <div className="flex items-center justify-center">
                        <h1 className="text-center">{category.itemdeptname}</h1>
                      </div>
                    </label>
                    <div className="ml-auto text-gray-600 text-sm">
                      12
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Brands
              </h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center">
                    <input
                      type="checkbox"
                      name={`brand-${brand.id}`}
                      id={`brand-${brand.id}`}
                      className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                    />
                    <label
                      htmlFor={`brand-${brand.id}`}
                      className="text-gray-600 ml-3 cursor-pointer"
                    >
                      {brand.brandname}
                    </label>
                    {/* <div className="ml-auto text-gray-600 text-sm">
                      ({brand.count})
                    </div> */}
                  </div>
                ))}
              </div>
            </div>

            <div class="pt-4">
              <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">
                Price
              </h3>
              <div class="mt-4 flex items-center">
                <input
                  type="text"
                  name="min"
                  id="min"
                  class="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                  placeholder="min"
                />
                <span class="mx-3 text-gray-500">-</span>
                <input
                  type="text"
                  name="max"
                  id="max"
                  class="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                  placeholder="max"
                />
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Size
              </h3>
              <div className="flex items-center gap-2">
                {sizes.map((size) => (
                  <div key={size} className="size-selector">
                    <input
                      type="radio"
                      name="size"
                      id={`size-${size}`}
                      className="hidden"
                    />
                    <label
                      htmlFor={`size-${size}`}
                      className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                    >
                      {size.itemsizename}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- products --> */}

        <div className="col-span-3">
          {/* <div className="col-span-3 h-screen overflow-y-auto"> */}
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow rounded overflow-hidden group h-100"
              >
                <div className="h-60 flex justify-center items-center overflow-hidden">
                  {product.item_master_image[0]?.main_image && (
                    <Link to={`/items/${product.id}`}>
                      <img
                        // src={`${baseUrl}/${product.item_image}`}
                        src={`${baseUrl}${product.item_master_image[0].main_image}`}
                        alt={product.item_name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    // <img
                    //   src={`${baseUrl}${product.item_master_image[0].left_image}`}
                    //   alt="Left"
                    //   className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                    // />
                  )}
                </div>
                <div className="">
                  <div className="pt-4 pb-3 px-4 h-32">
                    {/* Clickable Product Name */}
                    <p className=" font-medium text-xl mb-2 text-gray-800 hover:text-blue-500 transition">
                      {product.item_name}
                    </p>
                    <div className="flex items-baseline mb-1 space-x-2">
                      <p className="text-xl text-primary font-semibold">
                        Rs {product.itemprice}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.itemlanprice}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
