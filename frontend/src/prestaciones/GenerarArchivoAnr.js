import React, { useState } from "react";
import Titulo from "../componentes/Titulo";
import { Button, Grid, Snackbar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { URL } from "../comercial/Constantes.js";

dayjs.extend(isSameOrBefore);

const GenerarArchivoAnr = () => {
  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "5px",
  };
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [valorFecha, setValorFecha] = useState(dayjs().startOf("day"));

  const generarArchivoAnr = () => {
    setLoading(true);
    const fechaFormateada = valorFecha.format("YYYY-MM-DD");
    fetch(`${URL}generarArchivoAnr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fecha: fechaFormateada }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Acá accedés al mensaje devuelto por el backend
        setOpenSnackbar(true);
        setResponseMessage(data.mensaje);
        setLoading(false);
      })
      .catch((error) => {
        setOpenSnackbar(true);
        setResponseMessage(error);
        setLoading(false);
      });
  };

  return (
    <div className="contenedor-principal2">
      <Titulo style={estilosTitulo} title="Generar archivo Anr" />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ height: "300px" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Seleccionar fecha"
            inputFormat="DD/MM/YYYY"
            value={valorFecha}
            onChange={(newValue) => setValorFecha(newValue)}
            renderInput={(params) => (
              <TextField {...params} sx={{ mt: 2, width: 250 }} />
            )}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          style={{
            backgroundColor: "#BE3A4A",
            color: "white",
            marginTop: "40px",
            width: 200,
          }}
          onClick={generarArchivoAnr}
        >
          Generar Archivo
        </Button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "3em",
          }}
        >
          {loading && (
            <>
              <p>Cargando...</p>
            </>
          )}
        </div>
        <Snackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message={responseMessage}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          ContentProps={{
            style: {
              backgroundColor: "green",
              color: "white",
            },
          }}
          style={{ bottom: "200px" }}
        />
      </Grid>
    </div>
  );
};

export default GenerarArchivoAnr;
