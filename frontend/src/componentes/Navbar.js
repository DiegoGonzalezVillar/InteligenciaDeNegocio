import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
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
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleScroll = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
    if (!response.ok) throw new Error("Error logging in");
    const json = await response.json();
    if (json.message === "Login Exitoso!") {
      setResponseMessage(json.message);
      setOpenSnackbar(true);
      localStorage.setItem("isLoggedIn", true);
      handleClose();
      navigate("/consultas");
    } else {
      setResponseMessage(json.message);
      setOpenSnackbar(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("isLoggedIn");
    setResponseMessage("Sesion Finalizada");
    setOpenSnackbar(true);
    navigate("/");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "Comercial", path: "/consultas", onClick: handleShow },
    { label: "Administracion", path: "/administracion" },
    { label: "Operaciones", path: "/operaciones" },
    { label: "Inversiones", path: "/inversiones" },
    { label: "Simulador", path: "/simulador" },
    { label: "Prestaciones", path: "/prestaciones" },
    { label: "At. al Cliente", path: "/menuAtencionAlcliente" },
    { label: "Informacion", path: "/menuInformacion" },
  ];

  const renderToolbar = () => (
    <Toolbar>
      <Typography sx={{ flexGrow: 1 }}>
        <img
          src={logo2}
          className="mySvg"
          style={{ cursor: "pointer" }}
          width={"20%"}
          height={"44%"}
          alt="Logo Iafap"
          onClick={() => navigate("/")}
        />
      </Typography>

      {isMobile ? (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon style={{ color: "#BE3A4A" }} />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <List style={{ width: 250 }}>
              {menuItems.map(({ label, path, onClick }) => (
                <ListItem
                  button
                  key={label}
                  onClick={() => {
                    toggleDrawer(false)();
                    onClick ? onClick() : navigate(path);
                  }}
                >
                  <ListItemText sx={{ color: "#BE3A4A" }} primary={label} />
                </ListItem>
              ))}
              {isLoggedIn && (
                <ListItem
                  button
                  onClick={() => {
                    toggleDrawer(false)();
                    cerrarSesion();
                  }}
                >
                  <ListItemText primary="Cerrar sesión" />
                </ListItem>
              )}
            </List>
          </Drawer>
        </>
      ) : (
        <>
          {menuItems.map(({ label, path, onClick }) => (
            <Button
              key={label}
              style={{
                color: "#BE3A4A",
                marginRight: "10px",
                fontSize: "13px",
              }}
              onClick={onClick ? onClick : () => navigate(path)}
            >
              {label}
            </Button>
          ))}
          {isLoggedIn && (
            <Button
              style={{
                color: "#BE3A4A",
                marginRight: "20px",
                fontSize: "13px",
              }}
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </Button>
          )}
        </>
      )}
    </Toolbar>
  );

  const renderModal = () => (
    <Modal
      animation={false}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
        marginLeft: "25%",
        width: "50%",
      }}
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#BE3A4A" }}>Inicio de sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onKeyDown={handleKeyDown}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "#BE3A4A" }}>Usuario</Form.Label>
            <Form.Control
              type="text"
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
              placeholder="Ingresar Contraseña"
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
  );

  return (
    <div className={`mi-navbar ${showNavbar ? "show-navbar" : "hide-navbar"}`}>
      {renderToolbar()}
      {renderModal()}
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={responseMessage}
        autoHideDuration={4000}
      />
    </div>
  );
};

export default Navbar;
