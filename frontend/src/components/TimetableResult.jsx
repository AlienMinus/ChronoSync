import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Stack,
  Divider,
} from "@mui/material";
import {
  ArrowBackIosNew,
  LocalPrintshop,
  HistoryEdu,
  EventNote,
  Layers,
  VerifiedUser,
} from "@mui/icons-material";

export default function TimetableResult({ data, onBack }) {
  const { grid_schedule, periods_order, header_times, days } = data;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC", pb: 10 }}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          color: "#1a1a1a",
          boxShadow: "none",
          borderBottom: "1px solid #E2E8F0",
        }}
        className="no-print"
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", py: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconButton
                onClick={onBack}
                sx={{ bgcolor: "#F1F5F9", borderRadius: "12px" }}
              >
                <ArrowBackIosNew sx={{ fontSize: 18 }} />
              </IconButton>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 900, lineHeight: 1 }}
                >
                  Weekly Schedule
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  ACADEMIC YEAR 2026
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={onBack}
                sx={{
                  borderRadius: "12px",
                  borderColor: "#E2E8F0",
                  color: "#64748B",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                Modify
              </Button>
              <Button
                variant="contained"
                startIcon={<LocalPrintshop />}
                onClick={() => window.print()}
                sx={{
                  borderRadius: "12px",
                  bgcolor: "#1a1a1a",
                  "&:hover": { bgcolor: "#6366F1" },
                  px: 4,
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                }}
              >
                Print PDF
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 6 }}>
        {/* 2. HEADER INFO */}
        <Box
          sx={{
            mb: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
          className="no-print"
        >
          <Box>
            <Chip
              icon={<VerifiedUser sx={{ fontSize: "16px !important" }} />}
              label="System Verified"
              size="small"
              sx={{
                fontWeight: 900,
                mb: 2,
                bgcolor: "#EEF2FF",
                color: "#6366F1",
                border: "1px solid #E0E7FF",
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#0F172A",
                letterSpacing: "-1.5px",
              }}
            >
              Chronogram <span style={{ color: "#6366F1" }}>Overview</span>
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontWeight: 500,
              maxWidth: 300,
              textAlign: "right",
            }}
          >
            Generated using ChronoSync's optimization engine for balanced
            academic workload.
          </Typography>
        </Box>

        {/* 3. THE MASTER GRID */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "32px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
          }}
        >
          <Table sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                <TableCell
                  sx={{
                    p: 4,
                    fontWeight: 900,
                    color: "#94A3B8",
                    borderRight: "1px solid #F1F5F9",
                    width: 150,
                  }}
                >
                  DAYS
                </TableCell>
                {periods_order.map((p, i) => (
                  <TableCell
                    key={i}
                    align="center"
                    sx={{ borderRight: "1px solid #F1F5F9", py: 3 }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 900, color: "#1E293B" }}
                    >
                      {p.startsWith("break") ? "BREAK" : `SLOT ${p}`}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#6366F1",
                        fontWeight: 800,
                        fontSize: "10px",
                      }}
                    >
                      {header_times[p] || "--:--"}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {days.map((day) => (
                <TableRow
                  key={day}
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell
                    sx={{
                      p: 4,
                      bgcolor: "#F8FAFC",
                      fontWeight: 900,
                      color: "#475569",
                      borderRight: "1px solid #F1F5F9",
                      fontStyle: "italic",
                    }}
                  >
                    {day}
                  </TableCell>
                  {periods_order.map((col, idx) => {
                    const cell = grid_schedule[day][col];
                    if (cell === "occupied") return null;

                    return (
                      <TableCell
                        key={idx}
                        colSpan={cell?.colspan || 1}
                        sx={{
                          p: 1.5,
                          borderRight: "1px solid #F1F5F9",
                          verticalAlign: "top",
                        }}
                      >
                        {cell && !cell.is_gap ? (
                          <Paper
                            elevation={0}
                            sx={{
                              minHeight: 120,
                              p: 2.5,
                              borderRadius: "20px",
                              bgcolor: `${cell.color}08`,
                              borderLeft: `6px solid ${cell.color}`,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: `0 12px 20px -10px ${cell.color}40`,
                                bgcolor: `${cell.color}12`,
                              },
                            }}
                          >
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  fontWeight: 900,
                                  color: cell.color,
                                  textTransform: "uppercase",
                                  letterSpacing: 1,
                                }}
                              >
                                {cell.duration || "Session"}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: 900,
                                  color: "#1E293B",
                                  mt: 0.5,
                                  lineHeight: 1.2,
                                }}
                              >
                                {cell.subject}
                              </Typography>
                            </Box>

                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              sx={{ mt: 2 }}
                            >
                              <Box
                                sx={{
                                  px: 1.5,
                                  py: 0.5,
                                  bgcolor: "#fff",
                                  borderRadius: "8px",
                                  border: "1px solid rgba(0,0,0,0.05)",
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{ fontWeight: 800, color: "#64748B" }}
                                >
                                  {cell.start}
                                </Typography>
                              </Box>
                              <HistoryEdu
                                sx={{
                                  fontSize: 16,
                                  color: cell.color,
                                  opacity: 0.5,
                                }}
                              />
                            </Stack>
                          </Paper>
                        ) : (
                          <Box
                            sx={{
                              minHeight: 120,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: 4,
                                height: 4,
                                borderRadius: "50%",
                                bgcolor: "#E2E8F0",
                              }}
                            />
                          </Box>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack
          direction="row"
          spacing={4}
          sx={{ mt: 8, justifyContent: "center", opacity: 0.5 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EventNote sx={{ fontSize: 16 }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, letterSpacing: 1 }}
            >
              SMART SCHEDULING
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Layers sx={{ fontSize: 16 }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, letterSpacing: 1 }}
            >
              256-BIT ENCRYPTION
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
