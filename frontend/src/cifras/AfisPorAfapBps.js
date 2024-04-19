import React, { useEffect, useState } from "react";
import { URL } from "../comercial/Constantes.js";
import TextField2 from "@mui/material/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import { Grid } from "@mui/material";
import { Typography } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Titulo from "../componentes/Titulo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
  texto: {
    fontSize: 20,
    color: "#BE3A4A",
    textAlign: "center",
  },
  modalDialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const AfisPorAfapBps = () => {
  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px", // Por ejemplo, aquí se define el margen superior
    // Puedes agregar más propiedades de estilo según sea necesario
  };
  const classes = useStyles();
  const [arrayAfiliacionesPorAfap, searrayAfiliacionesPorAfap] = useState([]);
  const [arrayAfiliacionesDiarias, setarrayAfiliacionesDiarias] = useState([]);
  const [fechaInicial, setFechaInicial] = useState(
    dayjs().subtract(1, "month").startOf("month")
  );
  const [fechaFinal, setFechaFinal] = useState(dayjs().startOf("day"));

  const afiliacionesPorAfap = async () => {
    const res = await fetch(`${URL}afisPorAfap`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    searrayAfiliacionesPorAfap(data);
  };

  const afiliacionesDiariasPorAfap = async () => {
    const res = await fetch(`${URL}afisUltimoDiaPorAfap`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    setarrayAfiliacionesDiarias(data);
  };

  useEffect(() => {
    afiliacionesPorAfap();
    afiliacionesDiariasPorAfap();
  }, []);

  const total = arrayAfiliacionesDiarias.reduce(
    (acumulador, elemento) => {
      acumulador.totalAfilaciones += elemento.totalAfilaciones;
      acumulador.totalCantidadAsesores += elemento.cantidadAsesores;
      return acumulador;
    },
    { totalAfilaciones: 0, totalCantidadAsesores: 0 }
  );

  const datosConPorcentaje = arrayAfiliacionesDiarias.map((elemento) => {
    return {
      ...elemento,
      Porcentaje_Afiliaciones: (
        (elemento.totalAfilaciones / total.totalAfilaciones) *
        100
      ).toFixed(1),
      Porcentaje_Total_Asesores: (
        (elemento.cantidadAsesores / total.totalCantidadAsesores) *
        100
      ).toFixed(1),
      Promedio_Afiliaciones_Asesor: (
        elemento.totalAfilaciones / elemento.cantidadAsesores
      ).toFixed(1),
    };
  });

  const totalPorcentajeTotalAfilaciones = datosConPorcentaje.reduce(
    (acumulador, elemento) =>
      acumulador + parseFloat(elemento.Porcentaje_Afiliaciones),
    0
  );
  const totalPorcentajeTotalAsesores = datosConPorcentaje.reduce(
    (acumulador, elemento) =>
      acumulador + parseFloat(elemento.Porcentaje_Total_Asesores),
    0
  );

  const totalPromedioAfiliacionesAsesor =
    datosConPorcentaje.reduce(
      (acumulador, elemento) =>
        acumulador + parseFloat(elemento.Promedio_Afiliaciones_Asesor),
      0
    ) / datosConPorcentaje.length;

  const nuevaFilaTotal = {
    nombre: "Total",
    totalAfilaciones: total.totalAfilaciones,
    cantidadAsesores: total.totalCantidadAsesores,
    Porcentaje_Afiliaciones: totalPorcentajeTotalAfilaciones,
    Porcentaje_Total_Asesores: totalPorcentajeTotalAsesores,
    Promedio_Afiliaciones_Asesor: totalPromedioAfiliacionesAsesor.toFixed(1),
  };

  const datosConTotal = [...datosConPorcentaje, nuevaFilaTotal];

  const filtroFecha = (fecha, campo) => {
    if (campo === "inicio") {
      setFechaInicial(fecha);
    } else if (campo === "fin") {
      setFechaFinal(fecha);
    }
  };

  const acumuladoPorNombre = arrayAfiliacionesPorAfap
    .filter((elemento) => {
      if (!fechaInicial || !fechaFinal) {
        return true; // No hay fechas seleccionadas, no se aplica filtro
      }
      const fecha = dayjs(elemento.fecha, "DD/MM/YYYY");
      return fecha >= fechaInicial && fecha <= fechaFinal;
    })
    .reduce((acumulador, elemento) => {
      if (!acumulador[elemento.nombre]) {
        acumulador[elemento.nombre] = 0;
      }
      acumulador[elemento.nombre] += elemento.totalAfilaciones;
      return acumulador;
    }, {});

  const cantidadTotal = Object.values(acumuladoPorNombre).reduce(
    (total, valor) => total + valor,
    0
  );

  const nuevoArray = Object.entries(acumuladoPorNombre).map(
    ([nombre, totalAfilaciones]) => {
      const porcentaje = (totalAfilaciones / cantidadTotal) * 100;
      return {
        nombre,
        totalAfilaciones,
        porcentaje: porcentaje.toFixed(2), // Redondear el porcentaje a 2 decimales
      };
    }
  );

  const filaTotal = {
    nombre: "Total",
    totalAfilaciones: cantidadTotal,
    porcentaje: "100.00", // El porcentaje total siempre será 100%
  };
  nuevoArray.push(filaTotal);

  //GRAFICO
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Afiliaciones por AFAP",
        align: "center",
      },
      datalabels: {
        anchor: "end",
        align: "bottom",
        color: "white",
        formatter: (value) => {
          return value;
        },
      },
    },
    scales: {
      x: {
        ticks: {
          align: "center",
          padding: 5,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const datosParaGrafico = nuevoArray.slice(0, nuevoArray.length - 1);

  const data = {
    labels: datosParaGrafico.map((datos) => datos.nombre),
    datasets: [
      {
        label: "Total Afiliaciones",
        data: datosParaGrafico.map((datos) => datos.totalAfilaciones),
        backgroundColor: "#E28432",
      },
    ],
  };
  ///////////////////////

  return (
    <div className="content">
      <div className="contenedor-principal">
        <Titulo style={estilosTitulo} title="Ingresos por Afap" />
        <Grid container style={{ marginTop: "1%" }}>
          <Grid item xs={3}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4 style={{ color: "#B83E42", marginTop: "20%" }}>
                Ingresos al cierre del día
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography className={classes.texto}>
                {datosConTotal[0].fecha}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8}>
            <TableContainer
              className={classes.container}
              component={Paper}
              style={{ overflowX: "auto", marginTop: "1em", width: "auto" }}
            >
              <Table className={classes.table} aria-label="data grid">
                <TableHead style={{ backgroundColor: "#BE3A4A" }}>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ color: "white", width: 140 }}
                    >
                      AFAP
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", width: 140 }}
                    >
                      Afiliaciones
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", width: 140 }}
                    >
                      %
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", width: 140 }}
                    >
                      Cantidad Asesores
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", width: 140 }}
                    >
                      % Asesores
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", width: 140 }}
                    >
                      Promedio Afi/Asesor
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosConTotal.map((row) => (
                    <TableRow key={row.nombre}>
                      <TableCell align="center" component="th" scope="row">
                        {row.nombre}
                      </TableCell>
                      <TableCell align="center">
                        {row.totalAfilaciones}
                      </TableCell>
                      <TableCell align="center">
                        {row.Porcentaje_Afiliaciones}
                      </TableCell>
                      <TableCell align="center">
                        {row.cantidadAsesores}
                      </TableCell>
                      <TableCell align="center">
                        {row.Porcentaje_Total_Asesores}
                      </TableCell>
                      <TableCell align="center">
                        {row.Promedio_Afiliaciones_Asesor}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={3} style={{ marginTop: "1.5%" }}>
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
          </Grid>
          <Grid item xs={4} style={{ marginTop: "1%" }}>
            <TableContainer
              className={classes.container}
              component={Paper}
              style={{ marginTop: "1em", overflowX: "hidden" }}
            >
              <Table className={classes.table} aria-label="data grid">
                <TableHead style={{ backgroundColor: "#E28432" }}>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ color: "white", width: 140 }}
                    >
                      AFAP
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", width: 140 }}
                    >
                      Afiliaciones
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: "white", width: 140 }}
                    >
                      %
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nuevoArray.map((row) => (
                    <TableRow key={row.nombre}>
                      <TableCell align="center" component="th" scope="row">
                        {row.nombre}
                      </TableCell>
                      <TableCell align="center">
                        {row.totalAfilaciones}
                      </TableCell>
                      <TableCell align="center">{row.porcentaje}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={4} style={{ marginTop: "70px", marginLeft: "20px" }}>
            <Bar options={options} data={data} plugins={[ChartDataLabels]} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AfisPorAfapBps;
