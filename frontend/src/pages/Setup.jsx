// Setup.jsx
// Page for Setup (Add People, Form Teams)
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import AddPeople from "../components/AddPeople";
import FormTeams from "../components/FormTeams";
import PINDialog from "../components/PINDialog";

export default function Setup() {
  const [tab, setTab] = useState(0);
  const [admin, setAdmin] = useState(() => localStorage.getItem("admin") === "1");
  const [pinOpen, setPinOpen] = useState(false);

  const handleRequireAdmin = () => {
    if (!admin) setPinOpen(true);
  };
  const handlePinSuccess = () => {
    setAdmin(true);
    localStorage.setItem("admin", "1");
    setPinOpen(false);
  };

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
        <Tab label="Add People" onClick={handleRequireAdmin} />
        <Tab label="Form Teams" onClick={handleRequireAdmin} />
      </Tabs>

      {/* Scrollable Content Area */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: { xs: 2, sm: 3 },
        }}
      >
        {tab === 0 && <AddPeople admin={admin} />}
        {tab === 1 && <FormTeams admin={admin} />}
      </Box>

      <PINDialog open={pinOpen} onClose={() => setPinOpen(false)} onSuccess={handlePinSuccess} />
    </Box>
  );
}
