import express from "express";
import Rating from "../models/Rating.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch ratings" });
  }
});

router.post("/", async (req, res) => {
  const { flavor, score, notes } = req.body;

  if (!flavor || typeof score !== "number") {
    return res.status(400).json({ message: "Flavor and score are required" });
  }

  try {
    const rating = new Rating({ flavor, score, notes });
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ message: "Could not save rating" });
  }
});

export default router;
