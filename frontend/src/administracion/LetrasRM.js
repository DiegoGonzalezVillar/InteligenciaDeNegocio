import React, { useState } from "react";
import Titulo from "../componentes/Titulo";
import { URL } from "../../src/comercial/Constantes";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const MyComponent = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const regulacionMonetaria = async () => {
    setMessage("");
    setLoading(true); // Establecer el estado de carga en true antes de la solicitud

    try {
      const response = await fetch(`${URL}txtAcumulacion`);
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
      <div className="contenedor-principal">
        <Titulo title="Creacion de Regulacion Monetaria" />
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
            onClick={regulacionMonetaria}
            disabled={loading} // Deshabilita el botón mientras se carga
          >
            Regulacion Monetaria
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

export default MyComponent;
