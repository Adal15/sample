import { useEffect, useState } from "react";
import constantApi from "../constantApi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const ImageUrl = `${constantApi.imageUrl}/uploads/catImage/`;
  console.log("API ImageUrl:", ImageUrl);

  useEffect(() => {
    axios
      // .post(`${constantApi.baseUrl}/item_category/list`)
      .get(`${constantApi.baseUrl}/item_department/dropdown-list`)

      .then((res) => {
        console.log("API Response:", res.data.data); // Debug API response
        setCategories(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (categories.length === 0) {
    return <p>Loading categories...</p>;
  }

  // Function to handle navigation when a category is clicked
  const handleCategoryClick = (id) => {
    navigate(`itemlist/${id}`);
    console.log("index is ", id);
  };

  return (
    <div className="container py-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        Shop by Category
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {categories.map((category, index) => (
          <div
            className="relative rounded-sm overflow-hidden group"
            key={index}
            onClick={() => handleCategoryClick(category.id)}
          >
            <img
              src={`${ImageUrl}/${category.image}`}
              alt={category.itemdeptname}
              className="w-full"
            />
            <p className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              {category.itemdeptname}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
