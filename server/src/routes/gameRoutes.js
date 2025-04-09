const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const FREE_TO_GAME_API = "https://www.freetogame.com/api/games";
const GAMERPOWER_API = "https://www.gamerpower.com/api/giveaways";

// /api/games
router.get("/games", async (req, res) => {
  try {
    const response = await fetch(FREE_TO_GAME_API);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching games", error });
  }
});

// /api/giveaways
router.get("/giveaways", async (req, res) => {
  try {
    const response = await fetch(GAMERPOWER_API);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching giveaways", error });
  }
});

// /api/search?q=something
router.get("/search", async (req, res) => {
  const searchTerm = req.query.q?.toLowerCase();
  if (!searchTerm) {
    return res.status(400).json({ error: "Search term (q) is required." });
  }

  try {
    const [gamesRes, giveawaysRes] = await Promise.all([
      fetch(FREE_TO_GAME_API),
      fetch(GAMERPOWER_API),
    ]);

    const games = await gamesRes.json();
    const giveaways = await giveawaysRes.json();

    const matchedGames = games.filter(game =>
      game.title.toLowerCase().includes(searchTerm)
    );

    const matchedGiveaways = giveaways.filter(g =>
      g.title.toLowerCase().includes(searchTerm) ||
      g.description.toLowerCase().includes(searchTerm)
    );

    res.json({
      results: matchedGames.map(game => ({
        ...game,
        relevantGiveaways: matchedGiveaways.length > 0
          ? matchedGiveaways
          : "No relevant giveaways found for this game. Here are some other current giveaways:",
      })),
      generalGiveaways: matchedGiveaways.length === 0 ? giveaways.slice(0, 10) : [],
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data." });
  }
});

module.exports = router;
