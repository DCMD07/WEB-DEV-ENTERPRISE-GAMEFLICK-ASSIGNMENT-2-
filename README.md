Student Name: Mohammed Aasim
Course: Web Development Enterprise
Professor: Mr. Ram
Date: April 4, 2025

Project Overview
GameFlick is a web application that allows users to explore free-to-play games and active giveaways using real-time data from public APIs. The app is designed as a single-page application and includes search functionality, filters, carousels, and detailed game information.

Both the frontend and backend are containerized using Docker and can be run using Docker Compose.

Features
Fetches free games from the FreeToGame API.

Fetches giveaways from the GamerPower API.

Search bar to filter games by name.

Filters for platform and genre.

Displays game and giveaway cards dynamically.

Shows fallback giveaways if no match is found.

Game detail pages with routing via query strings.

Frontend and backend both run in Docker containers.

Technologies Used
HTML, CSS, JavaScript

Node.js with Express

Docker & Docker Compose

FreeToGame API

GamerPower API

Folder Structure
pgsql
Copy
Edit
Assignment-3/
│
├── client/              → Frontend files (HTML, CSS, JS, assets)
│   ├── index.html
│   ├── game.html
│   ├── main.js
│   ├── game.js
│   └── style.css
│
├── server/              → Backend API (Node.js + Express)
│   ├── app.js
│   └── routes/
│       └── gameRoutes.js
│
├── docker-compose.yml   → Compose configuration
├── Dockerfile (client & server)
└── README.md
How to Run the Project
Prerequisites
Install Docker and Docker Compose on your system.

Steps to Run
Open a terminal in the root folder (Assignment-3).

Run the following commands one by one:

bash
Copy
Edit
docker-compose down --volumes --remove-orphans
docker system prune -af
docker-compose build --no-cache
docker-compose up --force-recreate
After the containers are up and running, open a web browser and go to:

arduino
Copy
Edit
http://localhost:8080
This will open the frontend where you can interact with the app.

Notes
If you search for a game and it has no related giveaways, a fallback message will appear, and some popular giveaways will still be shown.

All game and giveaway data is dynamically loaded from the server using the Fetch API.

Animations and carousels are implemented for both games and giveaways to improve the user experience.

The entire project is self-contained and does not require any additional setup outside Docker.