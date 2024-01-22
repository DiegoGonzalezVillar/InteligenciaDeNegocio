import { getConnection } from "../database/connection";

export const getObtenerVst = async (req, res) => {
  const excelFile = req.files.excelFile;
  const workbook = XLSX.read(excelFile.data);
  const sheetName = workbook.SheetNames[0];
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const cedulasArray = sheetData.map((item) => item.cedulas);
  const cedulasString = cedulasArray.join("','");
  const query = `
      SELECT CI, Subestado
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
