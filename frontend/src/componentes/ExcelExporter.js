import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ExcelExporter({ data }) {
  return (
    <ExcelFile element={<button>Descargar Excel</button>}>
      <ExcelSheet data={data} name="Sheet1">
        <ExcelColumn label="CI" value="CI" />
        <ExcelColumn label="Subestado" value="Subestado" />
      </ExcelSheet>
    </ExcelFile>
  );
}

export default ExcelExporter;
