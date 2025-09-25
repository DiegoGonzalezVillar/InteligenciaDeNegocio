import { Grid, Typography, Box, CircularProgress } from "@mui/material";

export default function AfapMetricsPanel({
  title = "",
  metrics = [],
  footnote,
  loading = false,
  error = null,
}) {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        width: "100%",
        backgroundColor: "#BE3A4A",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1000 }}>
        {title && (
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ mb: 8, fontWeight: 600 }}
          >
            {title}
          </Typography>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress color="inherit" />
          </Box>
        ) : error ? (
          <Typography align="center" color="error">
            {error}
          </Typography>
        ) : (
          <Grid
            container
            spacing={10}
            justifyContent="center" // centra horizontalmente
            alignItems="center"
          >
            {metrics.map((m, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Typography
                  align="center"
                  variant="body2"
                  sx={{ opacity: 0.9 }}
                >
                  {m.label}
                </Typography>
                <Typography
                  variant="h3"
                  align="center"
                  sx={{ fontWeight: 800, color: "white", mt: 1 }}
                >
                  {m.value}
                </Typography>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: 800, color: "white" }}
              >
                Total {footnote}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
