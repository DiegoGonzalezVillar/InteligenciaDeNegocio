import Titulo from "../componentes/Titulo";
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

const comercial = () => {
  window.location.href = `/tableros`;
};
const prestaciones = () => {
  window.location.href = `/tramitesPrestaciones`;
};

const MyComponent = () => {
  const classes = useStyles();

  return (
    <div className="content">
      <div className="contenedor-principal2">
        <Titulo title="Menú" />
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
                title="Comercial"
                onClick={() => comercial()}
              />
              <CardContent>
                <Typography className={classes.texto}>Comercial</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={iafap}
                title="Prestaciones"
                onClick={() => prestaciones()}
              />
              <CardContent>
                <Typography className={classes.texto}>Prestaciones</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
