import { getConnection } from "../database/connection";
const XLSX = require("xlsx");
const { spawn } = require("child_process");

export const getObtenerVst = async (req, res) => {
  const excelFile = req.files.excelFile;
  const workbook = XLSX.read(excelFile.data);
  const sheetName = workbook.SheetNames[0];
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const cedulasArray = sheetData.map((item) => item.cedulas);
  const cedulasString = cedulasArray.join("','");
  const query = `
      SELECT distinct CI, Subestado
      FROM [192.168.20.2].[IAFAPCRM].[sysdba].[CRM_Comercial]
      WHERE CI IN ('${cedulasString}') AND Subestado IN ('VST', 'CST')
    `;

  const pool = await getConnection();
  const result = await pool.request().query(query);

  res.json({
    message: "Archivo Excel procesado exitosamente",
    data: result.recordset,
  });
};

export const generarArchivoBpc = (req, res) => {
  const { cedula, porcentaje } = req.body;

  const args = [cedula, porcentaje];

  let returnData = "";
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    [
      "C:\\Compartida Python\\Prestaciones\\Creacion archivo bpc crm.py",
      ...args,
    ]
  );
  /*const pythonProcess = spawn("python", [
    "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\Creacion archivo bpc crm.py",
    ...args,
  ]);*/
  pythonProcess.stdout.on("data", (data) => {
    returnData += data;
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  pythonProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    res.json(returnData);
  });
};
