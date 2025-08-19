import React, { useEffect, useState } from "react";
import { URL } from "../comercial/Constantes";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  InputLabel,
  Grid,
  FormControl,
  Card,
  Typography,
  makeStyles,
  CardContent,
} from "@material-ui/core";
import Titulo from "../componentes/Titulo";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const useStyles = makeStyles(() => ({
  tarjeta: {
    background: "#BE3A4A",
    margin: "10px 10px 10px 10px",
  },
  texto: {
    fontSize: "0.9vw",
    color: "white",
    textAlign: "center",
  },
  titulo: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
}));

const RatificacionesPorAsesorPoraño = () => {
  const classes = useStyles();
  const [
    arrayRatificacionesPorAsesorPorAnio,
    setArrayRatificacionesPorAsesorPorAnio,
  ] = useState([]);
  const añoActual = new Date().getFullYear();
  //const mesActual = new Date().toLocaleString("es-ES", { month: "long" });
  const [selectedYear, setSelectedYear] = useState(añoActual);
  const [selectedMonths, setSelectedMonths] = useState(["Todos"]);
  const [selectedRegimen, setSelectedRegimen] = useState("Todos");
  const [filteredData, setFilteredData] = useState([]);
  const [totalAfiliaciones, setTotalAfiliaciones] = useState(0);

  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px",
  };

  const obtenerRatificacionesPorAsesorPorAnio = async () => {
    const res = await fetch(`${URL}ratificacionesPorAsesorPorAnio`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    setArrayRatificacionesPorAsesorPorAnio(data);
  };

  useEffect(() => {
    obtenerRatificacionesPorAsesorPorAnio();
  }, []);

  useEffect(() => {
    let filteredArray = arrayRatificacionesPorAsesorPorAnio.filter((item) => {
      const matchYear = selectedYear === "Todos" || item.Anio === selectedYear;
      const matchMonth =
        selectedMonths.includes("Todos") || selectedMonths.includes(item.Mes);
      const matchRegimen =
        selectedRegimen === "Todos" || selectedRegimen === item.regimen;
      return matchYear && matchMonth && matchRegimen;
    });

    if (selectedRegimen === "Todos") {
      const agrupadoPorAsesor = filteredArray.reduce((acumulador, item) => {
        const asesorExistente = acumulador.find(
          (a) => a.Nombre === item.Nombre
        );
        if (asesorExistente) {
          asesorExistente.Cantidad += item.Cantidad;
        } else {
          acumulador.push({ ...item });
        }
        return acumulador;
      }, []);
      filteredArray = agrupadoPorAsesor;
    } else {
      const uniqueAsesores = filteredArray.reduce((acumulador, item) => {
        const asesorExistente = acumulador.find(
          (a) => a.Nombre === item.Nombre && a.regimen === item.regimen
        );
        if (!asesorExistente) {
          acumulador.push({ ...item });
        } else {
          asesorExistente.Cantidad += item.Cantidad;
        }
        return acumulador;
      }, []);
      filteredArray = uniqueAsesores;
    }

    setFilteredData(filteredArray);
  }, [
    selectedYear,
    selectedMonths,
    selectedRegimen,
    arrayRatificacionesPorAsesorPorAnio,
  ]);

  // Calcular total de afiliaciones filtradas
  useEffect(() => {
    const totalAfis = filteredData.reduce((acumulador, row) => {
      return acumulador + row.Cantidad;
    }, 0);
    setTotalAfiliaciones(totalAfis);
  }, [filteredData]);

  const years = [
    "Todos",
    ...new Set(arrayRatificacionesPorAsesorPorAnio.map((item) => item.Anio)),
  ].sort((a, b) => b - a);
  const mesesEnEspanol = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const months = [
    "Todos",
    ...new Set(arrayRatificacionesPorAsesorPorAnio.map((item) => item.Mes)),
  ].sort((a, b) => {
    return mesesEnEspanol.indexOf(a) - mesesEnEspanol.indexOf(b);
  });

  const regimenes = [
    ...new Set(arrayRatificacionesPorAsesorPorAnio.map((item) => item.regimen)),
  ].sort((a, b) => b - a);

  const data = {
    labels: filteredData
      .sort((a, b) => b.Cantidad - a.Cantidad)
      .map((datos) => datos.Nombre),
    datasets: [
      {
        data: filteredData
          .sort((a, b) => b.Cantidad - a.Cantidad)
          .map((datos) => datos.Cantidad),
        backgroundColor: "#E28432",
      },
    ],
  };

  const maxValue = Math.max(...filteredData.map((datos) => datos.Cantidad));
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value) => {
          return value;
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxValue * 1.1,
      },
    },
  };

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleChangeMonth = (event) => {
    let value = event.target.value;

    // Si selecciona "Todos"
    if (value.includes("Todos")) {
      // Si "Todos" ya estaba seleccionado, y el usuario intenta sacar "Todos", permitimos seguir seleccionando otros
      if (selectedMonths.includes("Todos") && value.length > 1) {
        value = value.filter((v) => v !== "Todos");
      } else {
        // Si recién seleccionaron "Todos", dejamos solo "Todos"
        value = ["Todos"];
      }
    } else {
      // Si seleccionan otros meses y "Todos" estaba seleccionado antes, lo sacamos
      if (selectedMonths.includes("Todos")) {
        value = value.filter((v) => v !== "Todos");
      }
    }

    setSelectedMonths(value);
  };

  const handleChangeRegimen = (event) => {
    setSelectedRegimen(event.target.value);
  };

  return (
    <div className="contenedor-principal2">
      <Titulo style={estilosTitulo} title="Ratificaciones por Asesor" />
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={8} style={{ marginTop: "60px", marginLeft: "50px" }}>
          <Bar options={options} data={data} plugins={[ChartDataLabels]} />
        </Grid>
        <Grid item xs={3} style={{ marginLeft: "50px" }}>
          <Card
            className={classes.tarjeta}
            style={{ marginLeft: "20px", marginTop: "50px" }}
          >
            <CardContent>
              <Typography className={classes.texto}>
                Total Ratificaciones {totalAfiliaciones}
              </Typography>
            </CardContent>
          </Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "30px",
              marginTop: "30px",
            }}
          >
            {/* Año */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <InputLabel
                htmlFor="year-select"
                style={{ color: "#BE3A4A", minWidth: "70px" }}
              >
                Año
              </InputLabel>
              <FormControl style={{ width: "200px" }}>
                <Select
                  id="year-select"
                  value={selectedYear}
                  onChange={handleChange}
                  style={{ color: "#BE3A4A" }}
                >
                  {years.map((year) => (
                    <MenuItem
                      key={year}
                      value={year}
                      style={{ color: "#BE3A4A" }}
                    >
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Mes */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <InputLabel
                htmlFor="month-select"
                style={{ color: "#BE3A4A", minWidth: "70px" }}
              >
                Mes
              </InputLabel>
              <FormControl style={{ width: "200px" }}>
                <Select
                  id="month-select"
                  multiple
                  value={selectedMonths}
                  onChange={handleChangeMonth}
                  style={{ color: "#BE3A4A" }}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {months.map((month) => (
                    <MenuItem
                      key={month}
                      value={month}
                      style={{ color: "#BE3A4A" }}
                    >
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Régimen */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <InputLabel
                htmlFor="regimen-select"
                style={{ color: "#BE3A4A", minWidth: "70px" }}
              >
                Régimen
              </InputLabel>
              <FormControl style={{ width: "200px" }}>
                <Select
                  id="regimen-select"
                  value={selectedRegimen}
                  onChange={handleChangeRegimen}
                  style={{ color: "#BE3A4A" }}
                >
                  <MenuItem value="Todos" style={{ color: "#BE3A4A" }}>
                    Todos
                  </MenuItem>
                  {regimenes.map((regimen) => (
                    <MenuItem
                      key={regimen}
                      value={regimen}
                      style={{ color: "#BE3A4A" }}
                    >
                      {regimen}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RatificacionesPorAsesorPoraño;
