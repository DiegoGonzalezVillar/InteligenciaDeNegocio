import React, { useState } from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@material-ui/core";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import Snackbar from "@material-ui/core/Snackbar";
import { URL } from "./Constantes.js";
import Titulo from "../componentes/Titulo.js";

function Simulador() {
  const estilosTitulo = {
    color: "#BE3A4A",
  };
  const [respuestaProyeccion, setRespuestaProyeccion] = useState([]);
  const [sueldo, setSueldo] = useState("");
  const [actividad, setActividad] = useState("");
  const [art8, setArt8] = useState("");
  const [edad, setEdad] = useState("");
  const [añosActividad, setAñosActividad] = useState("");
  const [genero, setGenero] = useState("");
  const [cantidadHijos, setCantidadHijos] = useState(0);
  const [bonificada, setBonificada] = useState("");
  const [actividadBonificada, setActividadBonificada] = useState("");
  const [saldoAcumulacion, setSaldoAcumulacion] = useState("");
  const [saldoRetiro, setSaldoRetiro] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      sueldo: sueldo,
      actividad: actividad,
      art8: art8,
      edad: edad,
      añosActividad: añosActividad,
      genero: genero,
      cantidadHijos: cantidadHijos,
      actividadBonificada: actividadBonificada,
      bonificada: bonificada,
      saldoAcumulacion: saldoAcumulacion,
      saldoRetiro: saldoRetiro,
    };
    console.log(actividad);
    if (sueldo === "" || edad === "" || añosActividad === "" || genero === "") {
      setResponseMessage("Debe completar todos los campos");
      setOpenSnackbar(true);
    } else {
      fetch(`${URL}simuladorProyeccionJubilatoria`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          try {
            setRespuestaProyeccion(data);
          } catch (error) {
            console.log("Error al analizar el JSON:", error);
            setRespuestaProyeccion([]);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <div className="contenedor-principal2">
      <div className="h-[calc(100vh-75px)] ">
        <div className="grid grid-cols-2 h-full py-8 px-80 gap-32">
          <div className="h-full">
            <Titulo style={estilosTitulo} title="Simulador Jubilatorio" />
            <Form onKeyDown={handleKeyDown} style={{ marginTop: "20px" }}>
              <Form.Group
                controlId="formBasicSueldo"
                className="d-flex align-items-center"
                style={{ marginTop: "10px" }}
              >
                <Form.Label style={{ color: "#BE3A4A" }}>Sueldo</Form.Label>
                <Form.Control
                  style={{ width: "50%", marginLeft: "auto" }}
                  type=" text"
                  placeholder="Sueldo"
                  onChange={(event) => setSueldo(event.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicActividad"
                style={{ marginTop: "10px" }}
                className="d-flex align-items-center"
              >
                <Form.Label style={{ color: "#BE3A4A" }}>Actividad</Form.Label>
                <Form.Control
                  style={{ width: "50%", marginLeft: "auto" }}
                  as="select"
                  onChange={(event) => setActividad(event.target.value)}
                >
                  <option value="">Seleccion una opcion</option>
                  <option value="Industria y Comercio">
                    Industria y Comercio
                  </option>
                  <option value="Civil">Civil</option>
                  <option value="Rural">Rural</option>
                  <option value="Servicio Domestico">Servicio Domestico</option>
                  <option value="Patron sin Personal">
                    Patron sin Personal
                  </option>
                  <option value="Patron con Personal">
                    Patron con Personal
                  </option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId="formBasicArt8"
                className="d-flex align-items-center"
                style={{ marginTop: "10px" }}
              >
                <Form.Label style={{ color: "#BE3A4A" }}>
                  Opcion de Art. 8
                </Form.Label>
                <div style={{ width: "50%", marginLeft: "auto" }}>
                  <Form.Check
                    type="radio"
                    label="si"
                    name="art8"
                    value="si"
                    onChange={(event) => setArt8(event.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="no"
                    name="art8"
                    value="no"
                    onChange={(event) => setArt8(event.target.value)}
                  />
                </div>
              </Form.Group>
              <Form.Group
                controlId="formBasicEdad"
                style={{ marginTop: "10px" }}
                className="d-flex align-items-center"
              >
                <Form.Label style={{ color: "#BE3A4A" }}>Edad</Form.Label>
                <Form.Control
                  style={{ width: "50%", marginLeft: "auto" }}
                  type="text"
                  placeholder="Edad"
                  onChange={(event) => setEdad(event.target.value)}
                />
              </Form.Group>
              <Form.Group
                style={{ marginTop: "10px" }}
                controlId="formBasicAñosDeActividad"
                className="d-flex align-items-center"
              >
                <Form.Label style={{ color: "#BE3A4A" }}>
                  Años de actividad
                </Form.Label>
                <Form.Control
                  style={{ width: "50%", marginLeft: "auto" }}
                  t
                  type=" text"
                  placeholder="Años de actividad"
                  onChange={(event) => setAñosActividad(event.target.value)}
                />
              </Form.Group>
              <Form.Group
                style={{ marginTop: "10px" }}
                controlId="formBasicGenero"
                className="d-flex align-items-center"
              >
                <Form.Label style={{ color: "#BE3A4A" }}>Genero</Form.Label>
                <div style={{ width: "50%", marginLeft: "auto" }}>
                  <Form.Check
                    type="radio"
                    label="Masculino"
                    name="genero"
                    value="Masculino"
                    onChange={(event) => setGenero(event.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Femenino"
                    name="genero"
                    value="Femenino"
                    onChange={(event) => setGenero(event.target.value)}
                  />
                </div>
              </Form.Group>
              {genero === "Femenino" ? (
                <Form.Group
                  controlId="formCantidadHijos"
                  className="d-flex align-items-center"
                  style={{ marginTop: "10px" }}
                >
                  <Form.Label style={{ color: "#BE3A4A" }}>
                    Cantidad Hijos
                  </Form.Label>
                  <Form.Control
                    style={{ width: "50%", marginLeft: "auto" }}
                    type=" text"
                    placeholder="Cantidad hijos"
                    onChange={(event) => setCantidadHijos(event.target.value)}
                  />
                </Form.Group>
              ) : null}
              <Form.Group
                style={{ marginTop: "10px" }}
                controlId="formEsBonificada"
                className="d-flex align-items-center"
              >
                <Form.Label style={{ color: "#BE3A4A" }}>
                  Actividad Bonificada
                </Form.Label>
                <div style={{ width: "50%", marginLeft: "auto" }}>
                  <Form.Check
                    type="radio"
                    label="si"
                    name="bonificada"
                    value="si"
                    onChange={(event) => setBonificada(event.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="no"
                    name="bonificada"
                    value="no"
                    onChange={(event) => setBonificada(event.target.value)}
                  />
                </div>
              </Form.Group>
              {bonificada === "si" ? (
                <Form.Group
                  controlId="formActividadBonificada"
                  style={{ marginTop: "10px" }}
                  className="d-flex align-items-center"
                >
                  <Form.Label style={{ color: "#BE3A4A" }}>
                    Actividad Bonificada
                  </Form.Label>
                  <Form.Control
                    style={{ width: "50%", marginLeft: "auto" }}
                    as="select"
                    onChange={(event) =>
                      setActividadBonificada(event.target.value)
                    }
                  >
                    <option value="">Seleccion una opcion</option>
                    <option value="Func Instituto Dr Jose Scoseria">
                      Funcionario Instituto Dr Jose Scoseria
                    </option>
                    <option value="Afectados a Radiaciones Ionizantes">
                      Afectados a Radiaciones Ionizantes
                    </option>
                    <option value="Industrias que procesan Asbesto">
                      Industrias que procesan Asbesto
                    </option>
                    <option value="Pilotos y Copilotos de aereonaves de Matricula uruguaya">
                      Pilotos y Copilotos de aereonaves de matricula uruguaya
                    </option>
                    <option value="Controladores de trafico aereo">
                      Controladores de trafico aereo
                    </option>
                    <option value="Exposicion permanente al dioxido de silicio">
                      Exposicion permanente al dioxido de silicio
                    </option>
                    <option value="Tecnico personal mantenimiento y laboratorio de la refineria de la planta de ANCAP">
                      Técnico personal mantenimiento y laboratorio de la
                      refinería de la planta de ANCAP
                    </option>
                    <option value="Personal Sala maquinas de servicios de dragado y maritima de la ANP">
                      Personal Sala máquinas de servicios de dragado y marítima
                      de la ANP
                    </option>
                    <option value="Funcionarios turnantes de la division de alcoholes de ANCAP">
                      Funcionarios turnantes de la división de alcoholes de
                      ANCAP
                    </option>
                    <option value="Trabajos a temperaturas menores a 20 grados bajo cero">
                      Trabajos a temperaturas menores a 20 grados bajo cero
                    </option>
                    <option value="Telefonistas de larga distancia de ANTEL">
                      Telefonistas de larga distancia de ANTEL
                    </option>
                    <option value="Casinos municipales de Montevideo tecnicos profesionales">
                      Casinos municipales de Montevideo - técnicos profesionales
                    </option>
                    <option value="Choferes y choferes cobradores del servicio de transporte colectivo de pasajeros">
                      Choferes y choferes cobradores del servicio de transporte
                      colectivo de pasajeros
                    </option>
                    <option value="Docentes de ensenanza primaria a sordomudos, ciegos y deficitarios mentales">
                      Docentes de enseñanza primaria a sordomudos, ciegos y
                      deficitarios mentales
                    </option>
                    <option value="Docentes de discapacitados del consejo de educacion tecnico profesional">
                      Docentes de discapacitados del consejo de educación
                      técnico profesional
                    </option>
                    <option value="Personal docente de escuelas rurales que desempenan funciones y se domicilien efectivamente en escuelas rurales">
                      Personal docente de escuelas rurales que desempeñan
                      funciones y se domicilien efectivamente en escuelas
                      rurales
                    </option>
                    <option value="Docentes de ensenanza primaria">
                      Docentes de enseñanza primaria
                    </option>
                    <option value="Docentes de ensenanza secundaria, de educacion tecnico profesional y de educacion fisica">
                      Docentes de enseñanza secundaria, de educación técnico
                      profesional y de educación física
                    </option>
                    <option value="Docentes universitarios y de institutos de formacion docente">
                      Docentes universitarios y de institutos de formación
                      docente
                    </option>
                    <option value="Empleados administrativos planilla 18 casinos municipales">
                      Empleados administrativos planilla 18 casinos municipales
                    </option>
                  </Form.Control>
                </Form.Group>
              ) : null}
              <Form.Group
                controlId="formSaldoAcumulacion"
                className="d-flex align-items-center"
                style={{ marginTop: "10px" }}
              >
                <Form.Label style={{ color: "#BE3A4A" }}>
                  Saldo Acumulación
                </Form.Label>
                <Form.Control
                  style={{ width: "50%", marginLeft: "auto" }}
                  type=" text"
                  placeholder="Saldo Acumulación"
                  onChange={(event) => setSaldoAcumulacion(event.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="formSaldoRetiro"
                className="d-flex align-items-center"
                style={{ marginTop: "10px" }}
              >
                <Form.Label style={{ color: "#BE3A4A" }}>
                  Saldo Retiro
                </Form.Label>
                <Form.Control
                  style={{ width: "50%", marginLeft: "auto" }}
                  type=" text"
                  placeholder="Saldo Retiro"
                  onChange={(event) => setSaldoRetiro(event.target.value)}
                />
              </Form.Group>
              <Button
                style={{
                  backgroundColor: "#BE3A4A",
                  color: "#FFFFFF",
                  marginTop: "20px",
                  width: "100%",
                  marginRight: "auto",
                }}
                onClick={handleSubmit}
              >
                Consultar
              </Button>
            </Form>
          </div>

          <div className="h-full">
            <Titulo style={estilosTitulo} title="Resultado" />
            {respuestaProyeccion.length > 0 ? (
              <TableContainer style={{ marginTop: "20px" }} component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                  <TableHead style={{ backgroundColor: "#BE3A4A" }}>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ color: "white", width: 140 }}
                      >
                        Edad
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: "white", width: 140 }}
                      >
                        Jubilacion AFAP
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {JSON.parse(respuestaProyeccion).map((row) => (
                      <TableRow
                        key={row.edad}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 1 },
                        }}
                        style={{ backgroundColor: "#e6e6e63f" }}
                      >
                        <TableCell align="center">{row.edad}</TableCell>
                        <TableCell align="center">
                          {row.jubilacion_afap}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <TableContainer style={{ marginTop: "20px" }} component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                  <TableHead style={{ backgroundColor: "#BE3A4A" }}>
                    <TableRow>
                      <TableCell align="center" style={{ color: "white" }}>
                        Edad
                      </TableCell>
                      <TableCell align="center" style={{ color: "white" }}>
                        Jubilacion AFAP
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            )}
          </div>
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
}
export default Simulador;
