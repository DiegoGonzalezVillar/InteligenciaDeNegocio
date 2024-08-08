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
import "../style/Button.css";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Modal } from "react-bootstrap";
//import "../style/TablaModal.css";
import { URL } from "./Constantes.js";
import Titulo from "../componentes/Titulo";
//import { useRef } from "react";

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
  modalDialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function ConsulasApp() {
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
  const [show, setShow] = useState(false);
  const [arrayDatosConsultas, setArrayDatosConsultas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const classes = useStyles();
  const [filterDepartamento, setFilterDepartamento] = useState("");
  const [filterCiudad, setFilterCiudad] = useState("");
  const [filterUltimaAccion, setFilterUltimaAccion] = useState("");
  const [filterCodigoPostal, setFilterCodigoPostal] = useState("");
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [
    arrayPendientesConsultasComercial,
    setArrayPendientesConsultasComercial,
  ] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cerrarModal = () => setShow(false);

  useEffect(() => {
    let filtered = arrayDatosConsultas;
    if (
      filterDepartamento === "" &&
      filterCiudad === "" &&
      filterUltimaAccion === "" &&
      filterCodigoPostal === ""
    ) {
      setFilteredData(arrayDatosConsultas);
      return;
    }
    if (filterDepartamento !== "") {
      filtered = filtered.filter((item) => {
        return item.departamento
          .toLowerCase()
          .includes(filterDepartamento.toLowerCase());
      });
    }

    if (filterCiudad !== "") {
      console.log(filterCiudad);
      filtered = filtered.filter((item) => {
        return item.ciudad.toLowerCase().includes(filterCiudad.toLowerCase());
      });
    }

    if (filterUltimaAccion !== "") {
      filtered = filtered.filter((item) => {
        return item.respuesta
          .toLowerCase()
          .includes(filterUltimaAccion.toLowerCase());
      });
    }

    if (filterCodigoPostal !== "") {
      filtered = filtered.filter((item) => {
        return item.codigoPostal === parseInt(filterCodigoPostal, 10);
      });
    }
    setFilteredData(filtered);
  }, [
    filterUltimaAccion,
    filterDepartamento,
    filterCiudad,
    filterCodigoPostal,
    arrayDatosConsultas,
  ]);

  const fetchData = async () => {
    const res = await fetch(`${URL}datosApp`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
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
      setResponseMessage(error);
      setOpenSnackbar(true);
    }
  };

  const pendientesConsultasComercial = async () => {
    setShow(true);
    const res = await fetch(`${URL}getPendientesConsultasComercial`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    setArrayPendientesConsultasComercial(data);
  };

  const arrayOrdenado = [...arrayPendientesConsultasComercial];

  arrayOrdenado.sort((a, b) => {
    // Primero ordenar por Departamento
    if (a.Departamento < b.Departamento) return -1;
    if (a.Departamento > b.Departamento) return 1;

    // Si los Departamentos son iguales, ordenar por Cantidad
    return b.Cantidad - a.Cantidad;
  });

  const sumaTotal = arrayPendientesConsultasComercial.reduce(
    (total, row) => total + row.Cantidad,
    0
  );

  return (
    <div className="contenedor-principal2">
      <Container>
        <Titulo style={estilosTitulo} title="Consultas APP" />
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
            onChange={(e) => setFilterDepartamento(e.target.value)}
            // onChange={setFilterDepartamento(e.target.value);}
            value={filterDepartamento}
            style={{ marginRight: "1rem" }}
          />
          <TextField
            label="Filtro por Ciudad"
            onChange={(e) => setFilterCiudad(e.target.value)}
            value={filterCiudad}
            style={{ marginRight: "1rem" }}
          />
          <TextField
            label="Filtro por Ultima Accion"
            onChange={(e) => setFilterUltimaAccion(e.target.value)}
            value={filterUltimaAccion}
            style={{ marginRight: "1rem" }}
          />

          <TextField
            label="Filtro CP"
            onChange={(e) => setFilterCodigoPostal(e.target.value)}
            value={filterCodigoPostal}
            style={{ marginRight: "1rem" }}
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
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
        <TableContainer
          className={classes.container}
          component={Paper}
          style={{ overflowX: "auto", marginTop: "1em", width: "auto" }}
        >
          <Table className={classes.table} aria-label="data grid">
            <TableHead style={{ backgroundColor: "#BE3A4A" }}>
              <TableRow>
                <TableCell style={{ color: "white", width: 140 }}>
                  Cedula
                </TableCell>
                <TableCell style={{ color: "white", width: 140 }}>
                  Fecha
                </TableCell>
                <TableCell style={{ color: "white", width: 140 }}>
                  Departamento
                </TableCell>
                <TableCell style={{ color: "white", width: 140 }}>
                  Ciudad
                </TableCell>
                <TableCell style={{ color: "white", width: 140 }}>
                  Ultima Accion
                </TableCell>
                <TableCell style={{ color: "white", width: 140 }}>
                  Codigo Postal
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.cedula}>
                  <TableCell component="th" scope="row">
                    {row.cedula}
                  </TableCell>
                  <TableCell>{row.fechaN}</TableCell>
                  <TableCell>{row.departamento}</TableCell>
                  <TableCell>{row.ciudad}</TableCell>
                  <TableCell>{row.respuesta}</TableCell>
                  <TableCell>{row.codigoPostal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" style={{ color: "#BE3A4A" }}>
            Cantidad de registros: {filteredData.length}
          </Typography>
          <Button
            style={{ color: "#BE3A4A" }}
            onClick={pendientesConsultasComercial}
          >
            Ver datos pendientes
          </Button>
        </div>

        <Modal
          style={{ marginTop: "80px" }}
          dialogClassName="modal-dialog"
          animation={false}
          show={show}
          onHide={cerrarModal}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#BE3A4A" }}>
              Datos pendientes de consulta
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TableContainer
              className={classes.container}
              component={Paper}
              style={{ overflowX: "auto", marginTop: "1em" }}
            >
              <Table className={classes.table} aria-label="data grid">
                <TableHead>
                  <TableRow>
                    <TableCell>Departamento</TableCell>
                    <TableCell>Ciudad</TableCell>
                    <TableCell>Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrayOrdenado.map((row) => (
                    <TableRow key={row.Ciudad}>
                      <TableCell>{row.Departamento}</TableCell>
                      <TableCell>{row.Ciudad}</TableCell>
                      <TableCell>{row.Cantidad}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Modal.Body>
          <Modal.Footer
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h6" style={{ color: "#BE3A4A" }}>
              Total: {sumaTotal} pendientes
            </Typography>
            <Button onClick={cerrarModal} style={{ color: "#BE3A4A" }}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
