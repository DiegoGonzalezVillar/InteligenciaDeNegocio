import iafap from "../imagenes/iafap.png";
import iafap2 from "../imagenes/iafap2.jpg";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import Titulo from "../componentes/Titulo";

const useStyles = makeStyles({
  card: {
    width: "95%",
    height: "95%",
    margin: "5px",
  },
  media: {
    height: 280,
  },
  texto: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#BE3A4A",
  },
});

const Tableros = () => {
  const classes = useStyles();

  const todasAfisPorAsesor = () => {
    window.location.href = `/todasAfisPorAsesor`;
  };

  const detalleOficios = () => {
    window.location.href = `/detalleOficios`;
  };

  const curvaSPorFecha = () => {
    window.location.href = `/curvaSPorFecha`;
  };

  const afisPorDepartamento = () => {
    window.location.href = `/afisPorDepartamento`;
  };

  const oficiosPorUsuario = () => {
    window.location.href = `/oficiosPorUsuario`;
  };

  /*)
  const cantidadPorEdadYPorSexo = () => {
    window.location.href = `/cantidadPorEdadyPorSexo`;
  };*/

  const curvaS16713 = () => {
    window.location.href = `/curvaS16713`;
  };
  /*
  const cantidadPorMail = () => {
    window.location.href = `/cantidadPorMail`;
  };
*/
  return (
    <div className="contenedor-principal2">
      <Titulo title="Integración en Cifras" />
      <Grid container>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <CardActionArea>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={iafap2}
                title="Todas Las Afiliaciones"
                onClick={() => todasAfisPorAsesor()}
              />
              <CardContent>
                <Typography className={classes.texto}>
                  Todas Las Afiliaciones
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <CardActionArea>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={iafap}
                title="Detalle Oficios"
                onClick={() => detalleOficios()}
              />
              <CardContent>
                <Typography className={classes.texto}>
                  Detalle Oficios
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <CardActionArea>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={iafap2}
                title="Afiliaciones por Departamento"
                onClick={() => afisPorDepartamento()}
              />
              <CardContent>
                <Typography className={classes.texto}>
                  Afis por departamento
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <CardActionArea>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={iafap}
                title="Detalle oficios por usuario"
                onClick={() => oficiosPorUsuario()}
              />
              <CardContent>
                <Typography className={classes.texto}>
                  Detalle oficios por usuario
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <CardActionArea>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={iafap2}
                title="Curva S Por Fecha"
                onClick={() => curvaSPorFecha()}
              />
              <CardContent>
                <Typography className={classes.texto}>
                  Curva S Por Fecha
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <CardActionArea>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={iafap}
                title="Curva S 16713"
                onClick={() => curvaS16713()}
              />
              <CardContent>
                <Typography className={classes.texto}>Curva S 16713</Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      </Grid>
    </div>
  );
};

export default Tableros;
