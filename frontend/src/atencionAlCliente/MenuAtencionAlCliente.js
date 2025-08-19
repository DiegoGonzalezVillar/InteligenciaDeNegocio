import React, { useState } from "react";
import Titulo from "../componentes/Titulo";
import { makeStyles } from "@material-ui/core/styles";
//import iafap from "../imagenes/isotipos.svg";
import { URL } from "../../src/comercial/Constantes";
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

  const generarArchivoDeSubCuentas = async () => {
    setOpen(false);
    setLoading(true);
    try {
      const response = await fetch(`${URL}generarArchivoDeSubCuentas`);
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
      <Titulo
        className={classes.textoTitulo}
        title="Menú Atención al Cliente"
      />
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
              image={iafap2}
              title="Cuentas por Afiliado"
              onClick={() => handleClickOpen()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Cuentas por Afiliado
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
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle className={classes.textoTitulo}>Confirmar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea crear el archivo de fondos por sub-cuentas?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} className={classes.texto}>
            Cancelar
          </Button>
          <Button
            onClick={generarArchivoDeSubCuentas}
            className={classes.texto}
          >
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
