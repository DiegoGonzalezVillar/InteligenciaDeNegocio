import React, { useEffect, useState } from "react";
import Titulo from "../componentes/Titulo";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DetalleTablaAnr from "./DetalleTablaAnr";
import { URL } from "../comercial/Constantes.js";

const useStyles = makeStyles(() => ({
  tarjeta: {
    background: "#E28432",
    margin: "20px 20px 20px 20px",
  },
  texto: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
}));

const PagosBpc = () => {
  const classes = useStyles();
  const [cantidadPendientes, setCantidadPendientes] = useState(0);
  const [tablaDetalle, setTablaDetalle] = useState([]);
  const [totalFondoRetiro, setTotalFondoRetiro] = useState(0);
  const [totalFondoAcumulacion, setTotalFondoAcumulacion] = useState(0);
  const [totalFondoCrecimiento, setTotalFondoCrecimiento] = useState(0);
  const [totalFondoVoluntario, setTotalFondoVoluntario] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const fetchDetallePagosBpc = async () => {
    setIsLoading(true); // Iniciar la carga
    try {
      const res = await fetch(`${URL}detallePagosAnr`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      let data = await res.json();
      console.log(data);
      if (typeof data === "string") {
        try {
          data = JSON.parse(data); // Convertir string a objeto JSON
        } catch (error) {
          console.error("Error al convertir string a JSON:", error);
          setIsLoading(false); // Terminar la carga aunque haya error
          return;
        }
      }
      // Procesamiento de los datos
      setCantidadPendientes(data.resumen.total);
      setTablaDetalle(data.detalle);
      setTotalFondoAcumulacion(data.resumen.acumulacion);
      setTotalFondoRetiro(data.resumen.retiro);
      setTotalFondoCrecimiento(data.resumen.crecimiento);
      setTotalFondoVoluntario(data.resumen.voluntario);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Finalizar la carga después de obtener los datos o en caso de error
    }
  };

  useEffect(() => {
    fetchDetallePagosBpc();
  }, []);

  return (
    <div className="content">
      <div className="contenedor-principal2">
        <Titulo title="Resumen ANR" />
        {isLoading ? (
          <Grid container style={{ marginTop: "50px" }}>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}></Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <Card className={classes.tarjeta}>
                <CardContent>
                  <Typography className={classes.titulo}>
                    Cargando...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}></Grid>
          </Grid>
        ) : (
          // Un spinner o un texto de carga
          <Grid container style={{ marginTop: "50px" }}>
            <Grid item xs={12} sm={4} md={4} lg={1} xl={1}></Grid>
            <Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
              <Card className={classes.tarjeta}>
                <CardContent>
                  <Typography className={classes.titulo}>
                    Pagos pendientes:
                  </Typography>
                  <Typography className={classes.texto}>
                    {cantidadPendientes}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
              <Card className={classes.tarjeta}>
                <CardContent>
                  <Typography className={classes.titulo}>
                    Total fondo retiro:
                  </Typography>
                  <Typography className={classes.texto}>
                    $ {totalFondoRetiro.toLocaleString("es-ES")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
              <Card className={classes.tarjeta}>
                <CardContent>
                  <Typography className={classes.titulo}>
                    Total fondo acumulacion:
                  </Typography>
                  <Typography className={classes.texto}>
                    $ {totalFondoAcumulacion.toLocaleString("es-ES")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
              <Card className={classes.tarjeta}>
                <CardContent>
                  <Typography className={classes.titulo}>
                    Total fondo crecimiento:
                  </Typography>
                  <Typography className={classes.texto}>
                    $ {totalFondoCrecimiento.toLocaleString("es-ES")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
              <Card className={classes.tarjeta}>
                <CardContent>
                  <Typography className={classes.titulo}>
                    Total fondo voluntario:
                  </Typography>
                  <Typography className={classes.texto}>
                    $ {totalFondoVoluntario.toLocaleString("es-ES")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid container style={{ marginTop: "50px" }}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}></Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Titulo title="Detalle" />
                <DetalleTablaAnr detalle={tablaDetalle} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default PagosBpc;
