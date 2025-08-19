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
import { URL } from "../comercial/Constantes.js";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Titulo from "../componentes/Titulo.js";

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

const MailPorAsesor = () => {
  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px",
  };
  const añoActual = new Date().getFullYear();
  const mesActual = new Date().toLocaleString("es-ES", { month: "long" });
  const nombreMesActual =
    mesActual.charAt(0).toUpperCase() + mesActual.slice(1);

  const classes = useStyles();
  const [arrayCantidadMail, setArrayCantidadMail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(añoActual);
  const [selectedMonth, setSelectedMonth] = useState(nombreMesActual);
  const [filteredData, setFilteredData] = useState([]);
  const [porcentajeReferencia, setPorcentajeReferencia] = useState(50);

  const cantidadPorMail = async () => {
    try {
      const res = await fetch(`${URL}getCantidadPorMail`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const data = await res.json();
      setArrayCantidadMail(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const cambiarValorDePorcentaje = (event) => {
    setPorcentajeReferencia(event.target.value);
  };

  useEffect(() => {
    cantidadPorMail();
  }, []);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const filteredArray = arrayCantidadMail.filter(
        (item) => item.anio === selectedYear && item.mes === selectedMonth
      );
      setFilteredData(filteredArray);
    } else if (selectedYear) {
      const filteredArray = arrayCantidadMail.filter(
        (item) => item.anio === selectedYear
      );
      setFilteredData(filteredArray);
    } else {
      setFilteredData(arrayCantidadMail);
    }
  }, [selectedYear, selectedMonth, arrayCantidadMail]);

  const years = [...new Set(arrayCantidadMail.map((item) => item.anio))].sort(
    (a, b) => a - b
  );

  const mesesEnEspanol = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const months = [...new Set(arrayCantidadMail.map((item) => item.mes))];
  months.sort((a, b) => {
    return mesesEnEspanol.indexOf(a) - mesesEnEspanol.indexOf(b);
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "",
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
        max: 110,
      },
    },
  };
  const asesores = [...new Set(filteredData.map((item) => item.asesor))].sort(
    (a, b) => a - b
  );

  const data2 = {
    labels: asesores,
    datasets: [
      {
        label: "%",
        data: asesores.map((asesor) => {
          const item = filteredData.find((item) => item.asesor === asesor);
          return item ? item.porcentaje : 0;
        }),
        backgroundColor: asesores.map((asesor) => {
          const item = filteredData.find((item) => item.asesor === asesor);
          return item && item.porcentaje < porcentajeReferencia
            ? "#BE3A4A"
            : "#E28432";
        }),
      },
    ],
  };

  const cantidadQueCumplen = filteredData.filter(
    (item) => item.porcentaje >= porcentajeReferencia
  ).length;

  const cantidadNoCumplen = filteredData.filter(
    (item) => item.porcentaje < porcentajeReferencia
  ).length;

  return (
    <div className="contenedor-principal2">
      <Titulo style={estilosTitulo} title="Afiliaciones por Asesor con Mail" />
      {loading ? (
        <p>Loading...</p> // Display a loading indicator or message
      ) : (
        <Grid container>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card className={classes.tarjeta}>
              <CardContent>
                <Typography className={classes.titulo}>
                  Valor de porcentaje de referencia:
                </Typography>
                <Typography className={classes.texto}>
                  {porcentajeReferencia}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card className={classes.tarjeta}>
              <CardContent>
                <Typography className={classes.titulo}>
                  Total que Cumplen con los mails:
                </Typography>
                <Typography className={classes.texto}>
                  {cantidadQueCumplen}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card className={classes.tarjeta}>
              <CardContent>
                <Typography className={classes.titulo}>
                  Total que NO cumplen con los mails:
                </Typography>
                <Typography className={classes.texto}>
                  {cantidadNoCumplen}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h4 style={{ color: "#B83E42" }}>Filtros</h4>
              </div>
              <FormControl
                style={{
                  marginLeft: "150px",
                  width: "200px",
                  marginTop: "50px",
                }}
              >
                <InputLabel id="year-select-label">
                  Selecciona un año
                </InputLabel>
                {
                  <Select
                    value={selectedYear}
                    onChange={(e) =>
                      setSelectedYear(parseInt(e.target.value, 10))
                    }
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Select>
                }
              </FormControl>
              <FormControl
                style={{
                  marginLeft: "150px",
                  width: "200px",
                  marginTop: "50px",
                }}
              >
                <InputLabel id="month-select-label">
                  Selecciona un mes
                </InputLabel>
                <Select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {/*<option value="">Acumulado del año</option>{" "}*/}
                  {/* Opción para el acumulado del año */}
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Valor de referencia"
                value={porcentajeReferencia}
                onChange={cambiarValorDePorcentaje}
                style={{
                  marginLeft: "150px",
                  width: "200px",
                  marginTop: "50px",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={7}
              lg={7}
              xl={7}
              style={{ marginLeft: "150px" }}
            >
              <Bar
                options={{
                  ...options,
                  plugins: {
                    ...options.plugins,
                    title: {
                      ...options.plugins.title,
                      text: "Porcentaje de SI",
                      position: "bottom",
                    },
                  },
                }}
                data={data2}
                plugins={[ChartDataLabels]}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default MailPorAsesor;
