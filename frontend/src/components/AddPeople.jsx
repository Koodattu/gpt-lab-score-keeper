// AddPeople.jsx
// Component for adding, editing, deleting participants
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
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import api from "../api";
import PINDialog from "./PINDialog";

export default function AddPeople() {
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [pinOpen, setPinOpen] = useState(false);
  const [admin, setAdmin] = useState(() => localStorage.getItem("admin") === "1");
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    api.get("/participants").then(setParticipants);
  }, []);

  const requireAdmin = (action) => {
    if (admin) return action();
    setPinOpen(true);
  };

  const handleAdd = async () => {
    requireAdmin(async () => {
      if (!name.trim() || participants.some((p) => p.name === name.trim())) {
        setSnack({ open: true, message: "Name required and must be unique", severity: "error" });
        return;
      }
      const newP = await api.post("/participants", { name: name.trim() });
      setParticipants([...participants, newP]);
      setName("");
      setSnack({ open: true, message: "Participant added", severity: "success" });
    });
  };

  const handleDelete = async (id) => {
    requireAdmin(async () => {
      await api.delete(`/participants/${id}`);
      setParticipants(participants.filter((p) => p.id !== id));
      setSnack({ open: true, message: "Participant deleted", severity: "info" });
    });
  };

  const handleEdit = (id, currentName) => {
    requireAdmin(() => {
      setEditingId(id);
      setEditName(currentName);
    });
  };

  const handleEditSave = async (id) => {
    requireAdmin(async () => {
      await api.patch(`/participants/${id}`, { name: editName });
      setParticipants(participants.map((p) => (p.id === id ? { ...p, name: editName } : p)));
      setEditingId(null);
      setEditName("");
      setSnack({ open: true, message: "Participant updated", severity: "success" });
    });
  };

  const handlePinSuccess = () => {
    setAdmin(true);
    localStorage.setItem("admin", "1");
    setPinOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, sm: 2 },
          mb: { xs: 2, sm: 3 },
          mt: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "center",
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
          fullWidth={true}
          sx={{
            bgcolor: "background.default",
            borderRadius: 1,
            maxWidth: { xs: "100%", sm: 200 },
          }}
          inputProps={{ style: { fontSize: 16 } }}
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            fontSize: 16,
            px: 3,
            borderRadius: 2,
            height: 40,
            minWidth: { xs: "100%", sm: 80 },
          }}
        >
          Add
        </Button>
      </Box>
      <List sx={{ width: "100%", maxWidth: { xs: "100%", sm: 480 }, mx: "auto" }}>
        {participants.map((p) => (
          <ListItem
            key={p.id}
            sx={{
              mb: 1,
              borderRadius: 2,
              bgcolor: "background.default",
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
            }}
            secondaryAction={
              editingId === p.id ? (
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton edge="end" onClick={() => handleEditSave(p.id)} size="small">
                    <EditIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </IconButton>
                  <IconButton edge="end" onClick={() => setEditingId(null)} size="small">
                    <DeleteIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton edge="end" onClick={() => handleEdit(p.id, p.name)} size="small">
                    <EditIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(p.id)} size="small">
                    <DeleteIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </IconButton>
                </Box>
              )
            }
          >
            {editingId === p.id ? (
              <TextField
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                size="small"
                fullWidth
                sx={{ mr: 2 }}
                inputProps={{ style: { fontSize: 16 } }}
              />
            ) : (
              <ListItemText primary={<span style={{ fontSize: 16, fontWeight: 500 }}>{p.name}</span>} />
            )}
          </ListItem>
        ))}
      </List>
      {participants.length === 0 && (
        <Typography color="text.secondary" textAlign="center" sx={{ mt: 4, fontSize: 16 }}>
          No participants yet.
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
