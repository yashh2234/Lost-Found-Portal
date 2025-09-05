import { useState, useEffect } from "react";

type Item = {
  _id: string;
  title: string;
  description: string;
  type: "Lost" | "Found";
  status: "Pending" | "Approved" | "Claimed";
};

function ModeratorDashboard() {
  const [pendingItems, setPendingItems] = useState<Item[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchPending = async () => {
    try {
      const res = await fetch(`${API_URL}/moderator/items`);
      const data: Item[] = await res.json();
      setPendingItems(data);
    } catch (err) {
      console.error("Failed to fetch pending items:", err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await fetch(`${API_URL}/moderator/items/${id}/approve`, { method: "PATCH" });
      setPendingItems(pendingItems.filter(item => item._id !== id));
      alert("Item approved successfully!");
    } catch (err) {
      console.error("Failed to approve item:", err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await fetch(`${API_URL}/moderator/items/${id}/reject`, { method: "DELETE" });
      setPendingItems(pendingItems.filter(item => item._id !== id));
      alert("Item rejected successfully!");
    } catch (err) {
      console.error("Failed to reject item:", err);
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
          Moderator Dashboard
        </h1>
        <div className="bg-white/90 shadow-xl rounded-2xl p-8 border border-purple-100 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2M5 10a7 7 0 0114 0v2a7 7 0 01-14 0v-2z" />
              </svg>
            </span>
            Pending Items
          </h2>
          {pendingItems.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No pending items.</p>
          ) : (
            <ul className="space-y-4">
              {pendingItems.map(item => (
                <li
                  key={item._id}
                  className="border border-purple-100 bg-gradient-to-br from-white via-purple-50 to-pink-50 p-5 rounded-xl flex justify-between items-center shadow-sm transition hover:shadow-lg"
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
                      <span className="text-yellow-600 font-semibold">{item.status}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleApprove(item._id)}
                      className="bg-gradient-to-r from-green-500 to-green-400 text-white px-4 py-2 rounded-xl font-semibold shadow hover:from-green-600 hover:to-green-500 transition-all duration-200"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(item._id)}
                      className="bg-gradient-to-r from-red-500 to-pink-400 text-white px-4 py-2 rounded-xl font-semibold shadow hover:from-red-600 hover:to-pink-500 transition-all duration-200"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModeratorDashboard;