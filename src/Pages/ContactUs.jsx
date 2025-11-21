import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    emailjs
      .send("service_otz30oj", "template_fumk9te", formData, {
        publicKey: "wmQGkalp0Iz2du1Og",
      })
      .then(
        () => {
          Swal.fire({
            title: "Thank you!",
            text: "Your form has been submitted!",
            icon: "success",
            timer: 2000, // Auto close after 2 seconds
            showConfirmButton: false, // Hide the OK button
          }).then(() => {
            navigation("/"); // Navigate to home page after alert closes
          });

          // Reset form fields correctly
          setFormData({
            name: "",
            email: "",
            mobile: "",
            subject: "",
            message: "",
          });

          setLoading(false); // Hide loader
        },
        (error) => {
          setLoading(false); // Hide loader
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          console.log("FAILED...", error.text);
        }
      );
  };

//   return (
//     <div className="w-full">
//       {/* Google Map Section */}
//       <div className="relative w-[90%] h-[50vh]">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.4512424990558!2d55.486006574630245!3d25.322634826609946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f5df14e533d%3A0x73cc61cd6d65a7e3!2sSharjah%20Research%20Technology%20and%20Innovation%20Park!5e0!3m2!1sen!2sin!4v1740245269829!5m2!1sen!2sin"
//           className="absolute  w-full h-full mx-12 mt-4 border-0 rounded-lg"
//           allowFullScreen
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         ></iframe>

//         {/* 
// <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.4512424990558!2d55.486006574630245!3d25.322634826609946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f5df14e533d%3A0x73cc61cd6d65a7e3!2sSharjah%20Research%20Technology%20and%20Innovation%20Park!5e0!3m2!1sen!2sin!4v1740245269829!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
//       </div>

//       {/* Contact Form Section */}
//       <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 border-2 border-red-400">
//         <h2 className="text-2xl font-semibold text-center">Contact Us</h2>
//         <form onSubmit={sendEmail} className="space-y-4">
//           <div>
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="name"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Your Name"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-8">
//             <div>
//               <label
//                 className="block text-sm font-medium text-gray-700"
//                 htmlFor="email"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Your Email"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 className="block text-sm font-medium text-gray-700"
//                 htmlFor="mobile"
//               >
//                 Mobile
//               </label>
//               <input
//                 type="number"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Your Mobile"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="subject"
//             >
//               Subject
//             </label>
//             <input
//               type="text"
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Subject"
//               required
//             />
//           </div>

//           <div>
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="message"
//             >
//               Message
//             </label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="4"
//               placeholder="Your Message"
//               required
//             ></textarea>
//           </div>

//           <div className="text-center">
//             <button
//               className="px-6 py-3 bg-red-600 hover:bg-red-400  text-white rounded-lg"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Submitting..." : "Submit Message"}
//             </button>
//           </div>
//         </form>
//       </div>
      

//     </div>
    
//   );
return (
  <div className="w-full bg-gray-50 py-10">

    {/* Google Map Section */}
    <div className="w-[90%] max-w-7xl mx-auto h-[50vh] rounded-2xl overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.4512424990558!2d55.486006574630245!3d25.322634826609946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f5df14e533d%3A0x73cc61cd6d65a7e3!2sSharjah%20Research%20Technology%20and%20Innovation%20Park!5e0!3m2!1sen!2sin!4v1740245269829!5m2!1sen!2sin"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-0"
      ></iframe>
    </div>

    {/* Contact Form Section */}
    <div className="max-w-3xl mx-auto mt-12 p-10 bg-white border border-red-300 shadow-xl rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Contact Us
      </h2>

      <form onSubmit={sendEmail} className="space-y-6">
        
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 block">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email + Mobile */}
        <div className="flex  gap-6">
          <div  className="flex-1">
            <label className="text-sm font-medium text-gray-700 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 block">Mobile</label>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Enter your mobile number"
              required
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="text-sm font-medium text-gray-700 block">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Message subject"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-sm font-medium text-gray-700 block">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="px-8 py-3 bg-red-600 hover:bg-red-700 transition-all text-white font-semibold rounded-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Send Message"}
          </button>
        </div>

      </form>
    </div>

  </div>
);

};

export default ContactUs;
