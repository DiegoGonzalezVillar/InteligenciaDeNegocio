import iafap from '../imagenes/iafap.png'
import iafap2 from '../imagenes/iafap2.jpg'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        width: '50%',
        height: '300%',
        margin: '10px',
    },
    media: {
        height: 450,
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#BE3A4A'
    }
});

const Tableros = () => {
    const classes = useStyles();

    function afisPorAsesor() {
        window.location.href = `/afisPorAsesor`;
    }

    function curvaS() {
        window.location.href = `/curvaS`;
    }

    function afisPorDepartamento() {
        window.location.href = `/afisPorDepartamento`;
    }

    return (
        <div>

            <nav className="navbar d-flex justify-content-center">
                <h1 className="navbar-brand mx-auto text-center" style={{ color: "#B83E42" }}>Integración en Cifras</h1>
            </nav>
            <div style={{ display: 'flex', allowContent: 'center', alignItems: 'center' }}>
                <Card className={classes.card}>
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
                </Card>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={iafap2}
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
                            image={iafap}
                            title="Curva S"
                            onClick={() => curvaS()}
                        />
                        <CardContent>
                            <Typography className={classes.texto}>
                                Curva S
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    )

}

export default Tableros