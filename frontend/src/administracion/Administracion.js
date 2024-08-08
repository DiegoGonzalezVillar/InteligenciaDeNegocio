import React, { useState } from "react";
import Titulo from "../componentes/Titulo";
import { URL } from "../../src/comercial/Constantes";
import { makeStyles } from "@material-ui/core/styles";
import iafap from "../imagenes/isotipos3.svg";
import iafap2 from "../imagenes/isotipos2.svg";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles({
  card: {
    width: "10%",
    margin: "10px",
  },
  media: {
    height: 200,
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
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px", // Por ejemplo, aquí se define el margen superior
    // Puedes agregar más propiedades de estilo según sea necesario
  };

  function generacionTxt() {
    window.location.href = `/generacionTxt`;
  }

  function letraRM() {
    window.location.href = `/letrasRM`;
  }

  function valoresRentaBruta() {
    window.location.href = `/valoresRentaBruta`;
  }

  const informeDirectorio = async () => {
    setLoading(true); // Establecer el estado de carga en true antes de la solicitud

    try {
      const response = await fetch(`${URL}informeDirectorio`);
      const data = await response.text();
      let mensaje = JSON.parse(data).message;
      setOpenSnackbar(true);
      setResponseMessage(mensaje);
    } catch (error) {
      setOpenSnackbar(true);
      setResponseMessage(error);
    } finally {
      setLoading(false); // Establecer el estado de carga en false después de la solicitud (éxito o error)
    }
  };

  const creacionTableroDeControl = async () => {
    setLoading(true); // Establecer el estado de carga en true antes de la solicitud

    try {
      const response = await fetch(`${URL}creacionTableroDeControl`);
      console.log("llego aca");
      const data = await response.text();
      let mensaje = JSON.parse(data).message;
      setOpenSnackbar(true);
      setResponseMessage(mensaje);
    } catch (error) {
      setOpenSnackbar(true);
      setResponseMessage(error);
    } finally {
      setLoading(false); // Establecer el estado de carga en false después de la solicitud (éxito o error)
    }
  };

  return (
    <div className="contenedor-principal2">
      <Titulo style={estilosTitulo} title="Menú Administración" />
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
              title="Generacion Txt"
              onClick={() => generacionTxt()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Generacion de Txt
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Lestras de Regulacion Monetaria"
              onClick={() => letraRM()}
            />
            <CardContent>
              <Typography className={classes.texto}>Letras de RM</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Informe Directorio"
              onClick={() => informeDirectorio()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Informe Directorio
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Valores Renta Bruta"
              onClick={() => valoresRentaBruta()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Valores Renta Bruta
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Creacion tablero de control"
              onClick={() => creacionTableroDeControl()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Tablero de control
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
        {loading && (
          <>
            <p>Cargando...</p>
            <p>Puede demorar varios segundos!</p>
          </>
        )}
      </div>
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={responseMessage}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

export default MyComponent;
