import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { URL } from "./Constantes.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import Titulo from "../componentes/Titulo.js";

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
});

function InfoDisponible(props) {
  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px",
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
  const [orderByCiudades, setOrderByCiudades] = useState("Cantidad");
  const [orderCiudades, setOrderCiudades] = useState("desc");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    infoD(orderBy, order);
  };

  const handleRequestSortCiudades = (property) => {
    const isAsc = orderByCiudades === property && orderCiudades === "asc";
    setOrderByCiudades(property);
    setOrderCiudades(isAsc ? "desc" : "asc");
  };

  const infoD = async () => {
    const res = await fetch(`${URL}getInfoDisponible`, {
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
  });

  const [informacionDisponible, setinformacionDisponible] = useState();

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
      <Container>
        <Titulo style={estilosTitulo} title="Informacion Disponible" />
        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></Box>
        {/* Creamos la tabla */}
        <TableContainer
          className={classes.container}
          component={Paper}
          style={{ overflowX: "auto", marginTop: "1em" }}
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
                  return isAsc ? aCantidad - bCantidad : bCantidad - aCantidad;
                })
                .map((departamento) => {
                  console.log(departamento);
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
                            style={{ color: "#BE3A4A", marginRight: "10px" }}
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
                                <TableHead
                                  style={{ backgroundColor: "#BE3A4A" }}
                                >
                                  <TableRow>
                                    <TableCell
                                      align="center"
                                      style={{ color: "white" }}
                                    >
                                      Ciudad
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{ color: "white" }}
                                      sortDirection={
                                        orderByCiudades === "Cantidad"
                                          ? orderCiudades
                                          : false
                                      }
                                    >
                                      <TableSortLabel
                                        align="center"
                                        style={{ color: "white" }}
                                        active={orderByCiudades === "Cantidad"}
                                        direction={
                                          orderByCiudades === "Cantidad"
                                            ? orderCiudades
                                            : "asc"
                                        }
                                        onClick={() =>
                                          handleRequestSortCiudades("Cantidad")
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
                                        <TableCell
                                          component="th"
                                          scope="row"
                                          align="center"
                                        >
                                          {item.Ciudad}
                                        </TableCell>
                                        <TableCell align="center">
                                          {item.Cantidad}
                                        </TableCell>
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
      </Container>
    </div>
  );
}
export default InfoDisponible;
