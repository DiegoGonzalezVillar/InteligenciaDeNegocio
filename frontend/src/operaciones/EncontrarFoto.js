import React, { useState } from "react";
import Titulo from "../componentes/Titulo";
import { URL } from "../../src/comercial/Constantes";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import Snackbar from "@material-ui/core/Snackbar";
import { Modal } from "react-bootstrap";
import "./Modal.css";

const MyComponent = () => {
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [fotoRecibida, setFotoRecibida] = useState();
  const [foto, setFoto] = useState("");
  const [cedula, setCedula] = useState("");
  const [formulario, setFormulario] = useState("");
  const [rotationDegree, setRotationDegree] = useState(0);
  const [show, setShow] = useState(false);

  const rotateImage = (degree) => {
    setRotationDegree((prevDegree) => (prevDegree + degree) % 360);
  };
  const fotoFomulario = (event) => {
    setMessage("");
    event.preventDefault();
    const formData = {
      foto: foto,
      cedula: cedula,
      formulario: formulario,
    };
    if (cedula === "" && formulario === "") {
      setResponseMessage("Debe completar por lo menos uno de los campos");
      setOpenSnackbar(true);
    } else {
      fetch(`${URL}encontrarFoto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          try {
            if (data.replace(/"/g, "").trim() === "Sin foto") {
              setResponseMessage("No existe la foto buscada");
              setOpenSnackbar(true);
            } else {
              const dataSinComillas = data.replace(/"/g, "");
              setFotoRecibida(dataSinComillas);
              setShow(true);
              setMessage(message);
            }
          } catch (error) {
            console.log("Error al analizar el JSON:", error);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      fotoFomulario(event);
    }
  };
  const handleClose = () => setShow(false);

  return (
    <div className="content">
      <div className="contenedor-principal2">
        <Titulo title="Encontrar Foto" />
        <Grid container>
          <Grid item xs={1} sm={1} md={4} lg={4} xl={4}></Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Form onKeyDown={handleKeyDown} style={{ marginTop: "60px" }}>
              <Form.Group
                controlId="formBasicSueldo"
                className="d-flex align-items-center"
                style={{ marginTop: "10px" }}
              >
                <Form.Label style={{ color: "#BE3A4A" }}>Cedula</Form.Label>
                <Form.Control
                  style={{ width: "50%", marginLeft: "auto" }}
                  type=" text"
                  placeholder="Cedula"
                  onChange={(event) => setCedula(event.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicSueldo"
                className="d-flex align-items-center"
                style={{ marginTop: "10px" }}
              >
                <Form.Label style={{ color: "#BE3A4A" }}>Formulario</Form.Label>
                <Form.Control
                  style={{ width: "50%", marginLeft: "auto" }}
                  type=" text"
                  placeholder="Formulario"
                  onChange={(event) => setFormulario(event.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicFoto"
                className="d-flex align-items-center"
                style={{ marginTop: "10px" }}
              >
                <Form.Label style={{ color: "#BE3A4A" }}>
                  Seleccion de Foto
                </Form.Label>
                <div style={{ width: "50%", marginLeft: "auto" }}>
                  <Form.Check
                    type="radio"
                    label={<span style={{ color: "#BE3A4A" }}>Formulario</span>}
                    name="foto"
                    value="forfoto"
                    onChange={(event) => setFoto(event.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label={<span style={{ color: "#BE3A4A" }}>Ci Frente</span>}
                    name="foto"
                    value="forcifoto"
                    onChange={(event) => setFoto(event.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label={<span style={{ color: "#BE3A4A" }}>Ci Dorso</span>}
                    name="foto"
                    value="forcifoto2"
                    onChange={(event) => setFoto(event.target.value)}
                  />
                </div>
              </Form.Group>
              <Button
                style={{
                  backgroundColor: "#BE3A4A",
                  color: "#FFFFFF",
                  marginTop: "20px",
                  width: "100%",
                  marginRight: "auto",
                }}
                onClick={fotoFomulario}
              >
                Foto
              </Button>
            </Form>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {fotoRecibida && (
            <Modal
              dialogClassName="modal-content"
              style={{ marginTop: "80px" }}
              show={show}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "#BE3A4A" }}>Imagen</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  overflow: "hidden",
                  maxWidth: "100%",
                  height: "100%", // Ajusta según sea necesario
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `rotate(${rotationDegree}deg)`,
                  transition: "transform 0.5s ease",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${fotoRecibida}`}
                  style={{
                    width: "100%", // Tamaño máximo de la imagen
                    height: "100%", // Tamaño máximo de la imagen
                  }}
                  alt="Imagen Cargada"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secundario"
                  style={{ color: "#BE3A4A" }}
                  onClick={() => rotateImage(-90)}
                >
                  Girar a la izquierda
                </Button>
                <Button
                  variant="secundario"
                  style={{ color: "#BE3A4A" }}
                  onClick={() => rotateImage(90)}
                >
                  Girar a la derecha
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          <Typography
            style={{
              color: "#BE3A4A",
              marginTop: "5em",
            }}
          >
            {message}
          </Typography>
          <Snackbar
            open={openSnackbar}
            onClose={() => setOpenSnackbar(false)}
            message={responseMessage}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: "center", // Puede ser 'top' o 'bottom'
              horizontal: "center", // Puede ser 'left', 'center' o 'right'
            }}
            ContentProps={{
              style: {
                backgroundColor: "#E08223", // Cambia el color de fondo aquí
                color: "white", // Cambia el color del texto
                textAlign: "center", // Centrar el texto horizontalmente
                justifyContent: "center", // Centrar el contenido dentro del Snackbar
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
