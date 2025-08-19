import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Medidor from "../componentes/Medidor";
import { URL } from "../comercial/Constantes.js";

dayjs.extend(isSameOrBefore);

const useStyles = makeStyles((theme) => ({
  tarjeta: {
    background: "#BE3A4A",
    margin: "20px 20px 20px 20px",
  },
  texto: {
    fontSize: 19,
    color: "white",
    textAlign: "center",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#BE3A4A",
    textAlign: "center",
  },
  gridItem: {
    marginTop: theme.spacing(2),
  },
}));

function CurvaS() {
  const classes = useStyles();
  const [excelData, setExcelData] = useState([]);
  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    fetch(`${URL}curvaS`)
      .then((response) => response.json())
      .then((data) => {
        setExcelData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const dataFormateada = excelData.map((datos) => {
    const fechaOriginal = new Date((datos.Fecha - 25569 + 1) * 86400 * 1000); // convierte el valor de Excel a una fecha
    const fechaFormateada = dayjs(fechaOriginal).format("DD/MM/YYYY"); // formatea la fecha
    return { ...datos, Fecha: fechaFormateada }; // devuelve un objeto con la fecha formateada
  });

  const datosReales = dataFormateada.filter((datos) => datos.Clase === 0);
  const datosCurvaS = dataFormateada.filter((datos) => datos.Clase === 1);

  const datosRealesFiltrados = datosReales.reduce(
    (acumulador, valorActual, indice, array) => {
      // Siempre incluimos el último valor
      if (indice === array.length - 1) {
        acumulador.push(valorActual);
      }
      // Retrocede cada 10 valores desde el último
      else if ((array.length - indice - 1) % 5 === 0) {
        acumulador.push(valorActual);
      }
      return acumulador;
    },
    []
  );

  const datosCurvaSFiltrados = datosCurvaS.reduce(
    (acumulador, valorActual, indice, array) => {
      const esPrimero = indice === 0;
      const esUltimo = indice === array.length - 1;
      const cadaDiezDesdeFinal = (array.length - indice - 1) % 10 === 0;

      if (esPrimero || esUltimo || cadaDiezDesdeFinal) {
        acumulador.push(valorActual);
      }

      return acumulador;
    },
    []
  );

  const CustomLabel = ({ x, y, value }) => {
    return (
      <text
        x={x - 10} // Posición X
        y={y + 15} // Posición Y ajustada para estar en la esquina inferior izquierda del punto
        fill="#BE3A4A"
        fontSize={13}
        textAnchor="start" // Alineación izquierda
      >
        {value}
      </text>
    );
  };

  const CustomLabel2 = ({ x, y, value }) => {
    return (
      <text
        x={x - 10} // Posición X
        y={y - 10} // Posición Y ajustada para estar en la esquina inferior izquierda del punto
        fill="#E28432"
        fontSize={13}
        textAnchor="start" // Alineación izquierda
      >
        {value}
      </text>
    );
  };

  const CustomLineChart = ({ data, dataKey1, dataKey2, label1, label2 }) => (
    <ResponsiveContainer width="100%" height={460}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="Fecha"
          stroke="#4A4A4A"
          padding={{ right: 40, left: 10 }}
        />
        <YAxis stroke="#4A4A4A" tickCount={7} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey1}
          stroke="#BE3A4A"
          name={label1}
          label={showLabels ? <CustomLabel /> : null}
        />
        <Line
          type="monotone"
          dataKey={dataKey2}
          stroke="#E28432"
          name={label2}
          label={showLabels ? <CustomLabel2 /> : null}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  let porcentajeAfisAcumuladas = 0;
  let porcentajeMetaAcumulada = 0;
  let porcentajeAfisAcumuladasSobreMetaAcumulada = 0;

  if (excelData.length > 0) {
    const afisAcumuladas = excelData.filter((dato) => dato.Clase === 0);
    const ultimoAfisAcumulado = afisAcumuladas[afisAcumuladas.length - 1];

    porcentajeAfisAcumuladas =
      Math.round((ultimoAfisAcumulado.afis_acumuladas / 9500) * 100 * 10) / 10;
    porcentajeMetaAcumulada =
      Math.round((ultimoAfisAcumulado.meta_acumulada / 9500) * 100 * 10) / 10;
    const diferenciaAfisAcumuladasSobreMetaAcumulada =
      ultimoAfisAcumulado.afis_acumuladas - ultimoAfisAcumulado.meta_acumulada;

    porcentajeAfisAcumuladasSobreMetaAcumulada = Math.round(
      (diferenciaAfisAcumuladasSobreMetaAcumulada /
        ultimoAfisAcumulado.meta_acumulada) *
        100
    );
  }

  const HoverButton = ({ onClick }) => {
    const [hover, setHover] = useState(false);

    return (
      <Button
        style={{ color: hover ? "#E28432" : "#BE3A4A", fontSize: "13px" }}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {showLabels ? "Ocultar Etiquetas" : "Mostrar Etiquetas"}{" "}
      </Button>
    );
  };

  return (
    <div className="contenedor-principal2">
      <Grid container>
        <Grid
          className={classes.gridItem}
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          xl={4}
        >
          <Typography className={classes.titulo}>
            Porcentaje de afiliaciones reales sobre la meta anual
          </Typography>
          <Medidor value={porcentajeAfisAcumuladas} min={0} max={100} />
        </Grid>
        <Grid
          className={classes.gridItem}
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          xl={4}
        >
          <Typography className={classes.titulo}>
            Porcentaje de afiliaciones esperadas sobre la meta anual
          </Typography>
          <Medidor value={porcentajeMetaAcumulada} min={0} max={100} />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <Card className={classes.tarjeta} style={{ marginTop: "50px" }}>
            <CardContent>
              <Typography className={classes.texto}>
                Las afiliaciones reales al día de hoy corresponden a un{" "}
                {porcentajeAfisAcumuladasSobreMetaAcumulada}% de las
                afiliaciones esperadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          className={classes.gridItem}
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <CustomLineChart
            data={datosRealesFiltrados}
            dataKey1="afis_acumuladas"
            dataKey2="meta_acumulada"
            label1="Afiliaciones Reales"
            label2="Meta Acumulada"
          />
        </Grid>
        <Grid
          className={classes.gridItem}
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <CustomLineChart
            data={datosCurvaSFiltrados}
            dataKey1="CurvaS"
            dataKey2="meta_acumulada"
            label1="Curva S"
            label2="Meta Acumulada"
          />
        </Grid>
        <Grid container justifyContent="center" style={{ marginTop: "10px" }}>
          <HoverButton onClick={() => setShowLabels(!showLabels)} />
        </Grid>
      </Grid>
    </div>
  );
}

export default CurvaS;
