# Backend (json-server)

## Running the Backend

1. Install dependencies (if not already):
   ```powershell
   cd backend
   npm install
   ```
2. Start the server:
   ```powershell
   npm start
   ```
   This will run json-server at http://localhost:3001

## Endpoints

- `/participants` (GET, POST, PATCH, DELETE)
- `/teams` (GET, POST, PATCH, DELETE)
- `/scores` (GET, POST, PATCH, DELETE)

You can edit `db.json` directly for initial data or use the API.

---

# Data Structure Example

```
{
  "participants": [
    { "id": 1, "name": "Alice" }
  ],
  "teams": [
    { "id": 1, "name": "Team A", "memberIds": [1,2,3,4] }
  ],
  "scores": [
    { "id": 1, "participantId": 1, "sport": "sport1", "points": 5 }
  ]
}
```

---

# Customization

You can add custom routes or logic by extending json-server with a `server.js` if needed.
