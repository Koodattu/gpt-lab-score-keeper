import { AppBar, Toolbar, Typography, Box, CssBaseline, ThemeProvider, Container } from "@mui/material";
import AppBarBottom from "./components/AppBarBottom";
import { useState } from "react";
import theme from "./theme";
import "./App.css";
import Setup from "./pages/Setup";
import Scoring from "./pages/Scoring";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  const [page, setPage] = useState(0); // 0: Setup, 1: Scoring, 2: Leaderboard

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        {/* Top App Bar - Fixed */}
        <AppBar position="static" elevation={0}>
          <Toolbar sx={{ justifyContent: "center", minHeight: { xs: 56, sm: 64 } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.5,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              GPT-Lab Score Keeper
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content Area - Flexible, takes remaining space */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            px: { xs: 1, sm: 2 },
            py: { xs: 1, sm: 2 },
            pb: { xs: 8, sm: 9 }, // Account for bottom navigation
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.paper",
              borderRadius: { xs: 2, sm: 3 },
              boxShadow: 2,
              overflow: "hidden",
              p: 0,
            }}
          >
            {page === 0 && <Setup />}
            {page === 1 && <Scoring />}
            {page === 2 && <Leaderboard />}
          </Container>
        </Box>

        {/* Bottom Navigation - Fixed */}
        <AppBarBottom value={page} onChange={(e, v) => setPage(v)} />
      </Box>
    </ThemeProvider>
  );
}
