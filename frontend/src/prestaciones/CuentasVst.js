import React, { useState } from "react";
import Titulo from "../componentes/Titulo";
import Button from "@material-ui/core/Button";
import { URL } from "../comercial/Constantes";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Snackbar } from "@material-ui/core";

function ExcelUploader() {
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "15px",
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleCancel = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      const response = await fetch(`${URL}getObtenerVst`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const respuesta = await response.json();
        // Crear un archivo Excel y guardar los datos en él
        if (respuesta.data.length > 0) {
          let workbook = "";
          // Crear un archivo Excel y guardar los datos en él

          workbook = XLSX.utils.book_new();
          const worksheet = XLSX.utils.json_to_sheet(respuesta.data);
          console.log(worksheet);
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

          const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "buffer",
          });
          const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
          });
          saveAs(blob, "data.xlsx");
          setResponseMessage("Archivo generado correctamente!");
        }
      } else {
        setResponseMessage(response.statusText);
      }
    } catch (error) {
      setResponseMessage(error);
    }
  };

  return (
    <div className="content">
      <div className="contenedor-principal2">
        <Titulo style={estilosTitulo} title="Cuentas VST" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginTop: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              style={{
                display: "none",
              }}
              type="file"
              accept=".xlsx"
              id="fileInput"
              onChange={(e) => handleDrop(e.target.files)}
            />
            <label
              htmlFor="fileInput"
              style={{
                color: "#BE3A4A",
                marginTop: "1em",
                border: "1px solid #BE3A4A",
                borderRadius: "4px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Seleccionar archivo
            </label>
            {file && (
              <p
                style={{
                  marginLeft: "2em",
                  marginTop: "2em",
                  color: "#BE3A4A",
                }}
              >
                Archivo seleccionado: {file.name}
              </p>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            {file ? (
              <div>
                <div>
                  <Button
                    style={{
                      color: "#BE3A4A",
                      marginTop: "5em",
                    }}
                    onClick={handleUpload}
                  >
                    Cargar y Procesar
                  </Button>

                  <Button
                    style={{
                      color: "#BE3A4A",
                      marginTop: "5em",
                      marginLeft: "3em",
                    }}
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <Snackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message={responseMessage}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </div>
    </div>
  );
}

export default ExcelUploader;
