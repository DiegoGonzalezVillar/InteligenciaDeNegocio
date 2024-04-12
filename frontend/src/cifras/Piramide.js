import React, { useState, useEffect } from "react";
import { URL } from "../comercial/Constantes.js";
import { InputLabel, Select } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Titulo from "../componentes/Titulo.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const Piramide = () => {
  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px", // Por ejemplo, aquí se define el margen superior
    // Puedes agregar más propiedades de estilo según sea necesario
  };
  const [
    arrayAfiliacionesPorEdadYPorSexo,
    setArrayAfiliacionesPorEdadYPorSexo,
  ] = useState([]);
  const [arrayAfiliacionesPorAno, setArrayAfiliacionesPorAno] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const currentYear = new Date().getFullYear();

  const afiliacionesPorEdadYPorSexo = async () => {
    const res = await fetch(`${URL}getCantPorEdadYPorSexo`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    setArrayAfiliacionesPorEdadYPorSexo(data);

    // Agrupar la información por año de ingreso
    const afiliacionesPorAno = {};
    data.forEach((d) => {
      if (d.ano_ingreso in afiliacionesPorAno) {
        afiliacionesPorAno[d.ano_ingreso].push(d);
      } else {
        afiliacionesPorAno[d.ano_ingreso] = [d];
      }
    });
    setArrayAfiliacionesPorAno(afiliacionesPorAno);
  };

  useEffect(() => {
    afiliacionesPorEdadYPorSexo();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      setSelectedData(arrayAfiliacionesPorAno[selectedYear]);
    } else {
      setSelectedData(arrayAfiliacionesPorEdadYPorSexo);
    }
  }, [selectedYear, arrayAfiliacionesPorEdadYPorSexo, arrayAfiliacionesPorAno]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const femenino = selectedData.filter((d) => d.sexo === "F");
  const masculino = selectedData.filter((d) => d.sexo === "M");

  const edadesUnicas = Array.from(
    new Set([...femenino.map((d) => d.edad), ...masculino.map((d) => d.edad)])
  ).sort((a, b) => a - b);
  const edadLabels = edadesUnicas;
  const femeninoData = edadesUnicas.map(
    (edad) => -femenino.find((d) => d.edad === edad)?.cantidad || 0
  );
  const masculinoData = edadesUnicas.map(
    (edad) => masculino.find((d) => d.edad === edad)?.cantidad || 0
  );

  const chartData = {
    labels: edadLabels,
    datasets: [
      {
        label: "Mujeres",
        data: femeninoData,
        backgroundColor: "#BE3A4A",
        borderWidth: 1,
      },
      {
        label: "Hombres",
        data: masculinoData,
        backgroundColor: "#E28432",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: (value) => Math.abs(value),
        },
      },
      y: {
        stacked: true,
        reverse: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Pirámide de edad y género",
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.dataset.data[context.dataIndex];
            const absValue = Math.abs(value);
            return `${label}: ${absValue}`;
          },
        },
      },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          const datasetLabel =
            context.chart.data.datasets[context.datasetIndex].label || "";
          const absValue = Math.abs(value);
          return `${datasetLabel}: ${absValue}`;
        },
        font: {
          weight: "bold",
        },
        color: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return value < 0 ? "rgb(255, 99, 132)" : "rgb(54, 162, 235)";
        },
        anchor: "end",
        align: "top",
      },
    },
  };

  return (
    <div className="content">
      <div className="contenedor-principal">
        <Titulo
          style={estilosTitulo}
          title="Afiliaciones distribuidas por edad y por sexo"
        />
        <Grid container>
          <Grid item xs={0} sm={0} md={2} lg={2} xl={2}></Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <div className="centrados">
              <InputLabel style={{ width: "15%" }} id="year-select-label">
                Selecciona un año
              </InputLabel>
              <Select
                labelId="year-select-label"
                defaultValue={currentYear}
                value={selectedYear}
                onChange={handleYearChange}
                style={{ paddingLeft: "2px", width: "100px" }}
              >
                {Object.keys(arrayAfiliacionesPorAno).map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </Select>
            </div>

            <Bar
              style={{ height: "100%", width: "100%", marginTop: "5%" }}
              data={chartData}
              options={options}
              y="años"
              x="afiliaciones"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Piramide;
