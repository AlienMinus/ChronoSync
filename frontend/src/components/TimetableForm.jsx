import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  TextField,
  MenuItem,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  Chip,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  AddCircleOutline,
  DeleteOutline,
  Speed,
  PrecisionManufacturing,
  AutoAwesome,
  Schedule,
  School,
} from "@mui/icons-material";

export default function TimetableForm({ onSubmit, loading }) {
  const [totalSlots, setTotalSlots] = useState(8);
  const [slotSettings, setSlotSettings] = useState({
    1: "08:15",
    2: "09:10",
    3: "10:05",
    4: "11:00",
    5: "11:55",
    6: "12:50",
    7: "13:45",
    8: "14:40",
  });

  const [rows, setRows] = useState([
    {
      subject: "",
      day: "Monday",
      period: "1",
      duration: "lecture",
      info: "",
      color: "#6366f1",
    },
  ]);

  const addRow = () =>
    setRows([
      ...rows,
      {
        subject: "",
        day: "Monday",
        period: "1",
        duration: "lecture",
        info: "",
        color: "#6366f1",
      },
    ]);
  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSubmit = () => {
    const payload = {
      total_slots: parseInt(totalSlots),
      slot_settings: slotSettings,
      breaks: [{ name: "Lunch Break", start: "10:55", end: "11:30" }],
      schedule_items: rows.filter((r) => r.subject.trim() !== ""),
    };
    onSubmit(payload);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f0f2f5", pb: 10 }}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          color: "#1a1a1a",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <School sx={{ color: "#6366f1", fontSize: 32 }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, letterSpacing: "-0.5px" }}
              >
                ChronoSync{" "}
                <Box component="span" sx={{ color: "#6366f1" }}>
                  PRO
                </Box>
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AutoAwesome />}
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                borderRadius: "12px",
                bgcolor: "#1a1a1a",
                "&:hover": { bgcolor: "#6366f1" },
                px: 4,
                py: 1,
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              {loading ? "Optimizing..." : "Generate Schedule"}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "32px",
            border: "1px solid #e0e0e0",
            overflow: "hidden",
            bgcolor: "#fff",
          }}
        >
          <Box
            sx={{ p: 4, bgcolor: "#fafafa", borderBottom: "1px solid #f0f0f0" }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={3}>
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 900,
                    color: "text.secondary",
                    mb: 1,
                    display: "block",
                  }}
                >
                  Daily Capacity
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={totalSlots}
                  onChange={(e) => setTotalSlots(e.target.value)}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    sx: {
                      borderRadius: "12px",
                      bgcolor: "#fff",
                      fontWeight: "bold",
                    },
                  }}
                >
                  {[4, 6, 8, 10].map((n) => (
                    <MenuItem key={n} value={n}>
                      {n} Sessions
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 900,
                    color: "text.secondary",
                    mb: 1,
                    display: "block",
                  }}
                >
                  Timeline Snapshots
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ overflowX: "auto", pb: 1 }}
                >
                  {Object.keys(slotSettings)
                    .slice(0, totalSlots)
                    .map((slot) => (
                      <Paper
                        key={slot}
                        variant="outlined"
                        sx={{
                          p: 1,
                          borderRadius: "12px",
                          minWidth: 100,
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold", color: "#6366f1" }}
                        >
                          {slot}
                        </Typography>
                        <input
                          type="time"
                          value={slotSettings[slot]}
                          onChange={(e) =>
                            setSlotSettings({
                              ...slotSettings,
                              [slot]: e.target.value,
                            })
                          }
                          style={{
                            border: "none",
                            outline: "none",
                            fontSize: "12px",
                            fontWeight: "600",
                            width: "100%",
                          }}
                        />
                      </Paper>
                    ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ p: { xs: 2, md: 5 } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Course Curriculum
              </Typography>
              <Button
                startIcon={<AddCircleOutline />}
                onClick={addRow}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Add Course
              </Button>
            </Box>

            <Stack spacing={3}>
              {rows.map((row, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: "24px",
                    transition: "0.3s",
                    "&:hover": {
                      borderColor: "#6366f1",
                      boxShadow: "0 10px 20px rgba(99, 102, 241, 0.05)",
                    },
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: "250px" }}>
                    <TextField
                      placeholder="e.g. Quantum Mechanics"
                      variant="standard"
                      fullWidth
                      value={row.subject}
                      onChange={(e) =>
                        updateRow(index, "subject", e.target.value)
                      }
                      InputProps={{
                        sx: {
                          fontSize: "1.2rem",
                          fontWeight: 800,
                          "&:before": { border: "none" },
                        },
                      }}
                    />
                    <TextField
                      placeholder="Room number or Additional Info"
                      variant="standard"
                      fullWidth
                      size="small"
                      value={row.info}
                      onChange={(e) => updateRow(index, "info", e.target.value)}
                      InputProps={{
                        sx: {
                          fontSize: "0.75rem",
                          color: "text.secondary",
                          "&:before": { border: "none" },
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      bgcolor: "#f5f5f5",
                      p: 1,
                      borderRadius: "14px",
                    }}
                  >
                    <Select
                      value={row.day}
                      onChange={(e) => updateRow(index, "day", e.target.value)}
                      variant="standard"
                      disableUnderline
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 900,
                        px: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ].map((d) => (
                        <MenuItem key={d} value={d}>
                          {d}
                        </MenuItem>
                      ))}
                    </Select>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 800, color: "grey.400" }}
                      >
                        SLOT
                      </Typography>
                      <TextField
                        type="number"
                        variant="standard"
                        value={row.period}
                        onChange={(e) =>
                          updateRow(index, "period", e.target.value)
                        }
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            fontSize: "0.75rem",
                            fontWeight: 900,
                            color: "#6366f1",
                            width: 30,
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      bgcolor: "#f5f5f5",
                      borderRadius: "12px",
                      p: 0.5,
                    }}
                  >
                    {["lecture", "lab", "lab3"].map((type) => (
                      <Button
                        key={type}
                        size="small"
                        onClick={() => updateRow(index, "duration", type)}
                        sx={{
                          borderRadius: "10px",
                          fontSize: "10px",
                          fontWeight: 900,
                          bgcolor:
                            row.duration === type ? "#fff" : "transparent",
                          color:
                            row.duration === type ? "#1a1a1a" : "text.disabled",
                          boxShadow:
                            row.duration === type
                              ? "0 2px 8px rgba(0,0,0,0.05)"
                              : "none",
                          "&:hover": { bgcolor: "#fff" },
                        }}
                      >
                        {type === "lab3" ? "LAB 3H" : type}
                      </Button>
                    ))}
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <input
                      type="color"
                      value={row.color}
                      onChange={(e) =>
                        updateRow(index, "color", e.target.value)
                      }
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "none",
                        borderRadius: "50%",
                        cursor: "pointer",
                        background: "none",
                      }}
                    />
                    <IconButton
                      onClick={() =>
                        setRows(rows.filter((_, i) => i !== index))
                      }
                      color="error"
                      sx={{ bgcolor: "#fff0f0" }}
                    >
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              p: 4,
              bgcolor: "#1a1a1a",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "grey.500",
                    fontWeight: "bold",
                    letterSpacing: 2,
                  }}
                >
                  PRECISION
                </Typography>
                <PrecisionManufacturing
                  sx={{ display: "block", mx: "auto", mt: 1, color: "#6366f1" }}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "grey.500",
                    fontWeight: "bold",
                    letterSpacing: 2,
                  }}
                >
                  CLARITY
                </Typography>
                <Speed
                  sx={{ display: "block", mx: "auto", mt: 1, color: "#6366f1" }}
                />
              </Box>
            </Stack>

            <Typography
              variant="caption"
              sx={{ color: "grey.600", fontWeight: "bold" }}
            >
              CHRONOSYNC • 2026
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
