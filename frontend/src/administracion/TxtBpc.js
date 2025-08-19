import React, { useState } from "react";
import Titulo from "../componentes/Titulo";
import { URL } from "../../src/comercial/Constantes";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const TxtBpc = () => {
  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px", // Por ejemplo, aquí se define el margen superior
    // Puedes agregar más propiedades de estilo según sea necesario
  };
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const txtAcumulacion = async () => {
    setMessage("");
    setLoading(true); // Establecer el estado de carga en true antes de la solicitud

    try {
      const response = await fetch(`${URL}txtBpcAcumulacion`);
      const data = await response.text();
      let mensaje = JSON.parse(data).message;
      setMessage(mensaje); // Actualiza el estado con el mensaje de respuesta del servidor
    } catch (error) {
      console.error("Error al ejecutar el archivo .bat:", error);
      setMessage("Error al ejecutar el archivo .bat");
    } finally {
      setLoading(false); // Establecer el estado de carga en false después de la solicitud (éxito o error)
    }
  };

  const txtRetiro = async () => {
    setMessage("");
    setLoading(true); // Establecer el estado de carga en true antes de la solicitud

    try {
      const response = await fetch(`${URL}txtBpcRetiro`); // Llama al endpoint /ejecutar-bat en el servidor
      const data = await response.text();
      let mensaje = JSON.parse(data).message;
      setMessage(mensaje); // Actualiza el estado con el mensaje de respuesta del servidor
    } catch (error) {
      console.error("Error al ejecutar el archivo .bat:", error);
      setMessage("Error al ejecutar el archivo .bat");
    } finally {
      setLoading(false); // Establecer el estado de carga en false después de la solicitud (éxito o error)
    }
  };
  return (
    <div className="content">
      <div className="contenedor-principal2">
        <Titulo
          style={estilosTitulo}
          title="Generación de txt segun sub fondo"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              color: "#BE3A4A",
              marginTop: "5em",
              border: "1px solid #BE3A4A",
              borderRadius: "5px",
              padding: "0.5em 1em",
            }}
            onClick={txtAcumulacion}
            disabled={loading} // Deshabilita el botón mientras se carga
          >
            Acumulación
          </Button>

          <Button
            style={{
              color: "#BE3A4A",
              marginTop: "5em",
              border: "1px solid #BE3A4A",
              borderRadius: "5px",
              marginLeft: "1em",
              padding: "0.5em 1em",
            }}
            onClick={txtRetiro}
            disabled={loading} // Deshabilita el botón mientras se carga
          >
            Retiro
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2em",
          }}
        >
          {loading && <p>Cargando...</p>}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              color: "#BE3A4A",
              marginTop: "5em",
            }}
          >
            {message}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default TxtBpc;
