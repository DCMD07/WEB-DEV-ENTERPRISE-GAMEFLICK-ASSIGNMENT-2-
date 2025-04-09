// Mohammed Aasim
// Assignment 2 - GameFlick
// Professor: Mr. Ram
// Course: Web Development Enterprise
// Date: April 4th, 2025

window.onload = async () => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
  
    const container = document.getElementById("gameDetails");
  
    if (!title || !container) {
      container.innerHTML = "<p>Invalid game title or container missing.</p>";
      return;
    }
  
    try {
      const res = await fetch("/api/games");
      const games = await res.json();
  
      const game = games.find(g =>
        g.title.toLowerCase().trim() === title.toLowerCase().trim()
      );
  
      if (!game) {
        container.innerHTML = `<p>Game titled "<b>${title}</b>" not found.</p>`;
        return;
      }
  
      container.innerHTML = `
        <h2>${game.title}</h2>
        <img src="${game.thumbnail}" alt="${game.title}" />
        <p><strong>Genre:</strong> ${game.genre}</p>
        <p><strong>Platform:</strong> ${game.platform}</p>
        <p><strong>Description:</strong> ${game.short_description}</p>
        <a href="${game.game_url}" target="_blank">🎮 Play Now</a>
      `;
    } catch (error) {
      console.error("Error fetching game:", error);
      container.innerHTML = "<p>Failed to load game details.</p>";
    }
  };
  