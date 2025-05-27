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
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        {/* Top App Bar */}
        <AppBar position="sticky" elevation={0}>
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

        {/* Main Content Area */}
        <Container
          maxWidth="sm"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            py: { xs: 1, sm: 2 },
            px: { xs: 1, sm: 2 },
            pb: { xs: 8, sm: 9 }, // Account for bottom navigation
          }}
        >
          <Box
            sx={{
              flex: 1,
              bgcolor: "background.paper",
              borderRadius: { xs: 2, sm: 3 },
              p: { xs: 2, sm: 3 },
              boxShadow: 2,
              minHeight: "calc(100vh - 120px)",
            }}
          >
            {page === 0 && <Setup />}
            {page === 1 && <Scoring />}
            {page === 2 && <Leaderboard />}
          </Box>
        </Container>

        {/* Bottom Navigation */}
        <AppBarBottom value={page} onChange={(e, v) => setPage(v)} />
      </Box>
    </ThemeProvider>
  );
}
