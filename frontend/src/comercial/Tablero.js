import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Table, TableHead, TableBody, TableRow, TableCell,TableContainer,Paper  } from '@material-ui/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const useStyles = makeStyles(() => ({
    tarjeta: {
        background: "#BE3A4A",
        margin: '20px 20px 20px 20px'
    },
    texto: {
        fontSize: 20,
        color: "white",
        textAlign: 'center'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 25,
        color: "white",
        textAlign: 'center'
    },
}));

function Tablero(props) {
    const classes = useStyles()
    const fecha = new Date()
    const añoActual = fecha.getFullYear();
    const añoAnterior = fecha.getFullYear() - 1;
    const [total, setTotal] = useState('')
    const [totalAnterior, setTotalAnterior] = useState('')
    const [arrayAfisPorAsesor, setArrayAfisPorAsesor] = useState([])
    const url = 'http://appcomercial.iafap.local:4000/'
    //const url = 'http://localhost:4000/'
    const afisAñoActual = async () => {
        const res = await fetch(`${url}afisPorAsesor`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        const data = await res.json();
        setArrayAfisPorAsesor(data);
    };
    const totalAñoActual = async () => {
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
    const totalAñoAnterior = async () => {
        try {
            const res = await fetch(`${url}totalAfiliadosAnterior`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            const data = await res.json();
            setTotalAnterior(data[0].Cantidad);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        afisAñoActual();
        totalAñoActual();
        totalAñoAnterior();
    }, []);

    let porcentaje = Math.round((total - totalAnterior)/ totalAnterior * 100);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Afiliaciones por asesor',
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                formatter: (value, context) => {
                  return value;
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
    };

    const data = {
        labels: arrayAfisPorAsesor.map((datos) => datos.asesor),
        datasets: [
            {
                label: 'Cantidad',
                data: arrayAfisPorAsesor.map((datos) => datos.cantidad),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Card className={classes.tarjeta}>
                        <CardContent>
                            <Typography className={classes.titulo} >
                                Total Afiliaciones año {añoActual}:
                            </Typography>
                            <Typography className={classes.texto}>
                                {total}
                            </Typography>
                        </CardContent>

                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Card className={classes.tarjeta}>
                        <CardContent>
                            <Typography className={classes.titulo} >
                                Total Afiliaciones año {añoAnterior}:
                            </Typography>
                            <Typography className={classes.texto}>
                                {totalAnterior}
                            </Typography>
                        </CardContent>

                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Card className={classes.tarjeta}>
                        <CardContent>
                            <Typography className={classes.titulo} >
                                Diferencia en % Actual vs Anterior:
                            </Typography>
                            <Typography className={classes.texto}>
                                {porcentaje}%
                            </Typography>
                        </CardContent>

                    </Card>
                </Grid>

            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                    <Bar options={options} data={data} plugins={[ChartDataLabels]} />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <TableContainer component={Paper} style={{ height: 631, width: '80%' }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Asesor</TableCell>
                                <TableCell>Cantidad</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arrayAfisPorAsesor.map((row) => (
                                <TableRow key={row.asesor}>
                                    <TableCell>{row.asesor}</TableCell>
                                    <TableCell>{row.cantidad}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

export default Tablero;