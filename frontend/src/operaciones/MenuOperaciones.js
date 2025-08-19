import { React, useState } from "react";
import Titulo from "../componentes/Titulo";
import { makeStyles } from "@material-ui/core/styles";
import { URL } from "../../src/comercial/Constantes";
import iafap from "../imagenes/isotipos.svg";
import iafap2 from "../imagenes/isotipos2.svg";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
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
  textoTitulo: {
    color: "#BE3A4A",
    marginTop: "15px",
  },
});
const MenuOperaciones = () => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  function detallePagosBpc() {
    window.location.href = `/detallePagosBpc`;
  }
  function encontrarFoto() {
    window.location.href = `/encontrarFoto`;
  }

  function detallePagosAnr() {
    window.location.href = `/detallePagosAnr`;
  }

  const realizarPagosBpc = async () => {
    setLoading(true);
    setOpen(false);
    try {
      const response = await fetch(`${URL}realizarPagosBpc`);
      const data = await response.text();
      let mensaje = JSON.parse(data);
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
      <Titulo className={classes.textoTitulo} title="Menú Operaciones" />
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
              title="Encontrar foto"
              onClick={() => encontrarFoto()}
            />
            <CardContent>
              <Typography className={classes.texto}>Encontrar Foto</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Detalle Bpc"
              onClick={() => detallePagosBpc()}
            />
            <CardContent>
              <Typography className={classes.texto}>Detalle Bpc</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Pagar Bpc"
              onClick={() => handleClickOpen()}
            />
            <CardContent>
              <Typography className={classes.texto}>Pagar Bpc</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Detalle ANR"
              onClick={() => detallePagosAnr()}
            />
            <CardContent>
              <Typography className={classes.texto}>Detalle ANR</Typography>
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
            <p>Puede demorar varios minutos!</p>
          </>
        )}
      </div>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle className={classes.textoTitulo}>Confirmar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea pagar las bpc?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} className={classes.texto}>
            Cancelar
          </Button>
          <Button onClick={realizarPagosBpc} className={classes.texto}>
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

export default MenuOperaciones;
