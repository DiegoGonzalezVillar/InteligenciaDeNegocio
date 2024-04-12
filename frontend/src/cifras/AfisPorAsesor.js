import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@material-ui/core";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { URL } from "../comercial/Constantes";
import "../style/Principal.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles(() => ({
  tarjeta: {
    background: "#BE3A4A",
    margin: "20px 20px 20px 20px",
  },
  texto: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
}));

function AfisPorAsesor(props) {
  const classes = useStyles();
  const fecha = new Date();
  const añoActual = fecha.getFullYear();
  const añoAnterior = fecha.getFullYear() - 1;
  const [arrayAfisPorAsesor, setArrayAfisPorAsesor] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    total: null,
    totalActual: null,
    totalAnterior: null,
    porcentaje: null,
  });

  const afisAñoActual = async () => {
    const res = await fetch(`${URL}afisPorAsesor`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    setArrayAfisPorAsesor(data);
  };

  const totalAñoActual = async () => {
    try {
      const res = await fetch(`${URL}totalAfiliados`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const data = await res.json();
      return data[0].Cantidad;
    } catch (error) {
      console.error(error);
    }
  };
  const totalAñoAnterior = async () => {
    try {
      const res = await fetch(`${URL}totalAfiliadosAnterior`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const data = await res.json();
      return data[0].Cantidad;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      const total = await afisAñoActual("");
      const totalActual = await totalAñoActual("Actual");
      const totalAnterior = await totalAñoAnterior("Anterior");

      if (totalActual !== null && totalAnterior !== null) {
        const porcentaje = Math.round(
          ((totalActual - totalAnterior) / totalAnterior) * 100
        );
        setEstadisticas({ total, totalActual, totalAnterior, porcentaje });
      }
      afisAñoActual();
    };

    obtenerDatos();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Afiliaciones por asesor",
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value, context) => {
          return value;
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: arrayAfisPorAsesor
      .sort((a, b) => b.cantidad - a.cantidad) // ordenar el array por cantidad de mayor a menor
      .map((datos) => datos.asesor),
    datasets: [
      {
        label: "Cantidad",
        data: arrayAfisPorAsesor
          .sort((a, b) => b.cantidad - a.cantidad) // ordenar el array por cantidad de mayor a menor
          .map((datos) => datos.cantidad),
        backgroundColor: "#BE3A4A",
      },
    ],
  };

  return (
    <div className="content">
      <div className="contenedor-principal">
        <Grid container>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card className={classes.tarjeta}>
              <CardContent>
                <Typography className={classes.titulo}>
                  Total Afiliaciones año {añoActual}:
                </Typography>
                <Typography className={classes.texto}>
                  {estadisticas.totalActual}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card className={classes.tarjeta}>
              <CardContent>
                <Typography className={classes.titulo}>
                  Total Afiliaciones año {añoAnterior}:
                </Typography>
                <Typography className={classes.texto}>
                  {estadisticas.totalAnterior}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card className={classes.tarjeta}>
              <CardContent>
                <Typography className={classes.titulo}>
                  Diferencia en % Actual vs Anterior:
                </Typography>
                <Typography className={classes.texto}>
                  {estadisticas.porcentaje}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Bar options={options} data={data} plugins={[ChartDataLabels]} />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}></Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <TableContainer style={{ height: "100%", width: "80%" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: "15px" }}>Asesor</TableCell>
                    <TableCell style={{ fontSize: "15px" }}>Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrayAfisPorAsesor
                    .sort((a, b) => a.asesor.localeCompare(b.asesor))
                    .sort((a, b) => b.cantidad - a.cantidad)
                    .map((row) => (
                      <TableRow key={row.asesor}>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.asesor}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.cantidad}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AfisPorAsesor;
