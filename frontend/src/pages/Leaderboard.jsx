// Leaderboard.jsx
// Page for Leaderboards (Individuals, Teams)
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import LeaderboardIndividuals from "../components/LeaderboardIndividuals";
import LeaderboardTeams from "../components/LeaderboardTeams";

export default function Leaderboard() {
  const [tab, setTab] = useState(0);
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        centered
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: { xs: 1, sm: 2 },
        }}
      >
        <Tab label="Individuals" />
        <Tab label="Teams" />
      </Tabs>
      <Box
        sx={{
          mt: { xs: 1, sm: 2 },
          px: { xs: 0, sm: 1 },
          width: "100%",
        }}
      >
        {tab === 0 && <LeaderboardIndividuals />}
        {tab === 1 && <LeaderboardTeams />}
      </Box>
    </Box>
  );
}
