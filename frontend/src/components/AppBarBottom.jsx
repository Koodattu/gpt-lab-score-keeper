import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PeopleIcon from "@mui/icons-material/People";
import SportsIcon from "@mui/icons-material/Sports";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

export default function AppBarBottom({ value, onChange }) {
  return (
    <BottomNavigation
      value={value}
      onChange={(_, newValue) => onChange(_, newValue)}
      showLabels
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: "1px solid",
        borderTopColor: "divider",
        height: { xs: 56, sm: 64 },
        bgcolor: "background.paper",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <BottomNavigationAction
        label="Setup"
        icon={<PeopleIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />}
        sx={{
          "& .MuiBottomNavigationAction-label": {
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
          },
        }}
      />
      <BottomNavigationAction
        label="Scoring"
        icon={<SportsIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />}
        sx={{
          "& .MuiBottomNavigationAction-label": {
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
          },
        }}
      />
      <BottomNavigationAction
        label="Leaderboard"
        icon={<LeaderboardIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />}
        sx={{
          "& .MuiBottomNavigationAction-label": {
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
          },
        }}
      />
    </BottomNavigation>
  );
}
