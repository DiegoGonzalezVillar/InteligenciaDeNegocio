import React, { useState, useEffect } from "react";
import { URL } from "./Constantes.js";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Grid,
  Typography,
  Card,
} from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import Titulo from "../componentes/Titulo";

const useStyles = makeStyles({
  table: {
    minWidth: 750,
    maxWidth: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  container: {
    maxHeight: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  tarjeta: {
    background: "#BE3A4A",
    margin: "20px 20px 20px 20px",
  },
  texto: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
});

const DatosApp = () => {
  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px", // Por ejemplo, aquí se define el margen superior
    // Puedes agregar más propiedades de estilo según sea necesario
  };
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  const [orderBy, setOrderBy] = useState("Cantidad");
  const [order, setOrder] = useState("desc");
  const [departamentoSeleccionado, setDepartamentoSeleccionado] =
    useState(null);
  const [orderByCiudades, setOrderByCiudades] = React.useState("Cantidad");
  const [orderCiudades, setOrderCiudades] = React.useState("desc");
  const [informacionDisponible, setinformacionDisponible] = useState([]);
  const [totalCargadosApp, setTotalCargadosApp] = useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    infoD(orderBy, order);
  };

  const handleRequestSortCiudades = (event, property) => {
    const isAsc = orderByCiudades === property && orderCiudades === "asc";
    setOrderByCiudades(property);
    setOrderCiudades(isAsc ? "desc" : "asc");
  };

  const infoD = async () => {
    const res = await fetch(`${URL}getDatosAppPorCantidad`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    setinformacionDisponible(data);
  };
  useEffect(() => {
    infoD();
  }, []);

  console.log(informacionDisponible);

  const resultadoTotalCargadosApp = () => {
    const totalDatosApp = informacionDisponible.reduce(
      (total, item) => total + item.Cantidad,
      0
    );
    setTotalCargadosApp(totalDatosApp);
  };

  useEffect(() => {
    resultadoTotalCargadosApp();
  });

  // Obtenemos la lista de departamentos únicos para crear las opciones del filtro
  let departamentosUnicos = [];
  if (!informacionDisponible) {
    return (
      <div>
        <nav
          className="navbar d-flex justify-content-center"
          style={{ marginTop: "100px" }}
        >
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress style={{ color: "#B83E42" }} />
          </div>
        </nav>
      </div>
    );
  } else {
    departamentosUnicos = [
      ...new Set(informacionDisponible.map((item) => item.Departamento)),
    ];
  }

  return (
    <div className="contenedor-principal2">
      <Titulo style={estilosTitulo} title="DATOS APP" />
      <Grid container style={{ marginTop: "20px" }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Card className={classes.tarjeta}>
            <Typography className={classes.texto}>
              Total de datos cargados
            </Typography>
            <Typography className={classes.texto}>
              {totalCargadosApp}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={7}>
          <TableContainer
            component={Paper}
            style={{ overflowX: "auto", marginTop: "20px" }}
          >
            <Table className={classes.table} aria-label="data grid">
              <TableHead style={{ backgroundColor: "#BE3A4A" }}>
                <TableRow>
                  <TableCell align="center" style={{ color: "white" }}>
                    Departamento
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "white" }}
                    sortDirection={orderBy === "Cantidad" ? order : false}
                  >
                    <TableSortLabel
                      align="center"
                      style={{ color: "white" }}
                      active={orderBy === "Cantidad"}
                      direction={orderBy === "Cantidad" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "Cantidad")}
                    >
                      Cantidad Total
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Ciudades
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departamentosUnicos
                  .sort((a, b) => {
                    const isAsc = order === "asc";
                    const aCantidad = informacionDisponible
                      .filter((item) => item.Departamento === a)
                      .reduce((total, item) => total + item.Cantidad, 0);
                    const bCantidad = informacionDisponible
                      .filter((item) => item.Departamento === b)
                      .reduce((total, item) => total + item.Cantidad, 0);
                    return isAsc
                      ? aCantidad - bCantidad
                      : bCantidad - aCantidad;
                  })
                  .map((departamento) => {
                    const informacionPorDepartamento =
                      informacionDisponible.filter(
                        (item) => item.Departamento === departamento
                      );
                    const cantidadTotal = informacionPorDepartamento.reduce(
                      (total, item) => total + item.Cantidad,
                      0
                    );
                    return (
                      <React.Fragment key={departamento}>
                        <TableRow>
                          <TableCell align="center">{departamento}</TableCell>
                          <TableCell align="center">{cantidadTotal}</TableCell>
                          <TableCell align="center">
                            <Button
                              style={{
                                color: "#BE3A4A",
                              }}
                              onClick={() => {
                                if (departamentoSeleccionado === departamento) {
                                  setDepartamentoSeleccionado(null);
                                } else {
                                  setDepartamentoSeleccionado(departamento);
                                }
                              }}
                            >
                              {departamentoSeleccionado === departamento
                                ? "Cerrar Ciudades"
                                : "Ver Ciudades"}
                            </Button>
                          </TableCell>
                        </TableRow>
                        {departamentoSeleccionado === departamento && (
                          <TableRow>
                            <TableCell colSpan={3}>
                              <TableContainer
                                component={Paper}
                                style={{ marginTop: "1em" }}
                              >
                                <Table
                                  className={classes.table}
                                  aria-label="ciudades"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Ciudad</TableCell>
                                      <TableCell
                                        sortDirection={
                                          orderByCiudades === "Cantidad"
                                            ? orderCiudades
                                            : false
                                        }
                                      >
                                        <TableSortLabel
                                          active={
                                            orderByCiudades === "Cantidad"
                                          }
                                          direction={
                                            orderByCiudades === "Cantidad"
                                              ? orderCiudades
                                              : "asc"
                                          }
                                          onClick={() =>
                                            handleRequestSortCiudades(
                                              "Cantidad"
                                            )
                                          }
                                        >
                                          Cantidad
                                        </TableSortLabel>
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {informacionPorDepartamento
                                      .sort((a, b) => {
                                        const isAsc = orderCiudades === "asc";
                                        const aCantidad = a.Cantidad;
                                        const bCantidad = b.Cantidad;
                                        return isAsc
                                          ? aCantidad - bCantidad
                                          : bCantidad - aCantidad;
                                      })
                                      .map((item) => (
                                        <TableRow key={item.Ciudad}>
                                          <TableCell component="th" scope="row">
                                            {item.Ciudad}
                                          </TableCell>
                                          <TableCell>{item.Cantidad}</TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })
                  .sort((a, b) => {
                    const isAsc = order === "asc";
                    const aCantidad = a.props.children[1]?.props?.children;
                    const bCantidad = b.props.children[1]?.props?.children;
                    if (isAsc) {
                      return aCantidad - bCantidad;
                    } else {
                      return bCantidad - aCantidad;
                    }
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};
export default DatosApp;
