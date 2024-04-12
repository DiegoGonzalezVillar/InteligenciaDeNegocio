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
import Titulo from "../componentes/Titulo";

const useStyles = makeStyles({
  card: {
    width: "50%",
    height: "300%",
    margin: "10px",
  },
  media: {
    height: 240,
  },
  texto: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#BE3A4A",
  },
});

const Tableros = () => {
  const classes = useStyles();

  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px",
  };

  /*function afisPorAsesor() {
    window.location.href = `/afisPorAsesor`;
  }*/

  function afisPorAsesorPorAnio() {
    window.location.href = `/afisPorAsesorPorAnio`;
  }

  function afisPorAsesorActualAnterior() {
    window.location.href = `/afisPorAsesorActualAnterior`;
  }

  function curvaS() {
    window.location.href = `/curvaS`;
  }

  function afisPorDepartamento() {
    window.location.href = `/afisPorDepartamento`;
  }
  function cantidadPorEdadYPorSexo() {
    window.location.href = `/cantidadPorEdadyPorSexo`;
  }
  function cantidadPorMail() {
    window.location.href = `/cantidadPorMail`;
  }

  function afisPorAfap() {
    window.location.href = `/afisPorAfap`;
  }

  return (
    <div className="content">
      <Titulo style={estilosTitulo} title="Integración en Cifras" />
      <div
        style={{
          display: "flex",
          allowContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {/*<Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Afiliaciones por Asesor"
              onClick={() => afisPorAsesor()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Afiliaciones por Asesor
              </Typography>
            </CardContent>
          </CardActionArea>
      </Card>*/}
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Afiliaciones por Asesor"
              onClick={() => afisPorAsesorPorAnio()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Afiliaciones por Asesor Por Año
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Afiliaciones Actual vs Anterior"
              onClick={() => afisPorAsesorActualAnterior()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Afiliaciones Año Actual vs Anterior
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Afiliaciones por Departamento"
              onClick={() => afisPorDepartamento()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Afiliaciones por Departamento
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Afiliaciones por Edad y Sexo"
              onClick={() => cantidadPorEdadYPorSexo()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Afiliaciones por Edad y Sexo
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Curva S"
              onClick={() => curvaS()}
            />
            <CardContent>
              <Typography className={classes.texto}>Curva S</Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap2}
              title="Cantidad por Mail"
              onClick={() => cantidadPorMail()}
            />
            <CardContent>
              <Typography className={classes.texto}>Mail por Asesor</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={iafap}
              title="Afiliaciones por Afap"
              onClick={() => afisPorAfap()}
            />
            <CardContent>
              <Typography className={classes.texto}>
                Afiliaciones por Afap
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default Tableros;
