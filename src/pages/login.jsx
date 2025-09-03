import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // stop form refresh
    setError("");

    try {
      const response = await fetch(
        "https://servermms.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          console.log("Token saved:", data.token);
        }
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 justify-center items-center">
      <div className="w-115 p-1 space-y-9 flex-row justify-center items-center">
        <div className="space-y-2">
          <div className="flex text-3xl font-bold justify-center items-center">
            Military Asset Management
          </div>
          <div className="flex text-gray-600 justify-center items-center">
            sign in to your account
          </div>
        </div>

        {/* input box for login */}
        <form
          onSubmit={handleLogin}
          className="flex-row px-10 py-8 bg-white space-y-4 justify-center items-center shadow rounded-lg"
        >
          {/* username */}
          <div className="flex-row justify-center items-center">
            <div className="w-full text-start text-gray-700">Username</div>
            <div className="w-full">
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-2 py-0 shadow rounded-2xl focus:outline-black focus:border-0"
              />
            </div>
          </div>

          {/* password */}
          <div className="flex-row justify-center items-center">
            <div className="w-full text-start text-gray-700">Password</div>
            <div className="w-full">
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-0 shadow rounded-2xl focus:outline-black focus:border-indigo-500"
              />
            </div>
          </div>

          {/* error message */}
          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex-row text-end text-[#0284c7] hover:text-primary-500">
            Forgot password?
          </div>

          <div className="flex-row justify-center items-center">
            <button
              type="submit"
              className="w-full bg-[#0284C7] rounded-lg cursor-pointer text-white py-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
