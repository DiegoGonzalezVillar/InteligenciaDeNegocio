import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Grid, Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AfapMetricsPanel from "../componentes/DatosParaPrestaciones";
import { URL } from "../comercial/Constantes.js";

export default function AfapMetricsPage() {
  const [metrics, setMetrics] = useState([]);
  const [footnote, setFootnote] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de fechas (dayjs)
  const [desde, setDesde] = useState(dayjs().startOf("month"));
  const [hasta, setHasta] = useState(dayjs());

  let desdeFormat = desde.format("DD-MMM-YYYY");
  let hastaFormat = hasta.format("DD-MMM-YYYY");

  useEffect(() => {
    if (!desde || !hasta) return;
    if (hasta.isBefore(desde, "day")) return;
    setLoading(true);

    fetch(`${URL}infoPrestacionesSegunFecha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        desde: desdeFormat, // si usas dayjs/moment
        hasta: hastaFormat,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la respuesta");
        return response.json();
      })
      .then((data) => {
        const json = typeof data === "string" ? JSON.parse(data) : data;
        setMetrics(json.metrics || []);
        const total = (json.metrics || []).reduce(
          (acc, m) => acc + Number(m.value),
          0
        );
        setFootnote(total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [desde, hasta, desdeFormat, hastaFormat]);

  return (
    <div className="content">
      <div className="contenedor-principal2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ px: 2, pt: 2 }}>
            {/* Barra de filtros (calendarios) */}
            <Grid
              container
              spacing={2}
              sx={{ maxWidth: 1000, mx: "auto", mb: 2 }}
            >
              <Grid item xs={12} xl={4}></Grid>
              <Grid item xs={12} xl={2}>
                <DesktopDatePicker
                  label="Desde"
                  inputFormat="DD/MM/YYYY"
                  value={desde}
                  onChange={(val) => setDesde(val)}
                  renderInput={(params) => (
                    <TextField fullWidth {...params} size="small" />
                  )}
                />
              </Grid>
              <Grid item xs={12} xl={2}>
                <DesktopDatePicker
                  label="Hasta"
                  inputFormat="DD/MM/YYYY"
                  value={hasta}
                  minDate={desde || undefined}
                  onChange={(val) => setHasta(val)}
                  renderInput={(params) => (
                    <TextField fullWidth {...params} size="small" />
                  )}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Panel presentacional */}
          <AfapMetricsPanel
            title="Trámites PRESTACIONES"
            metrics={metrics}
            footnote={footnote}
            loading={loading}
            error={error}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
