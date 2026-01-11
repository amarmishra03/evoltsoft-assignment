# EV Charging Station Management System

A full-stack web application to manage EV charging stations with authentication, CRUD operations, filters, and map visualization.

---

## Features

### Backend (Node.js + Express + MongoDB)

- User Authentication (JWT)
- Register & Login
- Protected Routes
- CRUD for Charging Stations
- Fields:
  - Name
  - Latitude & Longitude
  - Status (Active/Inactive)
  - Power Output (kW)
  - Connector Type

### Frontend (Vue 3 + Vite + Tailwind)

- Login & Register
- Add / Edit / Delete Charging Stations
- Filters by Status & Connector Type
- Map View (OpenStreetMap + Leaflet)
- Modern EV-themed UI

---

## Tech Stack

| Layer    | Tech                                |
| -------- | ----------------------------------- |
| Backend  | Node.js, Express, MongoDB, JWT      |
| Frontend | Vue 3, Vite, Tailwind CSS           |
| Map      | Leaflet, OpenStreetMap              |
| Deploy   | Render (Backend), Vercel (Frontend) |

---

## Setup Instructions

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd backend
npm install
npm run dev
```
