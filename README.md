# 🌍 Disaster Response Coordination Platform

A backend-heavy MERN stack application to support disaster response with real-time data, geospatial resources, and AI integrations.

---

## 🔧 Tech Stack

- Node.js + Express.js
- Supabase (PostgreSQL + PostGIS)
- OpenStreetMap (Geocoding)
- Google Gemini (mocked)
- Socket.IO (WebSockets)
- REST APIs + Mock Authentication
- Minimal Frontend (optional)

---

## ✅ Features

- **Disaster Management** (`/api/disasters`)
- **Location Extraction & Geocoding** (`/api/geocode`)
- **Social Media Feed** (`/api/disasters/:id/social-media`)
- **Geospatial Resource Mapping** (`/api/disasters/:id/resources?lat&lon`)
- **Image Verification** (`/api/disasters/:id/verify-image`)
- **Caching** via Supabase
- **Real-time WebSocket Events**

---

## 📦 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/disasters` | Create a disaster |
| `GET`  | `/api/disasters` | List disasters |
| `POST` | `/api/geocode` | Extract location + geocode |
| `GET`  | `/api/disasters/:id/resources?lat&lon` | Nearby resources |
| `GET`  | `/api/disasters/:id/social-media` | Mock social feed |
| `POST` | `/api/disasters/:id/verify-image` | Gemini mock verify |

---

## 🧪 Sample Data

### Disaster
```json
{
  "title": "NYC Flood",
  "location_name": "Manhattan, NYC",
  "description": "Heavy flooding in Manhattan",
  "tags": ["flood", "urgent"],
  "owner_id": "netrunnerX"
}
