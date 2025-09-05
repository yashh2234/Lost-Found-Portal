import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "user") navigate("/user");
    else navigate("/moderator");
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300"
      style={{
        backgroundImage:
          "url('/artistic-blurry-colorful-wallpaper-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 shadow-2xl rounded-3xl p-10 w-[370px] flex flex-col items-center border border-purple-200 backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/lost-found-icon2.png"
            alt="Lost & Found"
            className="w-16 h-16 mb-2 drop-shadow-lg"
          />
          <h2 className="text-3xl font-extrabold text-center mb-1 text-purple-700 tracking-tight">
            Lost & Found Portal
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Please login to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col space-y-5 w-full">
          <input
            type="text"
            placeholder="Username"
            className="border border-purple-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-purple-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />

          <div className="flex items-center space-x-2">
            <label className="text-gray-600 font-medium" htmlFor="role">
              Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-purple-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-xl font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;