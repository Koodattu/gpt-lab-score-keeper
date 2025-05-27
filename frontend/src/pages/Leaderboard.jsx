// Leaderboard.jsx
// Page for Leaderboards (Individuals, Teams)
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import LeaderboardIndividuals from "../components/LeaderboardIndividuals";
import LeaderboardTeams from "../components/LeaderboardTeams";

export default function Leaderboard() {
  const [tab, setTab] = useState(0);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Fixed Tabs at top */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        centered
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          flexShrink: 0,
        }}
      >
        <Tab label="Individuals" />
        <Tab label="Teams" />
      </Tabs>

      {/* Scrollable Content Area */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: { xs: 2, sm: 3 },
        }}
      >
        {tab === 0 && <LeaderboardIndividuals />}
        {tab === 1 && <LeaderboardTeams />}
      </Box>
    </Box>
  );
}
