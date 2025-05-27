Perfect, you’ve made great choices for **speed, simplicity, and mobile usability**. Here’s your **comprehensive plan** tailored for a **React (Vite/CRA) + MUI frontend**, with a **json-server backend**. This will get you a “mobile-app-like” web app with tabs at the top and a persistent bottom app bar for page switching.

---

# 🏗️ **Comprehensive Project Plan: Event Sports Scoring Web App**

---

## **1. Tech Stack**

### **Frontend**

- **React** (Vite or Create React App)
- **Material UI (MUI)** for all components and layout
- **React Router** for page navigation (tabs, app bar)
- **Mobile-first responsive layout**: Looks and feels like an app on phones

### **Backend**

- **json-server** (mock REST API from a simple `db.json` file)
- **Serves as backend and data storage**; no setup, super fast
- **Easily swap to a real backend later if needed**

---

## **2. App Structure**

### **Navigation**

- **Top Tabs:** For quick switching between sub-sections in each page
- **Bottom App Bar:** Persistent, with 3 main page icons:

  - **Setup** (People/Teams)
  - **Scoring** (Sports)
  - **Leaderboards**

### **Pages & Tabs**

#### **Page 1: Setup**

- **Tab 1: Add People**

  - Add new participant by name (no duplicates)
  - View/edit/delete existing participants (list)
  - **Admin only** (PIN required to unlock)

- **Tab 2: Form Teams**

  - Create new teams, assign participants to teams
  - Edit/delete teams, change team names
  - Ensure no person is on two teams
  - Show which participants are not yet assigned
  - **Admin only** (PIN required to unlock)

#### **Page 2: Scoring**

- **Five Tabs:** One per sport (hardcoded: Sport 1, Sport 2, …, Sport 5)

  - For each sport tab:

    - List all participants with their current score for this sport
    - `+` and `-` buttons to add/remove points
    - Quick search/filter to find names (optional)

  - Score updates reflected live for all users (refetch on change)
  - All users can score; **add "admin mode" for possible lockout if needed**

#### **Page 3: Leaderboards**

- **Tab 1: Individuals**

  - Table/list, sorted by total points across all sports
  - Show name and total score (maybe also breakdown per sport)

- **Tab 2: Teams**

  - Table/list, sorted by team total points (sum of member scores)
  - Show team name, members, and team score

---

## **3. Core Features**

### **Participants**

- Name (unique, required)
- Can be assigned to one team

### **Teams**

- Name (unique, required)
- List of participants

### **Sports**

- 5 fixed sports (hardcoded, same in frontend and backend)

### **Scores**

- For each sport and each participant: current score (integer, can be negative)
- All scores stored per participant, per sport

### **Admin Controls**

- Actions like add/delete participants or teams are behind a quick PIN entry
- PIN stored in localStorage/sessionStorage for the duration

### **Multi-User / Live Updates**

- Not real-time (no websockets), but auto-refresh/refetch after updates or interval polling so multiple devices stay up to date

---

## **4. Data Model (json-server `db.json`)**

```json
{
  "participants": [{ "id": 1, "name": "Alice" }],
  "teams": [{ "id": 1, "name": "Team Rocket", "members": [1, 2, 3, 4] }],
  "scores": [{ "id": 1, "participantId": 1, "sport": "Sport1", "points": 2 }],
  "admin": {
    "pin": "1234"
  }
}
```

- `participants`: All users (with ids)
- `teams`: All teams (name and list of participant ids)
- `scores`: For each participant and sport, their score (create on demand)
- `admin`: Store PIN if you want to persist it server-side (or just localStorage client-side)

---

## **5. REST API Endpoints (json-server)**

- **/participants** (GET, POST, PATCH, DELETE)
- **/teams** (GET, POST, PATCH, DELETE)
- **/scores** (GET, POST, PATCH)

  - e.g., POST or PATCH to `/scores` to update participant’s points for a sport

- **/admin** (GET) — Optional, just for PIN verification

---

## **6. UI/UX Features**

- **Mobile-first layout**: Use [MUI's mobile breakpoints](https://mui.com/material-ui/react-bottom-navigation/)
- **Sticky top tabs**: Use MUI Tabs for inner-page navigation
- **Persistent bottom app bar**: Use [MUI BottomNavigation](https://mui.com/material-ui/react-bottom-navigation/)
- **Fast point entry**: Big, easy-to-tap `+` and `-` buttons, always visible
- **Quick feedback**: Snackbar/toast for actions (add/remove points, errors, etc.)
- **Readability**: High contrast, large touch targets, minimal distractions
- **PIN prompt**: Simple modal dialog when “admin” actions attempted
- **No registration/logins**: Only the session PIN (local, not secure, but fine for this use)

---

## **7. Development Workflow**

1. **Spin up json-server:**

   ```bash
   npx json-server --watch db.json --port 5000
   ```

2. **Bootstrap React app with Vite or CRA**

   - `npx create-react-app event-app` or `npm create vite@latest`
   - Install MUI: `npm install @mui/material @emotion/react @emotion/styled`
   - Install axios/fetch for API calls

3. **Build Pages and Navigation**

   - Set up routing/pages: Setup, Scoring, Leaderboards
   - Add top tabs and bottom navigation

4. **Build CRUD and UI for each section**

   - Participant/team add/edit/delete forms (PIN required)
   - Scoring UI: all participants, all sports
   - Leaderboard calculation (sort on frontend or backend)
   - Admin PIN dialog

5. **Testing**

   - Test multi-device on your network (phones, laptops)
   - Test for mobile usability, tab switching, fast scoring

6. **Deployment**

   - Host both frontend (React build) and backend (json-server) on your Pi
   - Access via browser at Pi’s local IP

---

## **8. Optional Extras**

- **Export Results**: Button to export scores as CSV for later records
- **Theming**: MUI dark/light mode toggle
- **Name autocomplete/search**: For fast score entry on busy lists
- **Autosave/backup**: Regularly save/export db.json
- **Polling for live updates**: Refetch scores every 2–5 seconds for multi-referee use

---

## **9. Key Files**

- `db.json` (json-server data)
- `src/` (React app)

  - `components/` (Tabs, BottomNav, ParticipantList, TeamList, ScoreBoard, Leaderboard, PINDialog)
  - `pages/` (Setup, Scoring, Leaderboard)
  - `App.js` (routing/layout)
  - `api.js` (axios/fetch helpers for REST API)

---

## **10. Next Steps**

If you like this plan, I can:

- Draft the **project folder structure** for you
- Provide **sample db.json**
- Give you **starter React code for navigation/layout**
- Help with **MUI components** for key pages

Let me know which you want next:

- **React skeleton (pages, navigation, MUI)**
- **db.json sample and json-server config**
- **API helpers and sample endpoints**
- **Or all of the above!**

Ready to start coding, or want more details on any part?
