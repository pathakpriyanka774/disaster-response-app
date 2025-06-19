# 🆘 Disaster Response Coordination Platform

A MERN stack project to report, monitor, and coordinate disaster events with real-time updates, geospatial awareness, and AI-assisted intelligence.

---

## 🚀 Features

### ✅ Core Features

* 📝 Create & manage disaster reports
* 📍 Extract geolocation from natural descriptions (mock Gemini)
* 📡 Fetch real-time social media reports (mock Twitter)
* 🖼️ Verify images as relevant using AI-style logic
* 🔄 Real-time WebSocket updates for all changes

---

## 🎁 Bonus Features (Implemented)

### 1. ⚠️ Priority Alert System

* Keywords like `urgent`, `sos`, `emergency` in social media posts are auto-flagged
* Highlighted in red and labeled as `⚠️ PRIORITY`

### 2. 🧠 Report Classifier

* Image or post content is scanned for keywords
* Classified as `HIGH`, `MEDIUM`, or `LOW` priority using basic NLP

### 3. 🏥 Real Hospital Integration

* Uses OpenStreetMap's Overpass API
* Searches for nearby hospitals within a 5 km radius of disaster location
* Live, dynamic data — not hardcoded

### 4. 🗺️ Interactive Map

* Integrated with Leaflet.js
* Shows disaster location and nearby hospitals
* Fully interactive map loaded with OSM tiles

---

## 💻 Technologies Used

* **Frontend:** React + Vite + Leaflet
* **Backend:** Node.js + Express + Supabase (PostgreSQL + PostGIS)
* **Database:** Supabase with spatial indexing
* **Real-time:** WebSocket (Socket.IO-like logic)
* **Geodata:** OpenStreetMap Overpass API
* **AI Simulation:** Gemini-style mocks

---

## 🌐 Live Demo

* **Frontend (Vercel):** [https://disaster-response-app-git-main-priyanka-pathaks-projects.vercel.app/]
* **Backend (Render):** [https://disaster-response-app-hd26.onrender.com](https://your-backend.onrender.com)

---

## 🔧 Setup (Local Dev)

```bash
# backend
cd backend
npm install
node server.js

# frontend
cd ../frontend
npm install
npm run dev
```

---

## 🧪 Demo Walkthrough

1. **Create a disaster** (title, location name, description)
2. **Geocode it** using natural text → returns lat/lon
3. **View social media feed** → see alerts (with priority flags)
4. **Verify an image** → see AI response + classification
5. **Search hospitals nearby** → fetch live OSM hospitals
6. **View map** → interact with hospital/disaster markers
7. **WebSocket feed** → live logs from backend in UI

---

## 📦 Author

* Created by **\[Priyanka Pathak]** as part of a disaster coordination assignment

---

✅ All 4 bonus features complete & deployed!
