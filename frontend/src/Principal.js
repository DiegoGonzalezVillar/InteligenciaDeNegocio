import React, { useState } from "react";
import { makeStyles, Card, CardMedia } from "@material-ui/core";
import iafap from "./imagenes/IafapPrincipal.svg";
import { useEffect } from "react";
import { URL } from "../src/comercial/Constantes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  media: {
    position: "relative",
    width: "100%",
    paddingBottom: "75%",
    "&::before": {
      content: '""',
      display: "block",
      paddingTop: "75%",
    },
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "56.25%",
      "&::before": {
        paddingTop: "56.25%",
      },
    },
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "100%",
      "&::before": {
        paddingTop: "100%",
      },
    },
  },

  text: {
    //centrar
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //
    fontFamily: "calibri",
    fontSize: "300%",
    color: "#BE3A4A",
  },
  text2: {
    //centrar
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //
    fontFamily: "calibri",
    fontSize: "200%",
    color: "#BE3A4A",
    textAlign: "justify",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(3),
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

const Principal = () => {
  const classes = useStyles();
  const [total, setTotal] = useState("");
  const fecha = new Date();
  const añoActual = fecha.getFullYear();
  const meta = 9600;
  let porcentaje = Math.round((total / meta) * 100);

  let texto = "Inteligencia de Negocio";
  let texto2 = (
    <p>
      En esta web encontrarán informacion relevante a la gestión y resultados
      del equipo comercial.
    </p>
  );
  let texto3 = (
    <p>
      Para este año la Gerencia Comercial estableció como{" "}
      <strong> meta anual</strong> la cantidad de{" "}
      <strong>{meta.toLocaleString("es-ES")}</strong> afiliaciones, el equipo
      dispone de <strong>18 asesores previsionales y 1 supervisor.</strong>
    </p>
  );
  let texto4 = (
    <p>
      En lo que va del {añoActual}, contamos con un total de{" "}
      <strong>{total}</strong> afiliados, representando el{" "}
      <strong>{porcentaje}%</strong> de la meta antes mencionada.
    </p>
  );
  let texto5 = (
    <p>
      En caso de requerir información adicional, la misma puede ser solicitada
      al siguiente correo electrónico{" "}
      <strong>comercial@integracionafap.com.uy</strong>.
    </p>
  );
  let combinedText = (
    <div>
      <div className={classes.text}>{texto}</div>
      <div className={classes.text2}>{texto2}</div>
      <div className={classes.text2}>{texto3}</div>
      <div className={classes.text2}>{texto4}</div>
      <div className={classes.text2}>{texto5}</div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${URL}totalAfiliados`, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        const data = await res.json();
        setTotal(data[0].Cantidad);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-[calc(100vh-150px)] mt-[75px] bg-[rgba(230,230,230,0.247)]">
      <div className="grid grid-cols-2 h-[calc(100vh-150px)]">
        <div className="h-[calc(100vh-150px)] mt-[30px]">
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Imagen 1"
            />
          </Card>
        </div>
        <div className="h-full">{combinedText}</div>
      </div>
    </div>
  );
};

export default Principal;
