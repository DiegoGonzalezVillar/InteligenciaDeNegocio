import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import Medidor from "../componentes/Medidor";

dayjs.extend(isSameOrBefore);

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
    tarjeta: {
        background: "rgba(53, 162, 235, 0.5)",
        margin: '20px 20px 20px 20px'
    },
    texto: {
        fontSize: 15,
        color: "black",
        textAlign: 'center'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 25,
        color: "black",
        textAlign: 'center'
    },
    gridItem: {
        marginTop: theme.spacing(2)
      },
}));

function CurvaS() {
    const classes = useStyles()
    const [excelData, setExcelData] = useState([]);
    const url = 'http://appcomercial.iafap.local:4000/'
    //const url = 'http://localhost:4000/'

    useEffect(() => {
        fetch(`${url}curvaS`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setExcelData(data)
            })
            .catch(error => console.log(error));
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Comparacion de Afiliaciones reales vs Afiliaciones esperadas',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const options2 = {

        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Comparacion de curva s vs Afiliaciones esperadas',
            },
        }
    };
    const dataFormateada = excelData.map((datos) => {
        const fechaOriginal = new Date((datos.Fecha - 25569) * 86400 * 1000); // convierte el valor de Excel a una fecha
        const fechaFormateada = dayjs(fechaOriginal).format('DD/MM/YYYY'); // formatea la fecha
        return { ...datos, Fecha: fechaFormateada }; // devuelve un objeto con la fecha formateada
    });

    const data = {
        labels: dataFormateada
            .filter((datos, index) => datos.Clase === 0 && index % 2 === 0)
            .map((datos) => datos.Fecha),
        datasets: [
            {
                label: 'Afiliaciones reales',
                data: dataFormateada
                    .filter((datos, index) => datos.Clase === 0 && index % 2 === 0)
                    .map((datos) => datos.afis_acumuladas),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    offset: 8,
                }
            },

            {
                label: 'Meta Acumulada',
                data: dataFormateada
                    .filter((datos, index) => datos.Clase === 0 && index % 2 === 0)
                    .map((datos) => datos.meta_acumulada),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                datalabels: {
                    anchor: 'end',
                    align: 'bottom',
                    offset: 8,
                }
            },
        ],
    };

    const data2 = {
        labels: dataFormateada
            .filter((datos, index) => datos.Clase === 1 && index % 10 === 0)
            .map((datos) => datos.Fecha),
        datasets: [
            {
                label: 'Curva S',
                data: dataFormateada
                    .filter((datos, index) => datos.Clase === 1 && index % 10 === 0)
                    .map((datos) => datos.CurvaS),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    offset: 8,
                }
            },

            {
                label: 'Meta Acumulada',
                data: dataFormateada
                    .filter((datos, index) => datos.Clase === 1 && index % 10 === 0)
                    .map((datos) => datos.meta_acumulada),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                datalabels: {
                    anchor: 'end',
                    align: 'bottom',
                    offset: 8,
                }
            },
        ],
    };
    let porcentajeAfisAcumuladas = 0
    let porcentajeMetaAcumulada = 0
    let porcentajeAfisAcumuladasSobreMetaAcumulada = 0
    if (excelData.length > 0) {
        const afisAcumuladas = excelData.filter((dato) => dato.Clase === 0) // Filtrar objetos que tienen Clase igual a 1
        const ultimoAfisAcumulado = afisAcumuladas[afisAcumuladas.length - 1];

        porcentajeAfisAcumuladas = Math.round(ultimoAfisAcumulado.afis_acumuladas / 8500 * 100 * 10) / 10
        porcentajeMetaAcumulada = Math.round(ultimoAfisAcumulado.meta_acumulada / 8500 * 100 * 10) / 10;
        porcentajeAfisAcumuladasSobreMetaAcumulada = Math.round(ultimoAfisAcumulado.afis_acumuladas / ultimoAfisAcumulado.meta_acumulada * 10) / 10;
    }



    return (

        <div>
            <Grid container spacing={3}>

                <Grid className={classes.gridItem} item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Typography className={classes.texto} >
                        Porcentaje de afiliaciones reales sobre la meta anual
                    </Typography>
                    <Medidor value={porcentajeAfisAcumuladas} min={0} max={100} />
                </Grid>
                <Grid className={classes.gridItem} item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Typography className={classes.texto} >
                        Porcentaje de afiliaciones esperadas sobre la meta anual
                    </Typography>
                    <Medidor value={porcentajeMetaAcumulada} min={0} max={100} />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Card className={classes.tarjeta}>
                        <CardContent>
                            <Typography className={classes.texto}>
                                Las afiliaciones reales al dia de hoy corresponden a un {porcentajeAfisAcumuladasSobreMetaAcumulada}% de las afiliaciones esperadas
                            </Typography>
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid className={classes.gridItem} item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Line options={options} data={data} plugins={[ChartDataLabels]} />
                </Grid>
                <Grid className={classes.gridItem} item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Line options={options2} data={data2} plugins={[ChartDataLabels]} />
                </Grid>
            </Grid>

        </div>
    );
}

export default CurvaS;