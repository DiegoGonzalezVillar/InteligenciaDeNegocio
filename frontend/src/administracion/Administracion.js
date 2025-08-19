import React, { useState } from "react";
import Titulo from "../componentes/Titulo";
import { URL } from "../../src/comercial/Constantes";
import { makeStyles } from "@material-ui/core/styles";
import iafap from "../imagenes/isotipos3.svg";
import iafap2 from "../imagenes/isotipos2.svg";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles({
  card: {
    width: "10%",
    margin: "10px",
  },
  media: {
    height: 180,
    margin: "5px",
  },
  texto: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#BE3A4A",
    textAlign: "center",
  },
  textoTitulo: {
    color: "#BE3A4A",
    marginTop: "15px",
  },
});
const MyComponent = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
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

  function generacionTxtBpc() {
    window.location.href = `/generacionTxtBpc`;
  }

  const informeDirectorio = async () => {
    setLoading(true);

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
    setLoading(true);
    setOpen(false);
    try {
      const response = await fetch(`${URL}creacionTableroDeControl`);
      const data = await response.text();
      let mensaje = JSON.parse(data).message;
      setOpenSnackbar(true);
      setResponseMessage(mensaje);
    } catch (error) {
      setOpenSnackbar(true);
      setResponseMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contenedor-principal2">
      <Titulo className={classes.textoTitulo} title="Menú Administración" />
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
              onClick={() => handleClickOpen()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Tablero de control
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Txt Bpc"
              onClick={() => generacionTxtBpc()}
            />
            <CardContent>
              <Typography className={classes.texto}>Txt Bpc</Typography>
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
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle className={classes.textoTitulo}>Confirmar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea crear el tablero de control?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} className={classes.texto}>
            Cancelar
          </Button>
          <Button onClick={creacionTableroDeControl} className={classes.texto}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
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
