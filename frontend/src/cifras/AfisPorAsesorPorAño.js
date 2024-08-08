import React, { useEffect, useState } from "react";
import { URL } from "../comercial/Constantes";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
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
    fontSize: "1.1vw",
    color: "white",
    textAlign: "center",
  },
  titulo: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
}));

const AfisPorAsesorPorAño = () => {
  const classes = useStyles();
  const [arrayAfisPorAsesorPorAnio, setArrayAfisPorAsesorPorAnio] = useState(
    []
  );
  const añoActual = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(añoActual);
  const [filteredData, setFilteredData] = useState([]);
  const [totalAfiliaciones, setTotalAfiliaciones] = useState(0);

  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px",
  };

  const obtenerAfisPorAsesorPorAnio = async () => {
    const res = await fetch(`${URL}afisPorAsesorPorAnio`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    setArrayAfisPorAsesorPorAnio(data);
  };

  useEffect(() => {
    obtenerAfisPorAsesorPorAnio();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const filteredArray = arrayAfisPorAsesorPorAnio.filter(
        (item) => item.Anio === selectedYear
      );
      setFilteredData(filteredArray);
    }
  }, [selectedYear, arrayAfisPorAsesorPorAnio]);

  useEffect(() => {
    const totalAfis = filteredData.reduce((acumulador, row) => {
      return acumulador + row.Cantidad;
    }, 0);
    setTotalAfiliaciones(totalAfis);
  }, [filteredData]);

  const years = [
    ...new Set(arrayAfisPorAsesorPorAnio.map((item) => item.Anio)),
  ].sort((a, b) => b - a);

  const data = {
    labels: filteredData
      .sort((a, b) => b.Cantidad - a.Cantidad) // ordenar el array por cantidad de mayor a menor
      .map((datos) => datos.Nombre),
    datasets: [
      {
        label: "Cantidad",
        data: filteredData
          .sort((a, b) => b.Cantidad - a.Cantidad) // ordenar el array por cantidad de mayor a menor
          .map((datos) => datos.Cantidad),
        backgroundColor: "#BE3A4A",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
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
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="contenedor-principal2">
      <Titulo style={estilosTitulo} title="Afiliaciones por Asesor por Año" />
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={8} style={{ marginTop: "80px", marginLeft: "50px" }}>
          <Bar options={options} data={data} plugins={[ChartDataLabels]} />
        </Grid>
        <Grid item xs={3} style={{ marginLeft: "50px" }}>
          <InputLabel style={{ color: "#BE3A4A" }}>
            Selecciona un año
          </InputLabel>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControl
              style={{
                width: "150px",
                marginRight: "10px",
              }}
            >
              <Select
                style={{ color: "#BE3A4A" }}
                value={selectedYear}
                onChange={handleChange}
              >
                {years.map((year) => (
                  <MenuItem
                    style={{ color: "#BE3A4A" }}
                    key={year}
                    value={year}
                  >
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Card className={classes.tarjeta} style={{ marginLeft: "50px" }}>
              <CardContent>
                <Typography className={classes.texto}>
                  Total Afis {totalAfiliaciones}
                </Typography>
              </CardContent>
            </Card>
          </div>

          <TableContainer
            style={{
              marginTop: "10px",
              height: "100%",
              width: "80%",
              maxHeight: "700px",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: "15px", color: "#BE3A4A" }}>
                    Asesor
                  </TableCell>
                  <TableCell style={{ fontSize: "15px", color: "#BE3A4A" }}>
                    Cantidad
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .sort((a, b) => b.Cantidad - a.Cantidad)
                  .map((row) => (
                    <TableRow key={row.Asesor}>
                      <TableCell style={{ fontSize: "14px" }}>
                        {row.Nombre}
                      </TableCell>
                      <TableCell style={{ fontSize: "14px" }}>
                        {row.Cantidad}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default AfisPorAsesorPorAño;
