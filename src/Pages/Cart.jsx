import { useState, useEffect } from "react";
import { useCart } from "../CartContext/CartContext";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import constantApi from "../constantApi";
import axios from "axios";

function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigation = useNavigate();

  console.log("cart is --", cart);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userDetail = userData?.data?.user;

    if (userDetail) {
      setFormData({
        firstName: userDetail.first_name || "",
        lastName: userDetail.last_name || "",
        country: userDetail.country || "",
        address: userDetail.address_line_1 || "",
        city: userDetail.city || "",
        phone: userDetail.phone_number || "",
        email: userDetail.email || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.itemprice * item.quantity,
    0
  );

  const baseUrl = `${constantApi.imageUrl}/uploads/itemsImage/`;

  const [orderData, setOrderData] = useState({
    customer_id: "2",
    customer_lob: "Online",
    salesman_id: "Online",
    customer_lpo: "Dell Laptop",
    order_number: "123456",
    delivery_date: "12-12-12",
    payment_terms: "Online",
    location_id: "Online",
    company_id: "Online",
    due_date: "12-12-12",
    status: "Open",
    order_type: "Normal",
    type: "sales order",
    items: [
      {
        item_id: "101",
        uom: "pcs",
        quantity: 2,
        price: 500,
        discount: 0,
        net: 500,
        vat: 0,
        excise: 0,
        total: 500,
        ptr_di: 0,
        taxa_ble: 0,
        cgst: 0,
        sgst: 0,
        sgst_amount: 0,
        igst: 0,
        igst_amount: 0,
        discounttype: "None",
        skim: "Paid",
        itmexpiry: "12-12-12",
      },
    ],
  });

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/order/add`,
        orderData
      );
      console.log(response);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // const handlePlaceOrder = () => {
  //   const orderId = Math.floor(Math.random() * 1000000); // Generate a random order ID

  //   // Create an array to store cart items
  //   const cartItems = cart.map((item) => ({
  //     name: item.item_name,
  //     price: item.itemprice,
  //     quantity: item.quantity,
  //     total: item.itemprice * item.quantity,
  //   }));
  //   // Create form data object with user details
  //   const orderData = {
  //     orderId,
  //     firstName: formData.firstName,
  //     lastName: formData.lastName,
  //     country: formData.country,
  //     address: formData.address,
  //     city: formData.city,
  //     phone: formData.phone,
  //     email: formData.email,
  //     items: cartItems,
  //     totalAmount: subtotal,
  //   };

  //   console.log("Order Data:", orderData);

  //   // Show confirmation message
  //   Swal.fire({
  //     title: "Order Placed!",
  //     text: `Your order (#${orderId}) is placed. We will connect soon.`,
  //     icon: "success",
  //     confirmButtonText: "OK",
  //     timer: 2000, // Auto-close after 2 seconds
  //     showConfirmButton: false,
  //   }).then(() => {
  //     navigation("/");
  //   });
  // };
  const [selectedPayment, setSelectedPayment] = useState("");
  return (
    <>
      <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        <div className="col-span-8 border border-gray-200 p-4 rounded">
          <div className="space-y-3 text-sm">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-600 block mb-1">
                  First Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="text-gray-600 block mb-1">
                  Last Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Address fields */}
            <div>
              <label className="text-gray-600 block mb-1">Country/Region</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="text-gray-600 block mb-1">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="text-gray-600 block mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="text-gray-600 block mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="text-gray-600 block mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded"
                readOnly
              />
            </div>

            {/* Payment Section */}
            <div className="mt-5 border-t pt-4">
              <h3 className="text-base font-semibold text-gray-700 mb-3">
                Payment Method
              </h3>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="payment"
                  id="card"
                  className="accent-blue-600"
                  onChange={() => setSelectedPayment("card")}
                  checked={selectedPayment === "card"}
                />
                <label
                  htmlFor="card"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    alt="Visa"
                    className="h-5"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                    alt="Mastercard"
                    className="h-5"
                  />
                  <span>Credit/Debit Card</span>
                </label>
              </div>

              {/* Conditional Card Input Fields */}
              {selectedPayment === "card" && (
                <div className="space-y-4 p-4 border rounded-md bg-gray-50">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded-md"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="•••"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-4 border border-gray-200 p-1 rounded w-full">
          <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            Order Summary
          </h4>
          <div className="container py-4">
            {cart.length === 0 ? (
              <p>Your cart is empty!</p>
            ) : (
              <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                {/* Table Body */}
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-6 items-center py-1 px-2 border-b"
                  >
                    {/* Image */}
                    <div className="flex justify-center">
                      {/* <img
                        src={`${baseUrl}/${item.item_image}`}
                        alt={item.item_name}
                        className="w-12 h-12 object-cover rounded"
                      /> */}
                      <img
                        src={`${baseUrl}${item.item_master_image[0].main_image}`}
                        alt={item.item_name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Name */}
                    <p className="text-gray-800 col-span-2 text-sm">
                      {item.item_name}
                    </p>

                    {/* Quantity */}
                    <p className="text-gray-700 flex justify-center items-center text-xs bg-blue-300 p-1 rounded-lg">
                      Qty {item.quantity}
                    </p>

                    {/* Price */}
                    <p className="text-gray-900 font-semibold items-end">
                      ₹{item.itemprice * item.quantity}
                    </p>

                    {/* Delete Button */}
                    <div className="flex justify-center">
                      <MdDeleteOutline
                        onClick={() => removeFromCart(item.id)}
                        className="cursor-pointer text-red-600 hover:text-red-800 text-xl"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
            <p>Subtotal</p>
            <p className="text-lg font-semibold">₹{subtotal}</p>
          </div>

          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
            <p>Shipping</p>
            <p>Free</p>
          </div>

          <div className="flex justify-between text-gray-800 font-medium py-3 uppercase">
            <p className="font-semibold">Total</p>
            <p>₹{subtotal}</p>
          </div>

          <div className="flex items-center mb-4 mt-2">
            <input
              type="checkbox"
              name="agreement"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
            />
            <label className="text-gray-600 ml-3 cursor-pointer text-sm">
              I agree to the{" "}
              <a href="#" className="text-primary">
                terms & conditions
              </a>
            </label>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
