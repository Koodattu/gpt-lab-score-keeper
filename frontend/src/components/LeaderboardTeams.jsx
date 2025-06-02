// LeaderboardTeams.jsx
// Component for team leaderboard
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

export default function LeaderboardTeams() {
  const [teams, setTeams] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [scores, setScores] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsData, participantsData, scoresData] = await Promise.all([
          api.get("/teams"),
          api.get("/participants"),
          api.get("/scores"),
        ]);
        setTeams(teamsData);
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

  const getTotal = (memberIds) =>
    memberIds.reduce(
      (sum, pid) =>
        sum +
        sports.reduce((s, sport) => {
          const sc = scores.find((score) => score.participantId === pid && score.sport === sport);
          return s + (sc ? sc.points : 0);
        }, 0),
      0
    );

  const sorted = [...teams].sort((a, b) => getTotal(b.members) - getTotal(a.members));
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
        Team Leaderboard
      </Typography>
      <List sx={{ width: "100%", maxWidth: "100%" }}>
        {sorted.map((t, i) => (
          <ListItem
            key={t.id}
            sx={{
              mb: 2,
              borderRadius: 2,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 2, sm: 1.5 },
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontSize: { xs: 18, sm: 16 },
                    fontWeight: 500,
                    color: i === 0 ? "warning.main" : i === 1 ? "text.secondary" : i === 2 ? "#cd7f32" : "text.primary",
                    mb: 1,
                  }}
                >
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`} {t.name}
                </Typography>
              }
              secondary={
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 14, sm: 12 },
                      color: "text.secondary",
                      mb: 0.5,
                    }}
                  >
                    Members:{" "}
                    {t.members
                      .map((id) => participants.find((p) => p.id === id)?.name)
                      .filter(Boolean)
                      .join(", ")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 16, sm: 14 },
                      fontWeight: 600,
                      color: "primary.main",
                    }}
                  >
                    Total Score: {getTotal(t.members)} points
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      {teams.length === 0 && (
        <Typography
          color="text.secondary"
          sx={{
            textAlign: "center",
            py: 4,
            fontSize: { xs: 16, sm: 14 },
          }}
        >
          No teams created yet. Create some teams to see the team leaderboard!
        </Typography>
      )}
    </Box>
  );
}
