import { Button, Toolbar, Typography } from "@mui/material";
//import {makeStyles} from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo2 from "../imagenes/logo.svg";
import { Form, Modal } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import { URL } from "../comercial/Constantes.js";
import "../style/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClose = () => setShow(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleShow = () => {
    if (isLoggedIn) {
      navigate("/consultas");
    } else {
      setShow(true);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${URL}login`, options);
    if (!response.ok) {
      throw new Error("Error logging in");
    }
    const json = await response.json();
    if (json.message === "Login Exitoso!") {
      setResponseMessage(json.message);
      setOpenSnackbar(true);
      localStorage.setItem("isLoggedIn", true);
      handleClose();
      navigate("/consultas");
    } else setResponseMessage(json.message);
    setOpenSnackbar(true);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  const Logout = () => {
    const cerrarSesion = () => {
      localStorage.removeItem("isLoggedIn");
      setResponseMessage("Sesion Finalizada");
      setOpenSnackbar(true);
      navigate("/");
    };
    return (
      <div>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            <img
              src={logo2}
              className="mySvg"
              style={{ cursor: "pointer" }}
              flex={1}
              width={"15%"}
              height={60}
              resizemode={"contain"}
              alt="Logo Iafap"
              onClick={() => navigate("/")}
            ></img>
          </Typography>
          <Button
            style={{ color: "#BE3A4A", marginRight: "20px", fontSize: "90%" }}
            onClick={() => navigate("/simulador")}
          >
            Simulador
          </Button>
          <Button
            style={{ color: "#BE3A4A", marginRight: "20px", fontSize: "90%" }}
            onClick={handleShow}
          >
            Comercial
          </Button>
          <Button
            style={{ color: "#BE3A4A", marginRight: "20px" }}
            onClick={() => navigate("/tableros")}
          >
            Informacion
          </Button>
          <Button
            style={{ color: "#BE3A4A", marginRight: "50px", fontSize: "90%" }}
            onClick={cerrarSesion}
          >
            Cerrar sesion
          </Button>
        </Toolbar>
      </div>
    );
  };
  const Login = () => {
    return (
      <>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            <img
              src={logo2}
              style={{ cursor: "pointer" }}
              className="mySvg"
              flex={1}
              width={200}
              height={60}
              resizemode={"contain"}
              alt="Logo Iafap"
              onClick={() => navigate("/")}
            ></img>
          </Typography>
          <Button
            style={{ color: "#BE3A4A", marginRight: "20px", fontSize: "90%" }}
            onClick={() => navigate("/simulador")}
          >
            Simulador
          </Button>
          <Button
            style={{ color: "#BE3A4A", marginRight: "100ox" }}
            onClick={handleShow}
          >
            Comercial
          </Button>
          <Button
            style={{ color: "#BE3A4A", marginRight: "20px" }}
            onClick={() => navigate("/tableros")}
          >
            Informacion
          </Button>
        </Toolbar>
        <Modal
          animation={false}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10%",
          }}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#BE3A4A" }}>
              Inicio de sesión
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onKeyDown={handleKeyDown}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{ color: "#BE3A4A" }}>Usuario</Form.Label>
                <Form.Control
                  type=" text"
                  placeholder="Ingresar Usuario"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicPassword"
                style={{ marginTop: "10px" }}
              >
                <Form.Label style={{ color: "#BE3A4A" }}>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=" Ingresar Contraseña"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secundario"
              onClick={handleClose}
              style={{ color: "#BE3A4A" }}
            >
              Cerrar
            </Button>
            <Button
              variant="primary"
              style={{ color: "#BE3A4A" }}
              onClick={handleSubmit}
            >
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
      </>
    );
  };
  return <div className="mi-navbar"> {!isLoggedIn ? Login() : Logout()}</div>;
};

export default Navbar;
