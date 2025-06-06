// ScoreBoard.jsx
// Component for scoring participants in a given sport
import { useState, useEffect } from "react";
import { Box, Typography, IconButton, List, ListItem, ListItemText, TextField, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import api from "../api";
import PINDialog from "./PINDialog";

export default function ScoreBoard({ sport }) {
  const [participants, setParticipants] = useState([]);
  const [scores, setScores] = useState([]);
  const [search, setSearch] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const [admin, setAdmin] = useState(() => localStorage.getItem("admin") === "1");
  const [pinOpen, setPinOpen] = useState(false);

  useEffect(() => {
    api.get("/participants").then(setParticipants);
    api.get("/scores?sport=" + encodeURIComponent(sport)).then(setScores);
  }, [sport]);

  // Poll for live updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      api.get("/participants").then(setParticipants);
      api.get("/scores?sport=" + encodeURIComponent(sport)).then(setScores);
    }, 3000);
    return () => clearInterval(interval);
  }, [sport]);

  const getScore = (pid) => scores.find((s) => s.participantId === pid)?.points || 0;

  const requireAdmin = (action) => {
    if (admin) return action();
    setPinOpen(true);
  };

  const handleScore = async (pid, delta) => {
    requireAdmin(async () => {
      let score = scores.find((s) => s.participantId === pid);
      if (!score) {
        const newScore = await api.post("/scores", { participantId: pid, sport, points: delta });
        setScores([...scores, newScore]);
        setSnack({ open: true, message: `Score set to ${delta}`, severity: "success" });
      } else {
        const updated = await api.patch(`/scores/${score.id}`, { points: score.points + delta });
        setScores(scores.map((s) => (s.id === score.id ? updated : s)));
        setSnack({ open: true, message: `Score updated: ${score.points + delta}`, severity: "success" });
      }
    });
  };

  const handlePinSuccess = () => {
    setAdmin(true);
    localStorage.setItem("admin", "1");
    setPinOpen(false);
  };

  const filtered = participants.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  // Sort filtered participants alphabetically by name before rendering
  const sortedFiltered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Box sx={{ width: "100%", px: { xs: 0, sm: 1 } }}>
      <TextField
        label="Search participants"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        fullWidth
        sx={{
          mb: 3,
          bgcolor: "background.paper",
          borderRadius: 1,
          maxWidth: { xs: "100%", sm: 400 },
        }}
        inputProps={{ style: { fontSize: 16 } }}
      />
      <List sx={{ width: "100%", maxWidth: "100%" }}>
        {sortedFiltered.map((p) => (
          <ListItem
            key={p.id}
            sx={{
              mb: 2,
              borderRadius: 2,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: { xs: 2, sm: 0 },
              p: { xs: 1, sm: 1 },
            }}
            secondaryAction={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 0, sm: 1 },
                  mt: { xs: 0, sm: 0 },
                  alignSelf: { xs: "center", sm: "flex-end" },
                }}
              >
                <IconButton
                  onClick={() => handleScore(p.id, -1)}
                  size="large"
                  sx={{
                    bgcolor: "error.main",
                    color: "white",
                    "&:hover": { bgcolor: "error.dark" },
                    width: { xs: 40, sm: 40 },
                    height: { xs: 40, sm: 40 },
                  }}
                >
                  <RemoveIcon sx={{ fontSize: { xs: 28, sm: 24 } }} />
                </IconButton>
                <Typography
                  sx={{
                    mx: { xs: 2, sm: 1 },
                    minWidth: { xs: 32, sm: 32 },
                    display: "inline-block",
                    textAlign: "center",
                    fontSize: { xs: 24, sm: 20 },
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                >
                  {getScore(p.id)}
                </Typography>
                <IconButton
                  onClick={() => handleScore(p.id, 1)}
                  size="large"
                  sx={{
                    bgcolor: "success.main",
                    color: "white",
                    "&:hover": { bgcolor: "success.dark" },
                    width: { xs: 40, sm: 40 },
                    height: { xs: 40, sm: 40 },
                  }}
                >
                  <AddIcon sx={{ fontSize: { xs: 28, sm: 24 } }} />
                </IconButton>
              </Box>
            }
          >
            <ListItemText
              sx={{ mr: { xs: 0, sm: 16 } }}
              primary={<Typography sx={{ fontSize: { xs: 16, sm: 16 }, fontWeight: 500 }}>{p.name}</Typography>}
            />
          </ListItem>
        ))}
      </List>
      {filtered.length === 0 && (
        <Typography
          color="text.secondary"
          sx={{
            textAlign: "center",
            py: 4,
            fontSize: { xs: 16, sm: 14 },
          }}
        >
          {participants.length === 0 ? "No participants added yet." : "No participants found."}
        </Typography>
      )}
      <PINDialog open={pinOpen} onClose={() => setPinOpen(false)} onSuccess={handlePinSuccess} />
      <Snackbar open={snack.open} autoHideDuration={1500} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
// Update sports list if hardcoded, and ensure scoring logic uses the updated list from props or context if needed.
