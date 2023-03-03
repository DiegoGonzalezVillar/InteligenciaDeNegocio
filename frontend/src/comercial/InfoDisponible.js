import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel
} from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 750,
        maxWidth: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    container: {
        maxHeight: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
});


function InfoDisponible(props) {
    const classes = useStyles();
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user]);
    
    const [orderBy, setOrderBy] = useState('Cantidad');
    const [order, setOrder] = useState('desc');
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);
    const [orderByCiudades, setOrderByCiudades] = React.useState('Cantidad');
    const [orderCiudades, setOrderCiudades] = React.useState('desc');

    //const url = 'http://localhost:4000/'
    const url = 'http://appcomercial.iafap.local:4000/'

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        infoD(orderBy, order);
    };

    const handleRequestSortCiudades = (property) => {
        const isAsc = orderByCiudades === property && orderCiudades === 'asc';
        setOrderByCiudades(property);
        setOrderCiudades(isAsc ? 'desc' : 'asc');
    };

    /*const infoD = async (orderBy, order) => {
        const res = await fetch(`${url}getInfoDisponible?orderBy=${orderBy}&order=${order}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        const data = await res.json();
        setinformacionDisponible(data);
    };*/

    const infoD = async () => {
        const res = await fetch(`${url}getInfoDisponible`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        const data = await res.json();
        setinformacionDisponible(data);
    };

    /*useEffect(() => {
        infoD(orderBy, order);
    }, [orderBy, order]);
*/
    useEffect(() => {
        infoD();
    },);



    const [informacionDisponible, setinformacionDisponible] = useState();

    // Obtenemos la lista de departamentos únicos para crear las opciones del filtro
    let departamentosUnicos = []
    if (!informacionDisponible) {
        return <div>Cargando...</div>;
    }
    else {
        departamentosUnicos = [...new Set(informacionDisponible.map(item => item.Departamento))];
    }

    return (
        <div>
            <Container>
                <nav className="navbar d-flex justify-content-center">
                    <h2 className="navbar-brand mx-auto text-center" style={{ color: "#B83E42" }}>Información Disponible</h2>
                </nav>
                <Box component="form" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}></Box>
                {/* Creamos la tabla */}
                <TableContainer className={classes.container} component={Paper} style={{ overflowX: 'auto', marginTop: '1em' }}>
                    <Table className={classes.table} aria-label="data grid">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Departamento
                                </TableCell>
                                <TableCell
                                    sortDirection={orderBy === 'Cantidad' ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === 'Cantidad'}
                                        direction={orderBy === 'Cantidad' ? order : 'asc'}
                                        onClick={event => handleRequestSort(event, 'Cantidad')}
                                    >
                                        Cantidad Total
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departamentosUnicos
                                .sort((a, b) => {
                                    const isAsc = order === "asc";
                                    const aCantidad = informacionDisponible.filter(item => item.Departamento === a)
                                        .reduce((total, item) => total + item.Cantidad, 0);
                                    const bCantidad = informacionDisponible.filter(item => item.Departamento === b)
                                        .reduce((total, item) => total + item.Cantidad, 0);
                                    return isAsc ? aCantidad - bCantidad : bCantidad - aCantidad;
                                })
                                .map((departamento) => {
                                    const informacionPorDepartamento = informacionDisponible.filter(
                                        (item) => item.Departamento === departamento
                                    );
                                    const cantidadTotal = informacionPorDepartamento.reduce(
                                        (total, item) => total + item.Cantidad,
                                        0
                                    );
                                    return (
                                        <React.Fragment key={departamento}>
                                            <TableRow>
                                                <TableCell>{departamento}</TableCell>
                                                <TableCell>{cantidadTotal}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        style={{ color: "#BE3A4A", marginRight: "10px" }}
                                                        onClick={() => {
                                                            if (departamentoSeleccionado === departamento) {
                                                                setDepartamentoSeleccionado(null);
                                                            } else {
                                                                setDepartamentoSeleccionado(departamento);
                                                            }
                                                        }}
                                                    >
                                                        {departamentoSeleccionado === departamento
                                                            ? "Cerrar Ciudades"
                                                            : "Ver Ciudades"}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            {departamentoSeleccionado === departamento && (
                                                <TableRow>
                                                    <TableCell colSpan={3}>
                                                        <TableContainer
                                                            component={Paper}
                                                            style={{ marginTop: "1em" }}
                                                        >
                                                            <Table className={classes.table} aria-label="ciudades">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Ciudad</TableCell>
                                                                        <TableCell
                                                                            sortDirection={orderByCiudades === 'Cantidad' ? orderCiudades : false}
                                                                        >
                                                                            <TableSortLabel
                                                                                active={orderByCiudades === 'Cantidad'}
                                                                                direction={orderByCiudades === 'Cantidad' ? orderCiudades : 'asc'}
                                                                                onClick={() => handleRequestSortCiudades('Cantidad')}
                                                                            >
                                                                                Cantidad
                                                                            </TableSortLabel>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {informacionPorDepartamento
                                                                        .sort((a, b) => {
                                                                            const isAsc = orderCiudades === "asc";
                                                                            const aCantidad = a.Cantidad;
                                                                            const bCantidad = b.Cantidad;
                                                                            return isAsc ? aCantidad - bCantidad : bCantidad - aCantidad;
                                                                        })
                                                                        .map((item) => (
                                                                            <TableRow key={item.Ciudad}>
                                                                                <TableCell component="th" scope="row">
                                                                                    {item.Ciudad}
                                                                                </TableCell>
                                                                                <TableCell>{item.Cantidad}</TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                                .sort((a, b) => {
                                    const isAsc = order === "asc";
                                    const aCantidad = a.props.children[1]?.props?.children;
                                    const bCantidad = b.props.children[1]?.props?.children;
                                    if (isAsc) {
                                        return aCantidad - bCantidad;
                                    } else {
                                        return bCantidad - aCantidad;
                                    }
                                })
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}
export default InfoDisponible 