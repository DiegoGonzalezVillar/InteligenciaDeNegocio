import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Medidor from "../componentes/Medidor";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DownloadIcon from "@mui/icons-material/Download";
import { URL } from "../comercial/Constantes.js";

dayjs.extend(isSameOrBefore);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme) => ({
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
    fontSize: 20,
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

  useEffect(() => {
    fetch(`${URL}curvaS`)
      .then((response) => response.json())
      .then((data) => {
        setExcelData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Comparacion de Afiliaciones Reales vs Afiliaciones esperadas",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const options2 = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Comparacion de curva s vs Afiliaciones esperadas",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const dataFormateada = excelData.map((datos) => {
    const fechaOriginal = new Date((datos.Fecha - 25569 + 1) * 86400 * 1000); // convierte el valor de Excel a una fecha
    const fechaFormateada = dayjs(fechaOriginal).format("DD/MM/YYYY"); // formatea la fecha
    return { ...datos, Fecha: fechaFormateada }; // devuelve un objeto con la fecha formateada
  });

  const data = {
    labels: dataFormateada
      .filter((datos, index) => datos.Clase === 0 && index % 4 === 0)
      .map((datos) => datos.Fecha),
    datasets: [
      {
        label: "Afiliaciones reales",
        data: dataFormateada
          .filter((datos, index) => datos.Clase === 0 && index % 4 === 0)
          .map((datos) => datos.afis_acumuladas),
        borderColor: "#BE3A4A",
        backgroundColor: "#BE3A4A",
        datalabels: {
          anchor: "end",
          align: "bottom",
          offset: 8,
          font: {
            size: 12,
          },
        },
      },

      {
        label: "Meta Acumulada",

        data: dataFormateada
          .filter((datos, index) => datos.Clase === 0 && index % 4 === 0)
          .map((datos) => datos.meta_acumulada),
        borderColor: "#E28432",
        backgroundColor: "#E28432",
        datalabels: {
          anchor: "end",
          align: "top",
          offset: 8,
          font: {
            size: 12,
          },
        },
      },
    ],
  };

  const data2 = {
    labels: dataFormateada
      .filter((datos, index) => datos.Clase === 1 && index % 10 === 0)
      .map((datos) => datos.Fecha),
    datasets: [
      {
        label: "Curva S",
        data: dataFormateada
          .filter((datos, index) => datos.Clase === 1 && index % 10 === 0)
          .map((datos) => datos.CurvaS),
        borderColor: "#BE3A4A",
        backgroundColor: "#BE3A4A",
        datalabels: {
          anchor: "end",
          align: "start",
          offset: 8,
          font: {
            size: 12,
          },
        },
      },

      {
        label: "Meta Acumulada",
        data: dataFormateada
          .filter((datos, index) => datos.Clase === 1 && index % 10 === 0)
          .map((datos) => datos.meta_acumulada),
        borderColor: "#E28432",
        backgroundColor: "#E28432",
        datalabels: {
          anchor: "end",
          align: "top",
          offset: 8,
          font: {
            size: 12,
          },
        },
      },
    ],
  };
  let porcentajeAfisAcumuladas = 0;
  let porcentajeMetaAcumulada = 0;
  let diferenciaAfisAcumuladasSobreMetaAcumulada = 0;
  let porcentajeAfisAcumuladasSobreMetaAcumulada = 0;
  if (excelData.length > 0) {
    const afisAcumuladas = excelData.filter((dato) => dato.Clase === 0);
    const ultimoAfisAcumulado = afisAcumuladas[afisAcumuladas.length - 1];

    porcentajeAfisAcumuladas =
      Math.round((ultimoAfisAcumulado.afis_acumuladas / 9500) * 100 * 10) / 10;
    porcentajeMetaAcumulada =
      Math.round((ultimoAfisAcumulado.meta_acumulada / 9500) * 100 * 10) / 10;
    diferenciaAfisAcumuladasSobreMetaAcumulada =
      ultimoAfisAcumulado.afis_acumuladas - ultimoAfisAcumulado.meta_acumulada;

    porcentajeAfisAcumuladasSobreMetaAcumulada =
      diferenciaAfisAcumuladasSobreMetaAcumulada /
      ultimoAfisAcumulado.meta_acumulada;

    porcentajeAfisAcumuladasSobreMetaAcumulada = Math.round(
      porcentajeAfisAcumuladasSobreMetaAcumulada * 100
    );
  }
  const fechaOriginal = new Date(); // convierte el valor de Excel a una fecha
  const fechaFormateada = dayjs(fechaOriginal).format("DD-MM-YYYY");
  const generatePdf = () => {
    const input = document.querySelector(".contenedor-principal");
    console.log(input);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("landscape", "px", "legal");
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight() * 0
      );
      pdf.save(`curvaS ${fechaFormateada}.pdf`); // descarga el archivo PDF
    });
  };

  return (
    <>
      <div className="contenedor-principal2">
        <Grid container spacing={3}>
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
                  Las afiliaciones reales al dia de hoy corresponden a un{" "}
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
            <Line options={options} data={data} plugins={[ChartDataLabels]} />
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
            <Line options={options2} data={data2} plugins={[ChartDataLabels]} />
          </Grid>
        </Grid>
      </div>
      <div style={{ textAlign: "right", marginRight: "50px" }}>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "10px",
            marginTop: "20px",
          }}
        >
          <Typography style={{ color: "#BE3A4A", fontSize: "20px" }}>
            Descargar
          </Typography>
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginTop: "20px",
          }}
        >
          <DownloadIcon
            style={{ color: "#BE3A4A", fontSize: "35px", cursor: "pointer" }}
            onClick={generatePdf}
          />
        </div>
      </div>
    </>
  );
}

export default CurvaS;
