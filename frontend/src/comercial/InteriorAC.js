import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TextField from "@material-ui/core/TextField";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import { Container } from "@mui/material";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useNavigate } from "react-router-dom";
import TextField2 from "@mui/material/TextField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "../style/Button.css";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { Typography } from "@material-ui/core";
import { URL } from "./Constantes.js";
import Titulo from "../componentes/Titulo";

dayjs.extend(isSameOrBefore);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  container: {
    maxHeight: 440,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});

export default function InteriorAC() {
  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px", // Por ejemplo, aquí se define el margen superior
    // Puedes agregar más propiedades de estilo según sea necesario
  };
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  const [arrayDatosConsultas, setArrayDatosConsultas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const [filterCiudad, setFilterCiudad] = useState("");
  const [value, setValue] = useState(dayjs().startOf("day"));
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [filterCount, setFilterCount] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filtroCantidad = (event) => {
    setFilterCount(event.target.value);
    let filtered = arrayDatosConsultas;
    if (filter !== "") {
      filtered = filtered.filter((item) => {
        return item.Departamento.toLowerCase().includes(filter.toLowerCase());
      });
    }

    if (filterCiudad !== "") {
      filtered = filtered.filter((item) => {
        return item.Ciudad.toLowerCase().includes(filterCiudad.toLowerCase());
      });
    }

    if (value) {
      filtered = filtered.filter((item) => {
        const date = dayjs(item.Fecha_Consulta, "DD/MM/YYYY");
        return date.isBefore(value.$d) || date.isSame(value.$d);
      });
    }

    if (filterCount) {
      filtered = filtered.slice(0, filterCount);
    } else {
      filtered = filtered.slice(0, filtered.length);
    }

    setFilteredData(filtered);
  };
  useEffect(() => {
    let filtered = arrayDatosConsultas;
    if (filter !== "") {
      filtered = filtered.filter((item) => {
        return item.Departamento.toLowerCase().includes(filter.toLowerCase());
      });
    }

    if (filterCiudad !== "") {
      filtered = filtered.filter((item) => {
        return item.Ciudad.toLowerCase().includes(filterCiudad.toLowerCase());
      });
    }

    if (value) {
      filtered = filtered.filter((item) => {
        const date = dayjs(item.Fecha_Consulta, "DD/MM/YYYY");
        return date.isBefore(value.$d) || date.isSame(value.$d);
      });
    }

    if (filterCount) {
      filtered = filtered.slice(0, filterCount);
    } else {
      filtered = filtered.slice(0, filtered.length);
    }
    setFilteredData(filtered);
  }, [filterCount, filter, filterCiudad, value, arrayDatosConsultas]);

  const filtroDepartamento = (event) => {
    setFilter(event.target.value);
    let filtered = arrayDatosConsultas;

    if (filter !== "") {
      filtered = filtered.filter((item) => {
        return item.Departamento.toLowerCase().includes(filter.toLowerCase());
      });
    }

    if (filterCiudad !== "") {
      filtered = filtered.filter((item) => {
        return item.Ciudad.toLowerCase().includes(filterCiudad.toLowerCase());
      });
    }

    if (value) {
      filtered = filtered.filter((item) => {
        const date = dayjs(item.Fecha_Consulta, "DD/MM/YYYY");
        return date.isBefore(value.$d) || date.isSame(value.$d);
      });
    }

    setFilteredData(filtered);
  };

  const filtroCiudad = (event) => {
    setFilterCiudad(event.target.value);
    let filtered = arrayDatosConsultas;

    if (filter !== "") {
      filtered = filtered.filter((item) => {
        return item.Departamento.toLowerCase().includes(filter.toLowerCase());
      });
    }

    if (filterCiudad !== "") {
      filtered = filtered.filter((item) => {
        return item.Ciudad.toLowerCase().includes(filterCiudad.toLowerCase());
      });
    }

    if (value) {
      filtered = filtered.filter((item) => {
        const date = dayjs(item.Fecha_Consulta, "DD/MM/YYYY");
        return date.isBefore(value.$d) || date.isSame(value.$d);
      });
    }

    setFilteredData(filtered);
  };

  const filtroFecha = (newValue) => {
    setValue(newValue);
    let filtered = arrayDatosConsultas;

    if (filter !== "") {
      filtered = filtered.filter((item) => {
        return item.Departamento.toLowerCase().includes(filter.toLowerCase());
      });
    }

    if (filterCiudad !== "") {
      filtered = filtered.filter((item) => {
        return item.Ciudad.toLowerCase().includes(filterCiudad.toLowerCase());
      });
    }

    if (newValue) {
      filtered = filtered.filter((item) => {
        const date = dayjs(item.Fecha_Consulta, "DD/MM/YYYY");
        return date.isBefore(newValue.$d) || date.isSame(newValue.$d);
      });
    }
    setFilteredData(filtered);
  };

  const fetchData = async () => {
    const res = await fetch(`${URL}interiorAC`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();

    data.forEach((item) => {
      item.Fecha_Consulta = new Date(item.Fecha_Consulta).toLocaleDateString(
        "es-ES",
        { day: "2-digit", month: "2-digit", year: "numeric" }
      );
    });

    setArrayDatosConsultas(data);
    setFilteredData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cargarDatos = async () => {
    try {
      const datos = filteredData.map((item) => {
        return {
          cedula: item.cedula,
          fechaN: item.fechaN,
        };
      });
      const response = await fetch(`${URL}ultimaConsulta/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });
      const json = await response.json();
      setResponseMessage(json.message);
      setOpenSnackbar(true);
      handleClose();
      fetchData();
    } catch (error) {
      console.error(error);
      setResponseMessage("Ha ocurrido un error, por favor intente nuevamente");
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="content">
      <Container>
        <Titulo style={estilosTitulo} title="Interior A-C" />
        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Filtro por Departamento"
            onChange={filtroDepartamento}
            value={filter}
            style={{ marginRight: "1rem" }}
          />
          <TextField
            label="Filtro por Ciudad"
            onChange={filtroCiudad}
            value={filterCiudad}
            style={{ marginRight: "1rem" }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Seleccionar fecha"
              inputFormat="DD/MM/YYYY"
              value={value}
              onChange={filtroFecha}
              renderInput={(params) => (
                <TextField2 {...params} style={{ marginTop: "10px" }} />
              )}
            />
          </LocalizationProvider>
          <TextField
            label="Cantidad de datos"
            value={filterCount}
            onChange={filtroCantidad}
            style={{ marginLeft: "1rem" }}
          />

          <Button
            style={{ color: "#BE3A4A", marginTop: "1em", marginLeft: "10rem" }}
            onClick={handleClickOpen}
          >
            Consultar
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirmar</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro de querer cargar los datos?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={cargarDatos} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message={responseMessage}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <TableContainer
          className={classes.container}
          component={Paper}
          style={{ overflowX: "auto", marginTop: "1em" }}
        >
          <Table className={classes.table} aria-label="data grid">
            <TableHead>
              <TableRow>
                <TableCell>Cedula</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>Ultima Consulta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(0, 10).map((row) => (
                <TableRow key={row.cedula}>
                  <TableCell component="th" scope="row">
                    {row.cedula}
                  </TableCell>
                  <TableCell>{row.fechaN}</TableCell>
                  <TableCell>{row.Departamento}</TableCell>
                  <TableCell>{row.Ciudad}</TableCell>
                  <TableCell>{row.Fecha_Consulta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h6" style={{ color: "#BE3A4A" }}>
          Cantidad de registros: {filteredData.length}
        </Typography>
      </Container>
    </div>
  );
}
