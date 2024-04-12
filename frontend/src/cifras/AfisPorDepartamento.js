import React, { useState, useEffect } from "react";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Grid } from "@material-ui/core";
//import { makeStyles } from '@material-ui/core/styles';
import { URL } from "../comercial/Constantes.js";
import Titulo from "../componentes/Titulo.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AfisPorDepartamento(props) {
  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px", // Por ejemplo, aquí se define el margen superior
    // Puedes agregar más propiedades de estilo según sea necesario
  };
  const [
    arrayAfiliacionesPorDepartamento,
    setarrayAfiliacionesPorDepartamento,
  ] = useState([]);
  const afiliacionesPorDepartamento = async () => {
    const res = await fetch(`${URL}afisPorDepartamento`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    console.log(res);
    const data = await res.json();
    setarrayAfiliacionesPorDepartamento(data);
  };
  useEffect(() => {
    afiliacionesPorDepartamento();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Afiliaciones por Departamento",
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

  const uniqueDepartamentos = [
    ...new Set(
      arrayAfiliacionesPorDepartamento.map((dato) => dato.departamento)
    ),
  ];

  const dataByDepartamento = uniqueDepartamentos.map((departamento) => {
    const cantidades = arrayAfiliacionesPorDepartamento.filter(
      (datos) => datos.departamento === departamento
    );
    return {
      departamento,
      cantidadAnterior:
        cantidades.find((datos) => datos.año === new Date().getFullYear() - 1)
          ?.cantidad || 0,
      cantidadActual:
        cantidades.find((datos) => datos.año === new Date().getFullYear())
          ?.cantidad || 0,
    };
  });

  const data = {
    labels: dataByDepartamento
      .sort((a, b) => b.cantidadActual - a.cantidadActual)
      .map((datos) => datos.departamento),
    datasets: [
      {
        label: `${new Date().getFullYear() - 1}`,
        data: dataByDepartamento
          //.sort((a, b) => b.cantidadActual - a.cantidadActual)
          .map((datos) => datos.cantidadAnterior),
        backgroundColor: "#BE3A4A",
      },
      {
        label: `${new Date().getFullYear()}`,
        data: dataByDepartamento
          .sort((a, b) => b.cantidadActual - a.cantidadActual)
          .map((datos) => datos.cantidadActual),
        backgroundColor: "#E28432",
      },
    ],
  };
  return (
    <div className="content">
      <div className="contenedor-principal">
        <Titulo style={estilosTitulo} title="Afiliaciones por Departamento" />
        <Grid container style={{ marginTop: "2%" }}>
          <Grid item xs={0} sm={0} md={2} lg={2} xl={2}></Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Bar options={options} data={data} plugins={[ChartDataLabels]} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AfisPorDepartamento;
