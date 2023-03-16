import React, { useState } from 'react';
import { Grid } from '@material-ui/core'
import { TableBody, TableRow, TableCell, TableContainer, Paper } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import { Button } from '@mui/material'
import Snackbar from '@material-ui/core/Snackbar'

function Simulador() {
    const url = 'http://localhost:4000/'
    const [datosProyeccion, setDatosProyeccion] = useState([]);
    const [sueldo, setSueldo] = useState('');
    const [actividad, setActividad] = useState('');
    const [art8, setArt8] = useState('');
    const [edad, setEdad] = useState('');
    const [añosActividad, setAñosActividad] = useState('');
    const [genero, setGenero] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setDatosProyeccion('')
        const formData = {
            sueldo: sueldo,
            actividad: actividad,
            art8: art8,
            edad: edad,
            añosActividad: añosActividad,
            genero: genero
        };
        if (sueldo === '' || actividad === '' || art8 === '' || edad === '' || añosActividad === '' || genero === '') {
            setResponseMessage('Debe completar todos los campos');
            setOpenSnackbar(true);
        }
        else {
            fetch(`${url}simuladorProyeccionJubilatoria`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    try {
                        const jsonString = JSON.stringify(data);
                        const parsedData = JSON.parse(jsonString);
                        setDatosProyeccion(parsedData);
                    } catch (error) {
                        console.log('Error al analizar el JSON:', error);
                        setDatosProyeccion([]);
                    }

                })
                .catch(error => console.log(error));
        }

    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSubmit(event);
        }
    }
    /*if (!datosProyeccion) {
        return <div>
            <nav className="navbar d-flex justify-content-center" style={{ marginTop: "100px" }}>
                <div sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress style={{ color: "#B83E42" }} />
                </div>
            </nav>
        </div>;
    }*/
    return (
        <Grid container spacing={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <nav className="navbar d-flex justify-content-center">
                    <h2 className="navbar-brand mx-auto text-center" style={{ color: "#B83E42" }}>Simulador Jubilatorio</h2>
                </nav>
                <Form onKeyDown={handleKeyDown}>
                    <Form.Group controlId="formBasicSueldo" className="d-flex align-items-center" style={{ marginTop: '10px' }} >
                        <Form.Label style={{ color: '#BE3A4A' }} >Sueldo</Form.Label>
                        <Form.Control style={{ width: '50%', marginLeft: 'auto' }} type=" text" placeholder="Sueldo" onChange={(event) => setSueldo(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicActividad" style={{ marginTop: '10px' }} className="d-flex align-items-center">
                        <Form.Label style={{ color: '#BE3A4A' }}>Actividad</Form.Label>
                        <Form.Control style={{ width: '50%', marginLeft: 'auto' }} as="select" onChange={(event) => setActividad(event.target.value)}>
                            <option value="">Seleccion una opcion</option>
                            <option value="Industria y Comercio">Industria y Comercio</option>
                            <option value="Civil">Civil</option>
                            <option value="Rural">Rural</option>
                            <option value="Servicio Domestico">Servicio Domestico</option>
                            <option value="Patron sin personal">Patron sin personal</option>
                            <option value="Patron con personal">Patron con personal</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicArt8" className="d-flex align-items-center" style={{ marginTop: '10px' }} >
                        <Form.Label style={{ color: '#BE3A4A' }}>Opcion de Art. 8</Form.Label>
                        <div style={{ width: '50%', marginLeft: 'auto' }}>
                            <Form.Check type="radio" label="si" name="art8" value="si" onChange={(event) => setArt8(event.target.value)} />
                            <Form.Check type="radio" label="no" name="art8" value="no" onChange={(event) => setArt8(event.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formBasicEdad" style={{ marginTop: '10px' }} className="d-flex align-items-center" >
                        <Form.Label style={{ color: '#BE3A4A' }}>Edad</Form.Label>
                        <Form.Control style={{ width: '50%', marginLeft: 'auto' }} type="text" placeholder="Edad" onChange={(event) => setEdad(event.target.value)} />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }} controlId="formBasicAñosDeActividad" className="d-flex align-items-center">
                        <Form.Label style={{ color: '#BE3A4A' }} >Años de actividad</Form.Label>
                        <Form.Control style={{ width: '50%', marginLeft: 'auto' }} t type=" text" placeholder="Años de actividad" onChange={(event) => setAñosActividad(event.target.value)} />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }} controlId="formBasicGenero" className="d-flex align-items-center">
                        <Form.Label style={{ color: '#BE3A4A' }}>Genero</Form.Label>
                        <div style={{ width: '50%', marginLeft: 'auto' }}>
                            <Form.Check type="radio" label="Masculino" name="genero" value="Masculino" onChange={(event) => setGenero(event.target.value)} />
                            <Form.Check type="radio" label="Femenino" name="genero" value="Femenino" onChange={(event) => setGenero(event.target.value)} />
                        </div>
                    </Form.Group>
                    <Button style={{ backgroundColor: '#BE3A4A', color: '#FFFFFF', marginTop: '20px', width: '100%', marginRight: 'auto'  }} onClick={handleSubmit}>
                        Consultar
                    </Button>
                </Form>

                <div>
                    <nav className="navbar d-flex justify-content-center">
                        <h2 className="navbar-brand mx-auto text-center" style={{ color: "#B83E42", marginTop: '30px' }}>Resultado</h2>
                    </nav>

                    <TableContainer component={Paper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                        <TableBody>
                            {Object.keys(datosProyeccion).map((property) => (
                                <TableRow key={property}>
                                    <TableCell>{property}</TableCell>
                                    <TableCell>{datosProyeccion[property]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </TableContainer>
                </div>
            </Grid>
            <Snackbar
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    message={responseMessage}
                    autoHideDuration={3000}
                />
        </Grid>
    );
}

export default Simulador;