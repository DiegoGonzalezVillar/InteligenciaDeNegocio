import React from "react";
import Titulo from "../componentes/Titulo";
import { makeStyles } from "@material-ui/core/styles";
import iafap from "../imagenes/isotipos.svg";
import iafap2 from "../imagenes/isotipos2.svg";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    width: "10%",
    margin: "10px",
  },
  media: {
    height: 180,
    backgroundSize: "auto",
  },
  texto: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#BE3A4A",
    textAlign: "center",
  },
});
const MyComponent = () => {
  const classes = useStyles();

  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px", // Por ejemplo, aquí se define el margen superior
    // Puedes agregar más propiedades de estilo según sea necesario
  };

  function cuentasVst() {
    window.location.href = `/cuentasVst`;
  }

  function generarArchivoBpc() {
    window.location.href = `/generarArchivoBpc`;
  }

  return (
    <div className="content">
      <div className="contenedor-principal2">
        <Titulo style={estilosTitulo} title="Menú Prestaciones" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={iafap}
                title="Generar archivo Bpc"
                onClick={() => generarArchivoBpc()}
              />
              <CardContent>
                <Typography className={classes.texto}>
                  Generar Archivo Bpc
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={iafap2}
                title="Cuentas VST"
                onClick={() => cuentasVst()}
              />
              <CardContent>
                <Typography className={classes.texto}>Cuentas VST</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
