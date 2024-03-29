import React, { useState } from "react";
import Titulo from "../componentes/Titulo";
import { URL } from "../../src/comercial/Constantes";
import { makeStyles } from "@material-ui/core/styles";
import iafap from "../imagenes/isotipos2.svg";
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
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px", // Por ejemplo, aquí se define el margen superior
    // Puedes agregar más propiedades de estilo según sea necesario
  };

  const consulta30008 = async () => {
    setMessage("");
    setLoading(true); // Establecer el estado de carga en true antes de la solicitud

    try {
      const response = await fetch(`${URL}ejecutarLimites30008`);
      const data = await response.text();
      let mensaje = JSON.parse(data).message;
      setMessage(mensaje); // Actualiza el estado con el mensaje de respuesta del servidor
    } catch (error) {
      console.error("Error al ejecutar el archivo .bat:", error);
      setMessage("Error al ejecutar el archivo .bat");
    } finally {
      setLoading(false); // Establecer el estado de carga en false después de la solicitud (éxito o error)
    }
  };

  const consulta30006 = async () => {
    setMessage("");
    setLoading(true); // Establecer el estado de carga en true antes de la solicitud

    try {
      const response = await fetch(`${URL}ejecutarLimites30006`); // Llama al endpoint /ejecutar-bat en el servidor
      const data = await response.text();
      let mensaje = JSON.parse(data).message;
      setMessage(mensaje); // Actualiza el estado con el mensaje de respuesta del servidor
    } catch (error) {
      console.error("Error al ejecutar el archivo .bat:", error);
      setMessage("Error al ejecutar el archivo .bat");
    } finally {
      setLoading(false); // Establecer el estado de carga en false después de la solicitud (éxito o error)
    }
  };

  return (
    <div className="content">
      <div className="contenedor-principal2">
        <Titulo style={estilosTitulo} title="Limites" />
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
                title="Consulta 30006"
                onClick={() => consulta30006()}
              />
              <CardContent>
                <Typography className={classes.texto}>
                  Consulta 30006
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={iafap}
                title="Consulta 30008"
                onClick={() => consulta30008()}
              />
              <CardContent>
                <Typography className={classes.texto}>
                  Consulta 30008
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2em",
          }}
        >
          {loading && <p>Cargando...</p>}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              color: "#BE3A4A",
              marginTop: "5em",
            }}
          >
            {message}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
