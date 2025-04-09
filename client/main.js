// Utility to display games
function renderGames(data) {
  const gameList = document.getElementById("gameList");
  gameList.innerHTML = "";
  if (data.length === 0) {
    gameList.innerHTML = "<p>No games found.</p>";
    return;
  }

  data.forEach((game, i) => {
    gameList.innerHTML += `
      <div class="card">
        <img src="${game.thumbnail || `assets/img/game${i + 1}.jpg`}" alt="${game.title}" />
        <h3>
          <a href="game.html?title=${encodeURIComponent(game.title)}" class="game-link">${game.title}</a>
        </h3>
        <p>${game.short_description || game.description}</p>
      </div>
    `;
  });
}

// Utility to display giveaways
function renderGiveaways(data) {
  const giveawayList = document.getElementById("giveawayList");
  
  // 🧼 Clear all cards but preserve special messages
  const message = document.querySelector(".no-giveaway-message");
  giveawayList.innerHTML = message ? message.outerHTML : "";

  data.forEach((giveaway, i) => {
    giveawayList.innerHTML += `
      <div class="card">
        <img src="${giveaway.thumbnail || `assets/img/giveaway${(i % 10) + 1}.jpg`}" alt="${giveaway.title}" />
        <h3><a href="${giveaway.open_giveaway_url}" target="_blank">${giveaway.title}</a></h3>
        <p>${giveaway.description}</p>
      </div>
    `;
  });
}

// Main logic
window.onload = async () => {
  const gameList = document.getElementById("gameList");
  const giveawayList = document.getElementById("giveawayList");
  const searchInput = document.getElementById("searchInput");
  const platformFilter = document.getElementById("platformFilter");
  const genreFilter = document.getElementById("genreFilter");

  let allGames = [];

  try {
    const res = await fetch("/api/games");
    allGames = await res.json();

    const giveawaysRes = await fetch("/api/giveaways");
    const giveaways = await giveawaysRes.json();

    renderGames(allGames.slice(0, 16));
    renderGiveaways(giveaways.slice(0, 16));
  } catch (error) {
    console.error("Error loading data:", error);
    gameList.innerHTML = `<p>Unable to load games. Check server.</p>`;
    giveawayList.innerHTML = `<p>Unable to load giveaways. Check server.</p>`;
  }

  // 🔍 Search input logic
  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();
    if (!query) {
      renderGames(allGames.slice(0, 16));
      const giveawaysRes = await fetch("/api/giveaways");
      const giveaways = await giveawaysRes.json();
      renderGiveaways(giveaways.slice(0, 16));
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const { results, generalGiveaways } = await res.json();

      if (results.length > 0) {
        renderGames(results);

        const giveaways = results[0].relevantGiveaways;
        if (Array.isArray(giveaways) && giveaways.length > 0) {
          renderGiveaways(giveaways);
        } else {
          giveawayList.innerHTML = `
            <p class="no-giveaway-message">
              No giveaways found for <strong>${query}</strong> at the moment.<br>
              But here are some that might interest you!
            </p>
          `;
          // Let the message show up before re-rendering
          setTimeout(() => {
            renderGiveaways(generalGiveaways.slice(0, 16));
          }, 50);
        }
      } else {
        gameList.innerHTML = `<p>No results found.</p>`;
        giveawayList.innerHTML = `
          <p class="no-giveaway-message">
            No giveaways found for <strong>${query}</strong> at the moment.<br>
            Here are some other popular giveaways!
          </p>
        `;
        setTimeout(async () => {
          const fallback = await fetch("/api/giveaways");
          const fallbackData = await fallback.json();
          renderGiveaways(fallbackData.slice(0, 16));
        }, 50);
      }
    } catch (err) {
      console.error("Search failed:", err);
      gameList.innerHTML = `<p>Error fetching games.</p>`;
      giveawayList.innerHTML = `<p>Error fetching giveaways.</p>`;
    }
  });

  // Filter logic
  platformFilter.addEventListener("change", () => applyFilters());
  genreFilter.addEventListener("change", () => applyFilters());

  function applyFilters() {
    const query = searchInput.value.toLowerCase();
    const platform = platformFilter.value;
    const genre = genreFilter.value;

    const filtered = allGames.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(query);
      const matchesPlatform = platform ? game.platform.toLowerCase().includes(platform) : true;
      const matchesGenre = genre ? game.genre.toLowerCase().includes(genre) : true;
      return matchesSearch && matchesPlatform && matchesGenre;
    });

    renderGames(filtered.slice(0, 6));
  }
};
