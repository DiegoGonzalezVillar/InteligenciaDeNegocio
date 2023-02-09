import React, { useState } from 'react';
import { Grid, makeStyles, Typography, Card, CardMedia } from '@material-ui/core';
import iafap from './imagenes/iafap.png'
import iafap2 from './imagenes/iafap2.jpg'
//import BarChart from './Grafico.js';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
    display: 'flex',
    minHeight: 'auto',
    flexWrap: 'wrap',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    '& > *': {
    margin: theme.spacing(2),
    width: theme.spacing(16),
    height: theme.spacing(16),
    position: 'relative',
    
    },
    },
    media: {
    height: '100%',
    width: '100%',
    paddingTop: '70%',
    
    },
    grilla:{margin: theme.spacing(0),
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'calibri',
        fontSize: '40px',
        color : '#BE3A4A',
        margin: theme.spacing(0),
        width: '100%',
        minHeight: 'auto',
      },
      text2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'calibri',
        fontSize: '25px',
        color : '#BE3A4A',
        textAlign: 'justify',
        marginRight: theme.spacing(5)
      },
      total:{
        color : '#000000'
      },
    container: {
        marginTop: theme.spacing(2),
    }
    }));

const Principal = () => {
const classes = useStyles();
//const url = 'http://appcomercial.iafap.local:4000/'
const url = 'http://localhost:4000/'
const [total , setTotal] = useState('')
const fecha = new Date()
const añoActual = fecha.getFullYear();
let porcentaje = Math.round(total / 8500 * 100);

let texto = "Inteligencia de Negocio"
let texto2 = <p>En esta web encontraran informacion relevante a la gestión y resultados del equipo comercial.</p>
let texto3 = <p>Para este año la Gerencia Comercial estableció como <strong> meta anual</strong> la cantidad de <strong>8.500</strong> afiliaciones, el equipo dispone de <strong>18 asesores previsionales y 1 supervisor.</strong></p>
let texto4 = <p>En lo que va del {añoActual}, contamos con un total de <strong>{total}</strong> afiliados, representando el <strong>{porcentaje}%</strong> de la meta antes mencionada.</p>
let texto5 = <p>En caso de requerir información adicional, la misma puede ser solicitada al siguiente correo electrónico <strong>comercial@integracionafap.com.uy</strong>.</p>
let combinedText = (
  <>
    <Typography variant="body1" className={classes.text}>{texto}</Typography>
    <Typography variant="body1" className={classes.text2}>{texto2}</Typography>
    <Typography variant="body1" className={classes.text2}>{texto3}</Typography>
    <Typography variant="body1" className={classes.text2}>{texto4}</Typography>
    <Typography variant="body1" className={classes.text2}>{texto5}</Typography>
  </>
);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`${url}totalAfiliados`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      const data = await res.json();
      setTotal(data[0].Cantidad);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, []);


return (
<Grid container spacing={3} className={classes.container}>
<Grid item xs={6}>
<Card className={classes.root}>
<CardMedia
         className={classes.media}
         image= {iafap}
         title="Imagen 1"
       />
</Card>
</Grid>
<Grid  className={classes.grilla} item xs={6}>
  {combinedText}
</Grid>
<Grid item xs={6}>
<Card className={classes.root}>
<CardMedia
         className={classes.media}
         image= {iafap2}
         title="Imagen 2"
       />
</Card>
</Grid>
<Grid item xs={6}>

</Grid>
</Grid>
);
};

export default Principal;