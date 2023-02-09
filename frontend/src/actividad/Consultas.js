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

    function handleClick(user) {
        window.location.href = `/montevideoSur?user=${user}`;
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
                        <Typography gutterBottom variant="h5" component="h2">
                            Montevideo Sur
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary"  onClick={() => handleClick(user)}>
                        ir a Consultas de Montevideo Sur
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
                        <Typography gutterBottom variant="h5" component="h2">
                            Montevideo Periferia
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => handleClick(user)}>
                        Ir a Consultas de Montevideo Periferia
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
                        <Typography gutterBottom variant="h5" component="h2">
                            Interior AC
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => handleClick(user)}>
                        Ir a Consultas de Interior AC
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
                        <Typography gutterBottom variant="h5" component="h2">
                            Interior DR
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => handleClick(user)}>
                        Ir a Consultas de Interior DR
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
                        <Typography gutterBottom variant="h5" component="h2">
                            Interior SZ
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => handleClick(user)}>
                        Ir a Consultas de Interior SZ
                    </Button>
                </CardActions>
            </Card>
        </div>
    )

}

export default Consultas