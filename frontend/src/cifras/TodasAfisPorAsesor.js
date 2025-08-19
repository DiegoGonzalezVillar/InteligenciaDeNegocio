import React, { useState, useEffect } from "react";
import { URL } from "../../src/comercial/Constantes";
import Titulo from "../componentes/Titulo";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  Card,
  CardContent,
} from "@material-ui/core";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const useStyles = makeStyles({
  tarjeta: {
    width: "100%",
    height: "100%",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },

  card2: {
    width: "100%",
    height: "90%",
    margin: "10px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },

  card3: {
    width: "100%",
    height: "90%",
    margin: "10px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  texto: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#BE3A4A",
  },
  texto2: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#E28432",
  },
  texto3: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "rgba(150, 150, 150, 0.7)",
  },
  texto4: {
    fontWeight: "bold",
    fontSize: "26px",
    color: "#BE3A4A",
  },
  ul: {
    listStyleType: "none",
    paddingLeft: 0,
    "& li": {
      marginBottom: "5px",
    },
  },
});

// LÍNEAS NUEVAS O MODIFICADAS ESTÁN COMENTADAS

// ... [importaciones, estilos, y hooks previos] ...

const GraficoBarrasApiladas = () => {
  const classes = useStyles();
  const [arrayTodasLasAfisPorAsesor, setArrayTodasLasAfisPorAsesor] =
    useState(null);
  const [agruparPor, setAgruparPor] = useState("asesor_nombre");
  const [regimenesSeleccionados, setRegimenesSeleccionados] = useState({});
  const [anioSeleccionado, setAnioSeleccionado] = useState(2025);
  const [mesSeleccionado, setMesSeleccionado] = useState(["Todos"]); // <-- NUEVO ESTADO
  const [total16713, setTotal16713] = useState(0);
  const [total20130, setTotal20130] = useState(0);
  const [totalVoluntarias, setTotalVoluntarias] = useState(0);
  const [totalAfiliaciones, setTotalAfiliaciones] = useState(0);
  //const [mostrarTabla, setMostrarTabla] = useState(false);

  const obtenerAfisPorAsesor = async () => {
    const res = await fetch(`${URL}todasLasAfisPorAsesor`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    setArrayTodasLasAfisPorAsesor(data);
  };

  useEffect(() => {
    obtenerAfisPorAsesor();
  }, []);

  useEffect(() => {
    if (arrayTodasLasAfisPorAsesor) {
      const regimenes = [
        ...new Set(arrayTodasLasAfisPorAsesor.map((item) => item.regimen)),
      ];
      const seleccionInicial = {};
      regimenes.forEach((r) => {
        seleccionInicial[r] = true;
      });
      setRegimenesSeleccionados(seleccionInicial);
    }
  }, [arrayTodasLasAfisPorAsesor]);

  useEffect(() => {
    setMesSeleccionado(["Todos"]);
  }, [anioSeleccionado]);

  // Filtrar datos cuando cambian los datos originales o los regímenes seleccionados
  useEffect(() => {
    if (!arrayTodasLasAfisPorAsesor) return;

    const datosVisibles = arrayTodasLasAfisPorAsesor.filter((d) => {
      const cumpleAnio =
        anioSeleccionado === "Todos" || d.anio === parseInt(anioSeleccionado);

      const cumpleMes =
        mesSeleccionado.includes("Todos") || mesSeleccionado.includes(d.mes);

      const cumpleRegimen = regimenesSeleccionados[d.regimen];

      return cumpleAnio && cumpleMes && cumpleRegimen;
    });

    const total16713 = datosVisibles
      .filter((d) => d.regimen === "16713")
      .reduce((acc, d) => acc + d.cantidad_documentos, 0);

    const total20130 = datosVisibles
      .filter((d) => d.regimen === "20130")
      .reduce((acc, d) => acc + d.cantidad_documentos, 0);

    const totalVoluntarias = datosVisibles
      .filter((d) => d.regimen === "Voluntarias")
      .reduce((acc, d) => acc + d.cantidad_documentos, 0);

    let totalAfiliaciones = totalVoluntarias + total20130 + total16713;

    setTotal16713(total16713);
    setTotal20130(total20130);
    setTotalVoluntarias(totalVoluntarias);
    setTotalAfiliaciones(totalAfiliaciones);
  }, [
    arrayTodasLasAfisPorAsesor,
    anioSeleccionado,
    mesSeleccionado,
    regimenesSeleccionados,
  ]);

  if (!arrayTodasLasAfisPorAsesor) {
    return (
      <div className="contenedor-principal2">
        <Typography
          style={{ textAlign: "center", marginTop: "25px" }}
          className={classes.texto}
        >
          Cargando datos...
        </Typography>
      </div>
    );
  }

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

  const mesesUnicos = [
    "Todos",
    ...new Set(
      arrayTodasLasAfisPorAsesor
        .filter(
          (item) =>
            anioSeleccionado === "Todos" ||
            item.anio === parseInt(anioSeleccionado)
        )
        .map((item) => item.mes)
    ),
  ].sort((a, b) => {
    return mesesEnEspanol.indexOf(a) - mesesEnEspanol.indexOf(b);
  });

  const regimenesUnicos = [
    ...new Set(arrayTodasLasAfisPorAsesor.map((item) => item.regimen)),
  ];

  const toggleRegimen = (regimen) => {
    setRegimenesSeleccionados((prev) => ({
      ...prev,
      [regimen]: !prev[regimen],
    }));
  };

  const aniosUnicos = [
    "Todos",
    ...new Set(arrayTodasLasAfisPorAsesor.map((item) => item.anio)),
  ];

  const getColorForRegimen = (regimen) => {
    const colores = {
      16713: "#BE3A4A",
      20130: "#E28432",
      voluntaria: "#6C6252",
    };
    return colores[regimen] || "rgba(150, 150, 150, 0.7)";
  };

  const chartData = (() => {
    const agrupados = {};
    arrayTodasLasAfisPorAsesor
      .filter((item) => {
        const cumpleAnio =
          anioSeleccionado === "Todos" ||
          item.anio === parseInt(anioSeleccionado);
        const cumpleMes =
          mesSeleccionado.includes("Todos") ||
          mesSeleccionado.includes(item.mes);
        const cumpleRegimen = regimenesSeleccionados[item.regimen];
        return cumpleAnio && cumpleMes && cumpleRegimen;
      })
      .forEach(({ mes, asesor_nombre, regimen, cantidad_documentos }) => {
        const clave = agruparPor === "asesor_nombre" ? asesor_nombre : mes;
        if (!agrupados[clave]) agrupados[clave] = {};
        if (!agrupados[clave][regimen]) agrupados[clave][regimen] = 0;

        agrupados[clave][regimen] += cantidad_documentos;
      });

    let labels = Object.keys(agrupados);

    if (agruparPor === "asesor_nombre") {
      labels.sort((a, b) => {
        const totalA = Object.values(agrupados[a]).reduce(
          (acc, val) => acc + val,
          0
        );
        const totalB = Object.values(agrupados[b]).reduce(
          (acc, val) => acc + val,
          0
        );
        return totalB - totalA;
      });
    } else if (agruparPor === "mes") {
      const ordenMeses = [
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
      labels.sort(
        (a, b) =>
          ordenMeses.indexOf(a.toLowerCase()) -
          ordenMeses.indexOf(b.toLowerCase())
      );
    }

    const datasets = regimenesUnicos
      .filter((regimen) => regimenesSeleccionados[regimen])
      .map((regimen) => ({
        label: regimen,
        data: labels.map((label) => agrupados[label]?.[regimen] || 0),
        backgroundColor: getColorForRegimen(regimen),
        stack: "stack1",
      }));

    return { labels, datasets };
  })();

  const handleChangeMonth = (event) => {
    let value = event.target.value;

    // Si selecciona "Todos"
    if (value.includes("Todos")) {
      // Si "Todos" ya estaba seleccionado, y el usuario intenta sacar "Todos", permitimos seguir seleccionando otros
      if (mesSeleccionado.includes("Todos") && value.length > 1) {
        value = value.filter((v) => v !== "Todos");
      } else {
        // Si recién seleccionaron "Todos", dejamos solo "Todos"
        value = ["Todos"];
      }
    } else {
      // Si seleccionan otros meses y "Todos" estaba seleccionado antes, lo sacamos
      if (mesSeleccionado.includes("Todos")) {
        value = value.filter((v) => v !== "Todos");
      }
    }

    setMesSeleccionado(value);
  };

  const opciones = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      datalabels: {
        color: "#fff",
        display: true,
        anchor: "center",
        align: "center",
        formatter: Math.round,
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return (
    <div className="contenedor-principal2">
      <Titulo title="Afiliaciones" />
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={9} style={{ marginTop: "10px", marginLeft: "30px" }}>
          {/*{mostrarTabla ? (
            <div className="overflow-x-auto mt-4">
              <table className="table-auto border-collapse w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Mes</th>
                    {regimenesSeleccionados["16713"] && (
                      <th className="border px-4 py-2">16713</th>
                    )}
                    {regimenesSeleccionados["20130"] && (
                      <th className="border px-4 py-2">20130</th>
                    )}
                    {regimenesSeleccionados["Voluntarias"] && (
                      <th className="border px-4 py-2">Voluntarias</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((fila) => (
                    <tr key={fila.mes}>
                      <td className="border px-4 py-2">{fila.mes}</td>
                      {regimenesSeleccionados["16713"] && (
                        <td className="border px-4 py-2">{fila.total16713}</td>
                      )}
                      {regimenesSeleccionados["20130"] && (
                        <td className="border px-4 py-2">{fila.total20130}</td>
                      )}
                      {regimenesSeleccionados["Voluntarias"] && (
                        <td className="border px-4 py-2">
                          {fila.totalVoluntarias}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (  )}*/}
          <Bar data={chartData} options={opciones} />
        </Grid>
        <Grid item xs={2} style={{ marginLeft: "50px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "30px",
              marginTop: "30px",
            }}
          >
            {/* Gráfica por */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/*<button onClick={() => setMostrarTabla((prev) => !prev)}>
                {mostrarTabla ? "Ver Gráfica" : "Ver Tabla"}
              </button>*/}
              <InputLabel style={{ color: "#BE3A4A", minWidth: "70px" }}>
                Gráfica por:
              </InputLabel>
              <FormControl style={{ width: "200px" }}>
                <Select
                  value={agruparPor}
                  onChange={(e) => setAgruparPor(e.target.value)}
                  style={{ color: "#BE3A4A" }}
                >
                  <MenuItem value="asesor_nombre" style={{ color: "#BE3A4A" }}>
                    Asesor
                  </MenuItem>
                  <MenuItem value="mes" style={{ color: "#BE3A4A" }}>
                    Fecha
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <Titulo title="Totales" />
            <Card
              className={classes.tarjeta}
              style={{
                marginLeft: "20px",
                backgroundColor: "rgba(230, 230, 230, 0.247)",
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Centrado horizontal
                  justifyContent: "center", // Centrado vertical (si Card tiene altura)
                  height: "100%", // Asegura altura completa
                }}
              >
                <Typography className={classes.texto}>
                  16713: {total16713}
                </Typography>
                <Typography className={classes.texto2}>
                  20130: {total20130}
                </Typography>
                <Typography className={classes.texto3}>
                  Voluntarias: {totalVoluntarias}
                </Typography>
                <Typography className={classes.texto}>
                  Total: {totalAfiliaciones}
                </Typography>
              </CardContent>
            </Card>

            <Titulo title="Filtros" />
            {/* Año */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <InputLabel style={{ color: "#BE3A4A", minWidth: "70px" }}>
                Año:
              </InputLabel>
              <FormControl style={{ width: "200px" }}>
                <Select
                  value={anioSeleccionado}
                  style={{ color: "#BE3A4A" }}
                  onChange={(e) => setAnioSeleccionado(e.target.value)}
                >
                  {aniosUnicos.map((anio) => (
                    <MenuItem
                      key={anio}
                      value={anio}
                      style={{ color: "#BE3A4A" }}
                    >
                      {anio}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Filtro por régimen */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <InputLabel style={{ color: "#BE3A4A", minWidth: "70px" }}>
                Régimen:
              </InputLabel>
              <FormControl style={{ width: "200px" }}>
                <Select
                  multiple
                  value={Object.keys(regimenesSeleccionados).filter(
                    (r) => regimenesSeleccionados[r]
                  )}
                  renderValue={(selected) => selected.join(", ")}
                  style={{ color: "#BE3A4A" }}
                >
                  {regimenesUnicos.map((regimen) => (
                    <MenuItem
                      key={regimen}
                      value={regimen}
                      onClick={() => toggleRegimen(regimen)}
                    >
                      <Checkbox checked={regimenesSeleccionados[regimen]} />
                      <ListItemText primary={regimen} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Filtro por mes */}
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
                  multiple
                  value={mesSeleccionado}
                  onChange={handleChangeMonth}
                  renderValue={(selected) => selected.join(", ")}
                  style={{ color: "#BE3A4A" }}
                >
                  {mesesUnicos.map((mes) => (
                    <MenuItem key={mes} value={mes}>
                      <Checkbox checked={mesSeleccionado.includes(mes)} />
                      <ListItemText primary={mes} />
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

export default GraficoBarrasApiladas;
