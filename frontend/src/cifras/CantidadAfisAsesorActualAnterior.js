import React, { useState, useEffect } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Grid } from "@material-ui/core";
import { URL } from "../comercial/Constantes.js";
import "../style/AsesorActualAnterior.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Titulo from "../componentes/Titulo.js";

ChartJS.register(Title, Tooltip, Legend);

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

function CantidadAfisAsesorActualAnterior(props) {
  const classes = useStyles();
  const fecha = new Date();
  const añoActual = fecha.getFullYear();
  const añoAnterior = fecha.getFullYear() - 1;
  const [arrayAfiliacionesPorAsesor, setarrayAfiliacionesPorAsesor] = useState(
    []
  );

  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px", // Por ejemplo, aquí se define el margen superior
    // Puedes agregar más propiedades de estilo según sea necesario
  };

  const afiliacionesPorAsesor = async () => {
    const res = await fetch(`${URL}getCantAfiliadosPorAsesorActualAnterior`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    setarrayAfiliacionesPorAsesor(data);
  };

  useEffect(() => {
    afiliacionesPorAsesor();
  }, []);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Afiliaciones Año actual vs Año anterior",
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value) => {
          return value;
        },
      },
    },
    scales: {
      x: {
        ticks: {
          align: "end",
          position: "end",
          padding: 5,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const asesorUnico = [
    ...new Set(arrayAfiliacionesPorAsesor.map((dato) => dato.asesor)),
  ];

  const dataByAsesor = asesorUnico.map((asesor) => {
    const cantidades = arrayAfiliacionesPorAsesor.filter(
      (datos) => datos.asesor === asesor
    );
    return {
      asesor,
      cantidadAnterior:
        cantidades.find((datos) => datos.año === new Date().getFullYear() - 1)
          ?.cantidad || 0,
      cantidadActual:
        cantidades.find((datos) => datos.año === new Date().getFullYear())
          ?.cantidad || 0,
    };
  });

  const totalCantidadAnterior = dataByAsesor.reduce(
    (total, item) => total + item.cantidadAnterior,
    0
  );
  const totalCantidadActual = dataByAsesor.reduce(
    (total, item) => total + item.cantidadActual,
    0
  );

  const porcentaje = Math.round(
    ((totalCantidadActual - totalCantidadAnterior) / totalCantidadAnterior) *
      100
  );

  const data = {
    labels: dataByAsesor
      .sort((a, b) => b.cantidadActual - a.cantidadActual)
      .map((datos) => datos.asesor),
    datasets: [
      {
        label: `${new Date().getFullYear() - 1}`,
        data: dataByAsesor
          .sort((a, b) => b.cantidadAnterior - a.cantidadAnterior)
          .map((datos) => datos.cantidadAnterior),
        backgroundColor: "#BE3A4A",
      },
      {
        label: `${new Date().getFullYear()}`,
        data: dataByAsesor
          .sort((a, b) => b.cantidadActual - a.cantidadActual)
          .map((datos) => datos.cantidadActual),
        backgroundColor: "#E28432",
      },
    ],
  };
  return (
    <div className="content">
      <div className="contenedor-principal2">
        <Grid container>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card className={classes.tarjeta}>
              <CardContent>
                <Typography className={classes.titulo}>
                  Total Afiliaciones año {añoActual}:
                </Typography>
                <Typography className={classes.texto}>
                  {totalCantidadActual}
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
                  {totalCantidadAnterior}
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
                <Typography className={classes.texto}>{porcentaje}%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Titulo style={estilosTitulo} title="Año Actual vs Anterior" />
        <Grid container>
          <Grid item xs={0} sm={0} md={2} lg={2} xl={2}></Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <div style={{ height: "600px" }}>
              <Bar options={options} data={data} plugins={[ChartDataLabels]} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CantidadAfisAsesorActualAnterior;
