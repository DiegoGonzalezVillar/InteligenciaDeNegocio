import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Grid } from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AfisPorDepartamento(props) {
    //const url = 'http://appcomercial.iafap.local:4000/'
    const url = 'http://localhost:4000/'

    const [cantidadDeAfiliados, setCantidadDeAfiliados] = useState("");

    useEffect(() => {
        fetch(`${url}getCantidadDeAfiliados`)
        .then(response => response.json())
            .then(data => {
                setCantidadDeAfiliados(data)
            })
            .catch(error => console.log(error));
    }, []);
    console.log(cantidadDeAfiliados)
    const [arrayAfiliacionesPorDepartamento, setarrayAfiliacionesPorDepartamento] = useState([]);
    
    const afiliacionesPorDepartamento = async () => {
        const res = await fetch(`${url}afisPorDepartamento`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        const data = await res.json();
        setarrayAfiliacionesPorDepartamento(data);

    };

    useEffect(() => {
        afiliacionesPorDepartamento();
    }, []);

    if (cantidadDeAfiliados.length===0) {
        return <div>
            <nav className="navbar d-flex justify-content-center" style={{marginTop: "100px"}}>
            <div sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress style={{ color: "#B83E42" }} />
            </div>
            </nav>
            
        </div>;
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Afiliaciones por Departamento',
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                formatter: (value) => {
                  return value;
                },
              }
            },
            scales: {
                x: {
                    ticks: {
                      align: 'end',
                      position: 'end',
                      padding: 5,
                    },
                  },
              y: {
                beginAtZero: true
              }
            }
    };

    const uniqueDepartamentos = [...new Set(arrayAfiliacionesPorDepartamento.map(dato => dato.departamento))];

    const dataByDepartamento = uniqueDepartamentos.map((departamento) => {
        const cantidades = arrayAfiliacionesPorDepartamento.filter((datos) => datos.departamento === departamento);
        return { 
          departamento,
          cantidadAnterior: cantidades.find((datos) => datos.año === new Date().getFullYear() - 1)?.cantidad || 0,
          cantidadActual: cantidades.find((datos) => datos.año === new Date().getFullYear())?.cantidad || 0,
        };
      });
    
      const data = {
        labels: dataByDepartamento.map((datos) => datos.departamento),
        datasets: [
          {
            label: `${new Date().getFullYear() - 1}`,
            data: dataByDepartamento
            .map((datos) => datos.cantidadAnterior),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: `${new Date().getFullYear()}`,
            data: dataByDepartamento
            .map((datos) => datos.cantidadActual),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    return (
        <div>
            <Grid container spacing={1} style={{ paddingLeft: '100px' }}>
                <Grid item xs={12} sm={12} md={11} lg={11} xl={11}>
                    <Bar options={options} data={data} plugins={[ChartDataLabels]} />
                </Grid>
            </Grid>
        </div>
    );
}

export default AfisPorDepartamento;