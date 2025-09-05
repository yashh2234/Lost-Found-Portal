# Lost & Found Portal

A full-stack system to report and manage lost and found items, with moderator approval and claim notifications.

## Installation

### 1. Clone the respository
```
git clone https://github.com/yashh2234/Lost-Found-Portal.git
```

### 2. For Frontend
```
cd lost_found_portal
npm run dev
```

### 3. For Backend
```
cd lost_found_portal
cd backend
npm run dev
```
Notes:
- Frontend runs on http://localhost:5173
- Backend runs on http://localhost:5000
- Keep both servers running simultaneously.

## Project Structure
```
lost_found_portal/
│
├── backend/       # Node.js/Express backend
├── src/           # React frontend source code
├── public/        # Public frontend assets
├── package.json   # Frontend dependencies
└── README.md      # Project documentation
```

## Features

### Backend
- CRUD operations for lost/found items
- Workflow states: Pending Approval, Approved, Claimed
- API for moderators to approve or reject items
- Notification endpoint (simulated via console log or toast message)

### Frontend
- Submission form for lost/found items
- Moderator dashboard for approvals
- Public list of approved items

### Database
- Items table with status and claimant ID

## Technologies Used
- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express
- Database: MongoDB
