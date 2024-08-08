import React, { useState } from "react";
import Titulo from "../componentes/Titulo";
import { URL } from "../../src/comercial/Constantes";
import { Grid } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import Snackbar from "@material-ui/core/Snackbar";

const GenerarArchivoBpc = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [cedula, setCedula] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px", // Por ejemplo, aquí se define el margen superior
    // Puedes agregar más propiedades de estilo según sea necesario
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      creaArchivoBpc(event);
    }
  };

  const limpiaCampos = () => {
    setCedula("");
    setPorcentaje("");
  };

  const creaArchivoBpc = (event) => {
    event.preventDefault();
    const formData = {
      cedula: cedula,
      porcentaje: porcentaje,
    };
    if (cedula === "") {
      setResponseMessage("Debe ingresar una cedula");
      setOpenSnackbar(true);
    } else if (porcentaje === "" || porcentaje < 0 || porcentaje > 9) {
      setResponseMessage("Debe ingresar un porcentaje entre 0 y 9");
      setOpenSnackbar(true);
    } else {
      fetch(`${URL}generarArchivoBpc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          try {
            setResponseMessage("Archivo generado correctamente!");
            setOpenSnackbar(true);
            limpiaCampos();
          } catch (error) {
            setResponseMessage(error);
            setOpenSnackbar(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="content">
      <div className="contenedor-principal2">
        <Titulo style={estilosTitulo} title="Generar archivo bpc" />
        <Grid container>
          <Grid item xs={1} sm={1} md={5} lg={5} xl={5}></Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Form onKeyDown={handleKeyDown} style={{ marginTop: "100px" }}>
              <Form.Group
                controlId="formBasicSueldo"
                className="d-flex align-items-center"
                style={{ marginTop: "10px", marginLeft: "20px" }}
              >
                <Form.Label style={{ color: "#BE3A4A" }}>Cedula</Form.Label>
                <Form.Control
                  style={{
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "20px",
                  }}
                  type=" text"
                  placeholder="Cedula"
                  value={cedula}
                  onChange={(event) => setCedula(event.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicSueldo"
                className="d-flex align-items-center"
                style={{ marginTop: "10px", marginLeft: "20px" }}
              >
                <Form.Label style={{ color: "#BE3A4A" }}>Porcentaje</Form.Label>

                <Form.Control
                  style={{
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "20px",
                  }}
                  type=" text"
                  placeholder="Porcentaje"
                  value={porcentaje}
                  onChange={(event) => setPorcentaje(event.target.value)}
                />
              </Form.Group>

              <Button
                style={{
                  backgroundColor: "#BE3A4A",
                  color: "#FFFFFF",
                  marginTop: "60px",
                  width: "100%",
                  marginRight: "auto",
                }}
                onClick={creaArchivoBpc}
              >
                Generar
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
          <Snackbar
            open={openSnackbar}
            onClose={() => setOpenSnackbar(false)}
            message={responseMessage}
            autoHideDuration={3000}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerarArchivoBpc;
