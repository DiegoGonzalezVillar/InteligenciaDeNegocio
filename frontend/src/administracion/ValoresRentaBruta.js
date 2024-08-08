import React, { useState } from "react";
import { URL } from "../../src/comercial/Constantes";
import Titulo from "../componentes/Titulo";
import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField2 from "@mui/material/TextField";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import Snackbar from "@material-ui/core/Snackbar";

const ValoresRentaBruta = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px",
  };

  const [fechaInicial, setFechaInicial] = useState(dayjs().startOf("month"));
  const [fechaFinal, setFechaFinal] = useState(dayjs().startOf("day"));

  const filtroFecha = (fecha, campo) => {
    if (campo === "inicio") {
      setFechaInicial(fecha);
    } else if (campo === "fin") {
      setFechaFinal(fecha);
    }
  };

  const ejecutarValoresRentaBruta = async () => {
    const formData = {
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal,
    };
    if (fechaInicial > fechaFinal) {
      setResponseMessage(
        "La fecha inicial no puede ser mayor a la fecha final"
      );
      setOpenSnackbar(true);
    } else {
      fetch(`${URL}valoresRentaBruta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          try {
            setOpenSnackbar(true);
            setResponseMessage(data.message);
          } catch (error) {
            setResponseMessage("Error al ejecutar el archivo .bat");
          }
        })
        .catch((error) => {
          setOpenSnackbar(true);
          setResponseMessage(error);
        });
    }
  };

  return (
    <div className="content">
      <div className="contenedor-principal">
        <Titulo style={estilosTitulo} title="Valores de Renta Bruta" />
        <Grid container style={{ marginTop: "1%" }}>
          <Grid item xs={5} style={{ marginTop: "1.5%" }}></Grid>
          <Grid item xs={2} style={{ marginTop: "2.5%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <h4 style={{ color: "#E28432" }}>Período</h4>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Fecha Inicial"
                  inputFormat="DD/MM/YYYY"
                  value={fechaInicial}
                  onChange={(date) => filtroFecha(date, "inicio")}
                  renderInput={(params) => (
                    <TextField2 {...params} style={{ marginTop: "25px" }} />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Fecha Final"
                  inputFormat="DD/MM/YYYY"
                  value={fechaFinal}
                  onChange={(date) => filtroFecha(date, "fin")}
                  renderInput={(params) => (
                    <TextField2 {...params} style={{ marginTop: "10px" }} />
                  )}
                />
              </LocalizationProvider>
            </div>
            <Button
              style={{
                backgroundColor: "#E28432",
                color: "#FFFFFF",
                marginTop: "20%",
                width: "100%",
              }}
              onClick={ejecutarValoresRentaBruta}
            >
              Consultar
            </Button>
          </Grid>
          <Snackbar
            open={openSnackbar}
            onClose={() => setOpenSnackbar(false)}
            message={responseMessage}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Grid>
      </div>
    </div>
  );
};

export default ValoresRentaBruta;
