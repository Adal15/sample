import Adds from "./Adds";
import Categories from "./Categories";
import Features from "./Features";
import NewArrivals from "./NewArrivals";
import Products from "./Products";
import bannerbg from "../assets/images/heroImg-bg.jpg";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <div
        class="bg-cover bg-no-repeat bg-center py-36 "
        style={{ backgroundImage: `url(${bannerbg})` }}
      >
        <div className="flex justify-end pr-20">
  <div className="text-right">
    <h1 className="text-6xl text-gray-900 font-medium mb-4 capitalize">
      Read the Words That Change Perspectives <br /> and Empower Your Future
    </h1>

    <p>
      Discover books that inspire growth, spark curiosity, and enrich your life.<br />
      Your next favorite story is just a click away.
    </p>

    <div className="mt-12">
      <Link
        to="/shop"
        className="bg-primary border border-primary text-white px-8 py-3 font-medium 
        rounded-md hover:bg-transparent hover:text-primary hover:font-bold"
      >
        Shop Now
      </Link>
    </div>
  </div>
</div>


      </div>
      <Features />
      <Categories />
      <NewArrivals />
      <Adds />
      <Products />
    </>
  );
}

export default LandingPage;
