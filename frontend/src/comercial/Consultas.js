import iafap from "../imagenes/iafap.png";
import iafap2 from "../imagenes/iafap2.jpg";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Titulo from "../componentes/Titulo";

const useStyles = makeStyles({
  card: {
    width: "50%",
    height: "300%",
    margin: "10px",
  },
  media: {
    height: 450,
  },
  texto: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#BE3A4A",
  },
});

const Consultas = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  let user = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  function montevideoSur(user) {
    window.location.href = `/montevideoSur?user=${user}`;
  }

  function montevideoPeriferia(user) {
    window.location.href = `/montevideoPeriferia?user=${user}`;
  }

  function InteriorAC(user) {
    window.location.href = `/InteriorAC?user=${user}`;
  }

  function InteriorDR(user) {
    window.location.href = `/InteriorDR?user=${user}`;
  }

  function InteriorSZ(user) {
    window.location.href = `/InteriorSZ?user=${user}`;
  }
  function consultarDatosApp(user) {
    window.location.href = `/consultarDatosaApp?user=${user}`;
  }
  function infoDisponible(user) {
    window.location.href = `/getInfoDisponible?user=${user}`;
  }

  function datosEnLaApp(user) {
    window.location.href = `/getDatosaApp?user=${user}`;
  }

  return (
    <div className="content">
      <Titulo title="Inteligencia de Negocio" />
      <div
        style={{
          display: "flex",
          allowContent: "center",
          alignItems: "center",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          allowContent: "center",
          alignItems: "center",
        }}
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Montevideo Sur"
              onClick={() => montevideoSur(user)}
            />
            <CardContent>
              <Typography className={classes.texto}>Montevideo Sur</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Montevideo Periferia"
              onClick={() => montevideoPeriferia(user)}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Montevideo Periferia
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Interior AC"
              onClick={() => InteriorAC(user)}
            />
            <CardContent>
              <Typography className={classes.texto}>Interior AC</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Interior DR"
              onClick={() => InteriorDR(user)}
            />
            <CardContent>
              <Typography className={classes.texto}>Interior DR</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Interior SZ"
              onClick={() => InteriorSZ(user)}
            />
            <CardContent>
              <Typography className={classes.texto}>Interior SZ</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Consultar datos de la app"
              onClick={() => consultarDatosApp(user)}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Consultar datos de la App
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Informacion Disponible"
              onClick={() => infoDisponible(user)}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Información Disponible
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Datos de la app"
              onClick={() => datosEnLaApp(user)}
            />
            <CardContent>
              <Typography className={classes.texto}>Datos App</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default Consultas;
