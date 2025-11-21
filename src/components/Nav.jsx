import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logo1 from "../assets/images/logo1.png";
import constantApi from "../constantApi";
import { useCart } from "../CartContext/CartContext";
import { RxHamburgerMenu } from "react-icons/rx";

function Nav() {
  const { getCartItemCount } = useCart();
  const [itemDept, setItemDept] = useState([]);
  const [family, setFamily] = useState([]);
  const [subFamily, setSubFamily] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Fetch item departments
  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/item_department/dropdown-list`)
      .then((res) => {
        setItemDept(res.data.data);
      })
      .catch((err) => console.error("Error fetching item departments:", err));
  }, []);

  // Fetch families when clicking a department
  const handleDeptClick = (deptId) => {
    setSelectedDept(deptId);
    setSelectedFamily(null); // Reset family when selecting a new department
    setSubFamily([]); // Clear sub-family when department changes
    axios
      .post(`${constantApi.baseUrl}/family_master/by_id_list`, { id: deptId })
      .then((res) => {
        const uniqueFamilies = res.data.data.filter(
          (v, i, a) => a.findIndex((t) => t.itemfamname === v.itemfamname) === i
        );
        setFamily(uniqueFamilies);
      })
      .catch((err) => console.error("Error fetching families:", err));
  };

  // Fetch sub-families when clicking a family
  const handleFamilyClick = (familyId) => {
    setSelectedFamily(familyId);
    axios
      .post(`${constantApi.baseUrl}/sub_family_master/by_id_list`, {
        id: familyId,
      })
      .then((res) => {
        console.log("response for sub family", res);

        setSubFamily(res.data.data);
      })
      .catch((err) => console.error("Error fetching sub-families:", err));
  };

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="container h-20 flex justify-between items-center px-4">
        <div className="flex justify-between items-center px-4 gap-4">
          <div>
            <Link to="/">
              <img src={logo1} alt="Logo" className="w-12" />
            </Link>
          </div>

          {/* All button */}
          <div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="capitalize text-white px-4 py-2 bg-primary rounded-lg flex items-center gap-2"
            >
              <RxHamburgerMenu />
              All
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-20 left-0 h-full bg-white shadow-lg transition-transform transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-[25%] p-4`}
        >
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-700 text-lg font-bold mb-4"
          >
            ✖ Close
          </button>

          {/* Item Departments */}
          <h2 className="text-xl font-semibold mb-3">Item Departments</h2>
          <ul>
            {itemDept.map((dept) => (
              <li
                key={dept.id}
                onClick={() => handleDeptClick(dept.id)}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  selectedDept === dept.id ? "font-bold" : ""
                }`}
              >
                {dept.itemdeptname}
              </li>
            ))}
          </ul>

          {/* Families */}
          {selectedDept && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Families</h2>
              <ul>
                {family.map((fam) => (
                  <li
                    key={fam.id}
                    onClick={() => handleFamilyClick(fam.id)}
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${
                      selectedFamily === fam.id ? "font-bold" : ""
                    }`}
                  >
                    {fam.itemfamname}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sub-Families */}
          {selectedFamily && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Sub-Families</h2>
              <ul>
                {subFamily.length > 0 ? (
                  subFamily.map((sub) => (
                    <li
                      key={sub.id}
                      onClick={() => navigate(`/itemlist/${sub.id}`)}
                      // navigate(/itemlist/${item.id});
                      className="p-2 cursor-pointer hover:bg-gray-300"
                    >
                      {sub.itemsfamname}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No sub-families available.</p>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6 capitalize text-white">
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link to="/shop" className="hover:text-gray-300 transition">
            Shop
          </Link>
          <Link to="/contactus" className="hover:text-gray-300 transition">
            Contact Us
          </Link>
          <a
            href="#"
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
            <div className="text-md text-white leading-3">
              <Link to="/cart">Cart</Link>
            </div>
            <div className="absolute -right-3 -top-1 w-3 h-3 rounded-full flex items-center justify-center bg-primary text-white text-xs">
              {getCartItemCount()}
            </div>
          </a>

          <a
            href="#"
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <i className="fa-regular fa-user"></i>
            </div>
            <div className="text-md text-white leading-3">
              <Link to="/accounts">Account</Link>
            </div>
          </a>
          {!token ? (
            <Link
              to="/login"
              className="text-gray-200 hover:text-white transition"
            >
              Login
            </Link>
          ) : (
            <p
              onClick={handleLogout}
              className="text-gray-200 hover:text-white transition cursor-pointer"
            >
              Logout
            </p>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
