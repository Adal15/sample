// function Features() {
//   return (
//     <>
//       <div class="container py-16">
//         <div class="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
//           <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
//             <img
//               src="assets/images/icons/delivery-van.svg"
//               alt="Delivery"
//               class="w-12 h-12 object-contain"
//             />
//             <div>
//               <h4 class="font-medium capitalize text-lg">Free Shipping</h4>
//               <p class="text-gray-500 text-sm">Order over $200</p>
//             </div>
//           </div>
//           <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
//             <img
//               src="assets/images/icons/money-back.svg"
//               alt="Delivery"
//               class="w-12 h-12 object-contain"
//             />
//             <div>
//               <h4 class="font-medium capitalize text-lg">Money Rturns</h4>
//               <p class="text-gray-500 text-sm">30 days money returs</p>
//             </div>
//           </div>
//           <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
//             <img
//               src="assets/images/icons/service-hours.svg"
//               alt="Delivery"
//               class="w-12 h-12 object-contain"
//             />
//             <div>
//               <h4 class="font-medium capitalize text-lg">24/7 Support</h4>
//               <p class="text-gray-500 text-sm">Customer support</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Features;

function Features() {
  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="width mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
      
        {/* Card 1 */}
        <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 flex items-center gap-6 border border-gray-200">
          <img
            src="assets/images/icons/delivery-van.svg"
            alt="Delivery"
            className="w-14 h-14"
          />
          <div>
            <h4 className="font-semibold text-lg text-gray-800">Free Shipping</h4>
            <p className="text-gray-500 text-sm">Order over $200</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 flex items-center gap-6 border border-gray-200">
          <img
            src="assets/images/icons/money-back.svg"
            alt="Money Back"
            className="w-14 h-14"
          />
          <div>
            <h4 className="font-semibold text-lg text-gray-800">Money Returns</h4>
            <p className="text-gray-500 text-sm">30 days money back</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 flex items-center gap-6 border border-gray-200">
          <img
            src="assets/images/icons/service-hours.svg"
            alt="Support"
            className="w-14 h-14"
          />
          <div>
            <h4 className="font-semibold text-lg text-gray-800">24/7 Support</h4>
            <p className="text-gray-500 text-sm">Fast customer support</p>
          </div>
        </div>

        {/* ⭐ NEW Card 4 - Pay With Ease */}
        <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 flex items-center gap-6 border border-gray-200">
          {/* <img
            src="assets/images/icons/cash.svg"
            alt="Pay with Ease"
            className="w-14 h-14"
          /> */}
          <img src="src\assets\images\icons\cash.svg" className="w-14 h-14 " />

          <div>
            <h4 className="font-semibold text-lg text-gray-800">Pay with Ease</h4>
            <p className="text-gray-500 text-sm">COD • Credit Card • UPI</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Features;
