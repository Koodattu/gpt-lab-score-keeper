// LeaderboardIndividuals.jsx
// Component for individual leaderboard
import { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import api from "../api";

const sports = [
  "Stick Javelin",
  "Mölkky",
  "Hutunkeitto",
  "Brown Water Swim",
  "Frisbee Putting",
  "Vase Arrangement",
  "Tractor/Trailer Reversing",
];

export default function LeaderboardIndividuals() {
  const [participants, setParticipants] = useState([]);
  const [scores, setScores] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [participantsData, scoresData] = await Promise.all([api.get("/participants"), api.get("/scores")]);
        setParticipants(participantsData);
        setScores(scoresData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getTotal = (pid) =>
    sports.reduce((sum, sport) => {
      const s = scores.find((sc) => sc.participantId === pid && sc.sport === sport);
      return sum + (s ? s.points : 0);
    }, 0);

  const sorted = [...participants].sort((a, b) => getTotal(b.id) - getTotal(a.id));
  return (
    <Box sx={{ width: "100%", px: { xs: 1, sm: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontSize: { xs: 20, sm: 24 },
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Individual Leaderboard
      </Typography>
      <List sx={{ width: "100%", maxWidth: "100%" }}>
        {sorted.map((p, i) => (
          <ListItem
            key={p.id}
            sx={{
              mb: 2,
              borderRadius: 2,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 2, sm: 1.5 },
            }}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontSize: { xs: 18, sm: 16 },
                    fontWeight: 500,
                    color: i === 0 ? "warning.main" : i === 1 ? "text.secondary" : i === 2 ? "#cd7f32" : "text.primary",
                  }}
                >
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`} {p.name}
                </Typography>
              }
              secondary={
                <Typography
                  sx={{
                    fontSize: { xs: 16, sm: 14 },
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                >
                  Total Score: {getTotal(p.id)} points
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      {participants.length === 0 && (
        <Typography
          color="text.secondary"
          sx={{
            textAlign: "center",
            py: 4,
            fontSize: { xs: 16, sm: 14 },
          }}
        >
          No participants added yet. Add some participants to see the leaderboard!
        </Typography>
      )}
    </Box>
  );
}
