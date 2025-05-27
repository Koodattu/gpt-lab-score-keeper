// FormTeams.jsx
// Component for creating/editing teams and assigning participants
import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Chip,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import api from "../api";
import PINDialog from "./PINDialog";

export default function FormTeams() {
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editMembers, setEditMembers] = useState([]);
  const [pinOpen, setPinOpen] = useState(false);
  const [admin, setAdmin] = useState(() => localStorage.getItem("admin") === "1");
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    api.get("/teams").then(setTeams);
    api.get("/participants").then(setParticipants);
  }, []);

  const requireAdmin = (action) => {
    if (admin) return action();
    setPinOpen(true);
  };

  const handleAdd = async () => {
    requireAdmin(async () => {
      if (!teamName.trim() || teams.some((t) => t.name === teamName.trim())) {
        setSnack({ open: true, message: "Team name required and must be unique", severity: "error" });
        return;
      }
      const newT = await api.post("/teams", { name: teamName.trim(), members: selected.map((p) => p.id) });
      setTeams([...teams, newT]);
      setTeamName("");
      setSelected([]);
      setSnack({ open: true, message: "Team added", severity: "success" });
    });
  };

  const handleDelete = async (id) => {
    requireAdmin(async () => {
      await api.delete(`/teams/${id}`);
      setTeams(teams.filter((t) => t.id !== id));
      setSnack({ open: true, message: "Team deleted", severity: "info" });
    });
  };

  const handleEdit = (id, name, members) => {
    requireAdmin(() => {
      setEditingId(id);
      setEditName(name);
      setEditMembers(participants.filter((p) => members.includes(p.id)));
    });
  };

  const handleEditSave = async (id) => {
    requireAdmin(async () => {
      await api.patch(`/teams/${id}`, { name: editName, members: editMembers.map((p) => p.id) });
      setTeams(teams.map((t) => (t.id === id ? { ...t, name: editName, members: editMembers.map((p) => p.id) } : t)));
      setEditingId(null);
      setEditName("");
      setEditMembers([]);
      setSnack({ open: true, message: "Team updated", severity: "success" });
    });
  };

  const handlePinSuccess = () => {
    setAdmin(true);
    localStorage.setItem("admin", "1");
    setPinOpen(false);
  };

  // Participants not yet assigned to any team
  const assignedIds = teams.flatMap((t) => t.members);
  const unassigned = participants.filter((p) => !assignedIds.includes(p.id));
  return (
    <Box sx={{ width: "100%", px: { xs: 1, sm: 2 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 1 },
          mb: 3,
          mt: 2,
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <TextField
          label="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          size="small"
          fullWidth={true}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 1,
            maxWidth: { xs: "100%", sm: 200 },
          }}
          inputProps={{ style: { fontSize: 16 } }}
        />
        <Autocomplete
          multiple
          options={unassigned}
          getOptionLabel={(p) => p.name}
          value={selected}
          onChange={(_, v) => setSelected(v)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => <Chip label={option.name} {...getTagProps({ index })} size="small" />)
          }
          renderInput={(params) => <TextField {...params} label="Members" size="small" />}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 1,
            minWidth: { xs: "100%", sm: 200 },
            flexGrow: 1,
          }}
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            fontSize: { xs: 16, sm: 18 },
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 1 },
            borderRadius: 2,
            height: { xs: 48, sm: 40 },
            minWidth: { xs: "100%", sm: "auto" },
          }}
        >
          Add
        </Button>
      </Box>{" "}
      <List sx={{ width: "100%", maxWidth: "100%" }}>
        {teams.map((t) => (
          <ListItem
            key={t.id}
            sx={{
              mb: 2,
              borderRadius: 2,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: { xs: 1, sm: 0 },
              p: { xs: 2, sm: 1 },
            }}
            secondaryAction={
              editingId === t.id ? (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: { xs: 1, sm: 0 },
                    alignSelf: { xs: "flex-end", sm: "center" },
                  }}
                >
                  <IconButton onClick={() => handleEditSave(t.id)} size="large" sx={{ color: "success.main" }}>
                    <EditIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />
                  </IconButton>
                  <IconButton onClick={() => setEditingId(null)} size="large" sx={{ color: "text.secondary" }}>
                    <DeleteIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: { xs: 1, sm: 0 },
                    alignSelf: { xs: "flex-end", sm: "center" },
                  }}
                >
                  <IconButton
                    onClick={() => handleEdit(t.id, t.name, t.members)}
                    size="large"
                    sx={{ color: "primary.main" }}
                  >
                    <EditIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(t.id)} size="large" sx={{ color: "error.main" }}>
                    <DeleteIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />
                  </IconButton>
                </Box>
              )
            }
          >
            {" "}
            {editingId === t.id ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 2, sm: 1 },
                  width: "100%",
                  mr: { xs: 0, sm: 12 },
                }}
              >
                <TextField
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  size="small"
                  label="Team Name"
                  fullWidth
                  sx={{
                    maxWidth: { xs: "100%", sm: 200 },
                  }}
                  inputProps={{ style: { fontSize: 16 } }}
                />
                <Autocomplete
                  multiple
                  options={participants}
                  getOptionLabel={(p) => p.name}
                  value={editMembers}
                  onChange={(_, v) => setEditMembers(v)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => <Chip label={option.name} {...getTagProps({ index })} size="small" />)
                  }
                  renderInput={(params) => <TextField {...params} label="Members" size="small" />}
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    flexGrow: 1,
                  }}
                />
              </Box>
            ) : (
              <ListItemText
                sx={{ mr: { xs: 0, sm: 12 } }}
                primary={<Typography sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 500 }}>{t.name}</Typography>}
                secondary={
                  <Typography sx={{ fontSize: { xs: 14, sm: 14 }, color: "text.secondary" }}>
                    {t.members
                      .map((id) => participants.find((p) => p.id === id)?.name)
                      .filter(Boolean)
                      .join(", ")}
                  </Typography>
                }
              />
            )}
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
          No teams yet. Create your first team above!
        </Typography>
      )}
      <PINDialog open={pinOpen} onClose={() => setPinOpen(false)} onSuccess={handlePinSuccess} />
      <Snackbar open={snack.open} autoHideDuration={2000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
