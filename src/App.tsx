// src/App.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "user") {
      navigate("/user");
    } else {
      navigate("/moderator");
    }
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/artistic-blurry-colorful-wallpaper-background.jpg')" }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[350px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Lost & Found Portal
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
          </select>

          <button
            type="submit"
            className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
