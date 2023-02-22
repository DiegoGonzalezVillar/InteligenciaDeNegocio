import React from 'react';
import {Card,CardContent,Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

function TarjetaEncabezado(props) {

    const useStyles = makeStyles(()=>({
        texto: {
          fontSize: 18,
          color: props.font || '#000',
        },
        titulo: {
          fontWeight: 'bold',
          fontSize: 500,
          color: props.font || '#000',
        },
      }));
    
    const classes = useStyles()
    return (
        <Card>
            <CardContent>
                <Typography className={classes.titulo} >
                    {props.titulo}
                </Typography>
                <Typography className={classes.texto}>
                    {props.texto}
                </Typography>
            </CardContent>
            
        </Card>
    );
}

export default TarjetaEncabezado;