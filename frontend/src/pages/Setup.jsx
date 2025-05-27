// Setup.jsx
// Page for Setup (Add People, Form Teams)
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import AddPeople from "../components/AddPeople";
import FormTeams from "../components/FormTeams";

export default function Setup() {
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
        <Tab label="Add People" />
        <Tab label="Form Teams" />
      </Tabs>
      <Box
        sx={{
          mt: { xs: 1, sm: 2 },
          px: { xs: 0, sm: 1 },
          width: "100%",
        }}
      >
        {tab === 0 && <AddPeople />}
        {tab === 1 && <FormTeams />}
      </Box>
    </Box>
  );
}
