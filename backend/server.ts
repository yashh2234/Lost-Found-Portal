import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db";
import Item from "./models/Item";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

// ------------------ USER ROUTES ------------------ //

// Get approved items (for users)
app.get("/items", async (req, res) => {
  try {
    const { type } = req.query;
    const query: any = { status: "Approved" }; // only approved items
    if (type) query.type = type;

    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (err: unknown) {
    console.error("GET /items error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add new item (status defaults to Pending)
app.post("/items", async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const newItem = new Item({ title, description, type, status: "Pending" });
    await newItem.save();
    res.status(201).json({ message: "Submission successful. Your item is currently pending approval by a moderator." });
  } catch (err: unknown) {
    console.error("POST /items error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Claim item (only for approved items)
app.patch("/items/:id/claim", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, { status: "Claimed" }, { new: true });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err: unknown) {
    console.error("PATCH /items/:id/claim error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ MODERATOR ROUTES ------------------ //

// Get pending items (for moderators)
app.get("/moderator/items", async (req, res) => {
  try {
    const pendingItems = await Item.find({ status: "Pending" }).sort({ createdAt: -1 });
    res.json(pendingItems);
  } catch (err: unknown) {
    console.error("GET /moderator/items error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Approve item
app.patch("/moderator/items/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, { status: "Approved" }, { new: true });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err: unknown) {
    console.error("PATCH /moderator/items/:id/approve error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Reject item
app.delete("/moderator/items/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item rejected and removed" });
  } catch (err: unknown) {
    console.error("DELETE /moderator/items/:id/reject error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ SERVER START ------------------ //
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
