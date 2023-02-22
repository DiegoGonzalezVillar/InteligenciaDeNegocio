import iafap from '../imagenes/iafap.png'
import iafap2 from '../imagenes/iafap2.jpg'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const useStyles = makeStyles({
    card: {
        width: '50%',
        height: '300%',
        margin: '10px',
    },
    media: {
        height: 450,
    },
    texto:{
        fontWeight: 'bold',
        fontSize: 20,
    }
});

const Consultas = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    let user = localStorage.getItem('isLoggedIn')

    console.log(user)
    useEffect(() => {
        if (!user) {
          navigate('/');
        }
      },);

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
    function datosEnLaApp(user) {
        window.location.href = `/datosaApp?user=${user}`;
    }

    return (

        <div style={{ display: 'flex', allowContent: 'center', alignItems: 'center' }}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={iafap}
                        title="Montevideo Sur"
                    />
                    <CardContent>
                        <Typography className={classes.texto}>
                            Montevideo Sur
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" style={{ color: '#BE3A4A'}}  onClick={() => montevideoSur(user)}>
                        ir a Montevideo Sur
                    </Button>
                </CardActions>
            </Card>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={iafap2}
                        title="Montevideo Periferia"
                    />
                    <CardContent>
                        <Typography className={classes.texto}>
                            Montevideo Periferia
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" style={{ color: '#BE3A4A'}} onClick={() => montevideoPeriferia(user)}>
                        Ir a Montevideo Periferia
                    </Button>
                </CardActions>
            </Card>

            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={iafap}
                        title="Interior AC"
                    />
                    <CardContent>
                        <Typography className={classes.texto}>
                            Interior AC
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" style={{ color: '#BE3A4A'}} onClick={() => InteriorAC(user)}>
                        Ir a Interior AC
                    </Button>
                </CardActions>
            </Card>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={iafap2}
                        title="Interior DR"
                    />
                    <CardContent>
                        <Typography className={classes.texto}>
                            Interior DR
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" style={{ color: '#BE3A4A'}} onClick={() => InteriorDR(user)}>
                        Ir a Interior DR
                    </Button>
                </CardActions>
            </Card>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={iafap}
                        title="Interior SZ"
                    />
                    <CardContent>
                        <Typography className={classes.texto}>
                            Interior SZ
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" style={{ color: '#BE3A4A'}} onClick={() => InteriorSZ(user)}>
                        Ir a Interior SZ
                    </Button>
                </CardActions>
            </Card>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={iafap2}
                        title="Datos cargados en la app"
                    />
                    <CardContent>
                        <Typography className={classes.texto}>
                            Datos App
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" style={{ color: '#BE3A4A'}} onClick={() => datosEnLaApp(user)}>
                        Ir a Datos App
                    </Button>
                </CardActions>
            </Card>
        </div>
    )

}

export default Consultas