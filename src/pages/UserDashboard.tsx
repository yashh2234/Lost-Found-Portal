import { useState, useEffect } from "react";

type Item = {
  _id: string;
  title: string;
  description: string;
  type: "Lost" | "Found";
  status: "Approved" | "Claimed";
};

function UserDashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState({ title: "", description: "", type: "Lost" });

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch approved items
  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_URL}/items`);
      const data: Item[] = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Submit new item (goes to Pending)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ title: "", description: "", type: "Lost" });
      alert("Submitted Successfully! Awaiting Approval From Moderator.");
    } catch (err) {
      console.error("Failed to submit item:", err);
    }
  };

  // Claim approved item
  const handleClaim = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/items/${id}/claim`, { method: "PATCH" });
      const updatedItem = await res.json();
      setItems(items.map(item => (item._id === id ? updatedItem : item)));
      alert("You have claimed this item!");
    } catch (err) {
      console.error("Failed to claim item:", err);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-10"
      style={{
        backgroundImage: "url('/artistic-blurry-colorful-wallpaper-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-extrabold text-center text-white mb-8 drop-shadow">
          User Dashboard
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/90 shadow-xl rounded-2xl p-8 mb-8 border border-purple-100 backdrop-blur-md"
        >
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z" />
              </svg>
            </span>
            Report Lost/Found Item
          </h2>
          <input
            type="text"
            placeholder="Item Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-purple-200 rounded-xl px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-purple-200 rounded-xl px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full border border-purple-200 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-xl font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Submit
          </button>
        </form>

        <div className="bg-white/90 shadow-xl rounded-2xl p-8 border border-purple-100 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2M5 10a7 7 0 0114 0v2a7 7 0 01-14 0v-2z" />
              </svg>
            </span>
            Approved Items
          </h2>
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No items yet.</p>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li
                  key={item._id}
                  className={`border border-purple-100 bg-gradient-to-br from-white via-purple-50 to-pink-50 p-5 rounded-xl flex justify-between items-center shadow-sm transition hover:shadow-lg`}
                >
                  <div>
                    <p className="font-bold text-purple-700 text-lg flex items-center gap-2">
                      {item.type === "Lost" ? (
                        <span className="inline-block w-4 h-4 bg-red-400 rounded-full"></span>
                      ) : (
                        <span className="inline-block w-4 h-4 bg-green-400 rounded-full"></span>
                      )}
                      {item.title} <span className="text-xs text-gray-400">({item.type})</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Status:{" "}
                      <span
                        className={
                          item.status === "Claimed"
                            ? "text-green-600 font-semibold"
                            : "text-purple-600 font-semibold"
                        }
                      >
                        {item.status}
                      </span>
                    </p>
                  </div>
                  {item.status === "Approved" && (
                    <button
                      onClick={() => handleClaim(item._id)}
                      className="bg-gradient-to-r from-green-500 to-green-400 text-white px-4 py-2 rounded-xl font-semibold shadow hover:from-green-600 hover:to-green-500 transition-all duration-200"
                    >
                      Claim
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;