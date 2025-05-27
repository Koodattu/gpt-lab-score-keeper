// Scoring.jsx
// Page for Scoring (5 sports tabs)
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import ScoreBoard from "../components/ScoreBoard";

const sports = ["Stick Javelin", "Mölkky/Hutunkeitto", "Brown Water Swim", "Frisbee Putting", "Vase Arrangement"];

export default function Scoring() {
  const [tab, setTab] = useState(0);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Fixed Tabs at top */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          flexShrink: 0,
        }}
      >
        {sports.map((sport) => (
          <Tab
            key={sport}
            label={sport}
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              minWidth: { xs: "auto", sm: 90 },
              px: { xs: 1, sm: 2 },
            }}
          />
        ))}
      </Tabs>

      {/* Scrollable Content Area */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: { xs: 0.5, sm: 3 },
        }}
      >
        <ScoreBoard sport={sports[tab]} />
      </Box>
    </Box>
  );
}
