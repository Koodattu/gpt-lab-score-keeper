// Scoring.jsx
// Page for Scoring (5 sports tabs)
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import ScoreBoard from "../components/ScoreBoard";

const sports = ["Stick Javelin", "Mölkky/Hutunkeitto", "Brown Water Swim", "Frisbee Putting", "Vase Arrangement"];

export default function Scoring() {
  const [tab, setTab] = useState(0);
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: { xs: 1, sm: 2 },
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
      <Box
        sx={{
          mt: { xs: 1, sm: 2 },
          px: { xs: 0, sm: 1 },
          width: "100%",
        }}
      >
        <ScoreBoard sport={sports[tab]} />
      </Box>
    </Box>
  );
}
