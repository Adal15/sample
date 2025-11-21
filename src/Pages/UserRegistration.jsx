import React, { useState } from "react";
import axios from "axios";
import constantApi from "../constantApi";
import { Link } from "react-router-dom";

const UserRegistration = () => {
  // Initialize state for each form field
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    address_line_1: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    created_by: "admin",
    updated_by: "admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/ecommerce/register`,
        formData
      );
      console.log(response.data);
      alert("User created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating user");
    }
  };

  return (
    <div class="contain py-16 px-20 ">
      <div class="w-full shadow px-6 py-7 rounded overflow-hidden">
        <h2 class="text-2xl uppercase font-medium mb-1">Create an account</h2>
        <p class="text-gray-600 mb-6 text-sm">Register for new cosutumer</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="first_name" className="block text-black">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name" className="block text-black">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="email" className="block text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="block text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="phone_number" className="block text-black">
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address_line_1" className="block text-black">
                Address Line 1
              </label>
              <input
                type="text"
                id="address_line_1"
                name="address_line_1"
                value={formData.address_line_1}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="city" className="block text-black">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state" className="block text-black">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="country" className="block text-black">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group">
              <label htmlFor="postal_code" className="block text-black">
                Postal Code
              </label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-black rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <p class="mt-4 text-center text-gray-600">
          Already have account?{" "}
          <Link to="/login" class="text-primary">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegistration;
