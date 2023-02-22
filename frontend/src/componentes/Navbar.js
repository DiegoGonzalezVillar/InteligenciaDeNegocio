import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material'
//import {makeStyles} from '@material-ui/core';
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import logo2 from '../imagenes/logo.svg'
import { Form, Modal } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar'

const Navbar = () => {
    const navigate = useNavigate()
    const url = 'http://appcomercial.iafap.local:4000/'
    //const url = 'http://localhost:4000/'
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleClose = () => setShow(false);
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const handleShow = () => {
        if (isLoggedIn) {
            navigate('/consultas');
        }
        else {
            setShow(true);
        }
    }
    /* window.addEventListener("beforeunload", (event) => {
         localStorage.removeItem("isLoggedIn");
     });*/

    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        };
        const response = await fetch(`${url}login`, options);
        if (!response.ok) {
            throw new Error("Error logging in");
        }
        const json = await response.json();
        if (json.message === 'Login Exitoso!') {
            setResponseMessage(json.message);
            setOpenSnackbar(true);
            localStorage.setItem('isLoggedIn', true);
            handleClose()
            navigate('/consultas');
        }
        else
            setResponseMessage(json.message);
        setOpenSnackbar(true);
    }

    const Logout = () => {
        const cerrarSesion = () => {
            localStorage.removeItem("isLoggedIn");
            setResponseMessage('Sesion Finalizada');
            setOpenSnackbar(true);
            navigate('/');
        }
        return (
            <AppBar position='static' color='transparent' style={{ backgroundColor: '#FFFFFF' }}>
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }} >
                        <img src={logo2} className="mySvg" flex={1} width={'15%'} height={60} resizemode={'contain'} alt="Logo Iafap" onClick={() => navigate('/')}>
                        </img>
                    </Typography>
                    <Button style={{ color: '#BE3A4A', marginRight: '20px', fontSize: "90%" }} onClick={handleShow}>
                        Comercial
                    </Button>
                    <Button style={{ color: '#BE3A4A', marginRight: '20px' }} onClick={() => navigate('/tablero')}>
                        Dashboard
                    </Button>
                    <Button style={{ color: '#BE3A4A', marginRight: '100ox' }} onClick={() => navigate('/curvaS')}>
                        Curva S
                    </Button>
                    <Button style={{ color: '#BE3A4A', marginRight: '50px', fontSize: "90%" }} onClick={cerrarSesion}>
                        Cerrar sesion
                    </Button>
                </Toolbar>
            </AppBar>

        )
    }
    const Login = () => {
        return (
            <AppBar position='static' color='transparent' style={{ backgroundColor: '#FFFFFF' }}>
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }} >
                        <img src={logo2} className="mySvg" flex={1} width={200} height={60} resizemode={'contain'} alt="Logo Iafap" onClick={() => navigate('/')}>
                        </img>
                    </Typography>
                    <Button style={{ color: '#BE3A4A', marginRight: '100ox' }} onClick={handleShow}>
                        Comercial
                    </Button>
                    <Button style={{ color: '#BE3A4A', marginRight: '100ox' }} onClick={() => navigate('/tablero')}>
                        Dashboard
                    </Button>
                    <Button style={{ color: '#BE3A4A', marginRight: '100ox' }} onClick={() => navigate('/curvaS')}>
                        Curva S
                    </Button>
                </Toolbar>
                <Modal animation={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    show={show} onHide={handleClose}>
                    <Modal.Header closeButton >
                        <Modal.Title style={{ color: '#BE3A4A' }}>Inicio de sesión</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={{ color: '#BE3A4A' }} >Usuario</Form.Label>
                                <Form.Control type=" text" placeholder="Ingresar Usuario" onChange={(event) => setUsername(event.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" style={{ marginTop: '10px' }}>
                                <Form.Label style={{ color: '#BE3A4A' }}>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder=" Ingresar Contraseña" onChange={(event) => setPassword(event.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secundario" onClick={handleClose} style={{ color: '#BE3A4A' }}>
                            Cerrar
                        </Button>
                        <Button variant="primary" style={{ color: '#BE3A4A' }} onClick={handleSubmit}>
                            Iniciar Sesión
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Snackbar
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    message={responseMessage}
                    autoHideDuration={4000}
                />
            </AppBar>
        )
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            {!isLoggedIn ? Login(): Logout()}
        </Box>
    )
}

export default Navbar;
