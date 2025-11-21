import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import constantApi from "../constantApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message
    setError("");

    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/ecommerce/login`,
        {
          email,
          password,
        }
      );

      console.log("response is ", response);
      if (response.status === 200) {
        // If login is successful, store the token in localStorage or state
        const userData = response.data;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(userData));
        alert("you are login successfully");
      }

      // Redirect user to a different page (for example: dashboard)
      navigate("/");
    } catch (error) {
      // If error, show error message
      setError(
        error.response ? error.response.data.message : "Something went wrong"
      );
    }
  };

  return (
    <>
      {/* <!-- login --> */}
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
          <p className="text-gray-600 mb-6 text-sm">Welcome back, customer!</p>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="space-y-2">
              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="youremail@domain.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-600 mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******"
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/userregistration" className="text-primary">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
