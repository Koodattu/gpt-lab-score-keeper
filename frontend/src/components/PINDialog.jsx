// PINDialog.jsx
// Modal dialog for admin PIN entry
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import api from "../api";

export default function PINDialog({ open, onClose, onSuccess }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const adminData = await api.get("/admin");
      if (adminData && adminData.pin && pin === adminData.pin) {
        onSuccess();
        setPin("");
        setError("");
      } else {
        setError("Incorrect PIN. Please try again.");
      }
    } catch {
      setError("Error verifying PIN. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPin("");
    setError("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          m: { xs: 2, sm: 3 },
          width: { xs: "calc(100% - 32px)", sm: "100%" },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: { xs: 18, sm: 20 },
          fontWeight: 600,
          textAlign: "center",
          pb: 1,
        }}
      >
        Admin PIN Required
      </DialogTitle>
      <DialogContent sx={{ pt: 2, pb: 1 }}>
        <TextField
          label="Enter PIN"
          type="password"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setError("");
          }}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
          fullWidth
          size="medium"
          error={!!error}
          helperText={error}
          disabled={loading}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: { xs: 18, sm: 16 },
              textAlign: "center",
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          gap: 1,
          p: { xs: 2, sm: 3 },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            fontSize: { xs: 16, sm: 14 },
            minWidth: { xs: "100%", sm: "auto" },
            order: { xs: 2, sm: 1 },
          }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            fontSize: { xs: 16, sm: 14 },
            minWidth: { xs: "100%", sm: "auto" },
            order: { xs: 1, sm: 2 },
          }}
          disabled={loading}
        >
          Unlock Admin
        </Button>
      </DialogActions>
    </Dialog>
  );
}
