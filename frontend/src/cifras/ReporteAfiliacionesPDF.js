import React, { useMemo } from "react";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ====== Mapa código asesor -> fecha de nacimiento (DD/MM/YYYY) ======
const ASESOR_FECHAN = {
  1332: "27/12/1966",
  1512: "08/05/1970",
  1618: "01/05/1971",
  2005: "15/12/1978",
  2030: "20/06/1973",
  3005: "21/03/1968",
  3007: "31/07/1978",
  3064: "18/07/1964",
  3065: "27/05/1987",
  3069: "08/12/1976",
  3075: "13/10/1977",
  3076: "31/07/1973",
  3093: "29/07/1978",
  3117: "26/09/1984",
  3152: "28/09/1983",
  3154: "04/05/1983",
  3165: "04/05/1970",
};

// ====== Helpers edad ======
function parseDMYToDate(dmy) {
  if (!dmy) return null;
  const [dd, mm, yyyy] = String(dmy)
    .split("/")
    .map((x) => Number(String(x).trim()));
  if (!dd || !mm || !yyyy) return null;
  return new Date(yyyy, mm - 1, dd);
}
function calcAgeFromDMY(dmy) {
  const dob = parseDMYToDate(dmy);
  if (!dob) return null;
  const t = new Date();
  let age = t.getFullYear() - dob.getFullYear();
  const m = t.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < dob.getDate())) age--;
  return age;
}

// ====== Helpers periodo/meses ======
const MESES_ORDEN = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
function ordenarMeses(a, b) {
  return (
    MESES_ORDEN.indexOf(String(a).toLowerCase()) -
    MESES_ORDEN.indexOf(String(b).toLowerCase())
  );
}

/** Texto del período a mostrar */
function construirPeriodo({ anioSeleccionado, mesSeleccionado, data }) {
  const mesesSel = Array.isArray(mesSeleccionado) ? mesSeleccionado : ["Todos"];
  const anioSel = anioSeleccionado ?? "Todos";

  // Meses únicos presentes en data (ordenados)
  const mesesEnData = Array.from(new Set(data.map((d) => String(d.mes)))).sort(
    ordenarMeses
  );

  if (data.length === 0) return "(sin datos)";

  // Caso: año específico
  if (anioSel !== "Todos") {
    let meses = mesesSel.includes("Todos")
      ? mesesEnData
      : [...mesesSel].sort(ordenarMeses);

    if (meses.length === 0) return `${anioSel}`;

    const idxs = meses
      .map((m) => MESES_ORDEN.indexOf(String(m).toLowerCase()))
      .filter((i) => i >= 0)
      .sort((a, b) => a - b);

    const esContigua = idxs.every(
      (v, i, arr) => i === 0 || v - arr[i - 1] === 1
    );

    if (esContigua && meses.length > 1)
      return `${meses[0]} – ${meses[meses.length - 1]} ${anioSel}`;
    if (meses.length === 1) return `${meses[0]} ${anioSel}`;
    return `${anioSel}: ${meses.join(", ")}`;
  }

  // Caso: año = "Todos" -> usamos pares (anio, mes) presentes en data
  const pares = Array.from(
    new Set(data.map((d) => `${d.anio}-${String(d.mes).toLowerCase()}`))
  );
  if (pares.length === 0) return "(sin datos)";

  pares.sort((ka, kb) => {
    const [ya, ma] = ka.split("-");
    const [yb, mb] = kb.split("-");
    if (Number(ya) !== Number(yb)) return Number(ya) - Number(yb);
    return ordenarMeses(ma, mb);
  });

  const [y1, m1] = pares[0].split("-");
  const [y2, m2] = pares[pares.length - 1].split("-");

  if (y1 === y2) return `${m1} – ${m2} ${y1}`;
  return `${m1} ${y1} – ${m2} ${y2}`;
}

/** Keys de meses del período (ordenadas). key = `${anio}-${mesLower}` */
function obtenerKeysMesPeriodo({ anioSeleccionado, mesSeleccionado, data }) {
  if (!Array.isArray(data) || data.length === 0) return [];
  const anioSel = anioSeleccionado ?? "Todos";
  const mesesSel = Array.isArray(mesSeleccionado) ? mesSeleccionado : ["Todos"];

  if (anioSel !== "Todos") {
    let meses;
    if (mesesSel.includes("Todos")) {
      const mesesEnData = Array.from(
        new Set(
          data
            .filter((d) => Number(d.anio) === Number(anioSel))
            .map((d) => String(d.mes))
        )
      ).sort(ordenarMeses);
      meses = mesesEnData;
    } else {
      meses = [...mesesSel].sort(ordenarMeses);
    }
    return meses.map((m) => `${anioSel}-${String(m).toLowerCase()}`);
  }

  const pares = Array.from(
    new Set(data.map((d) => `${d.anio}-${String(d.mes).toLowerCase()}`))
  );
  pares.sort((ka, kb) => {
    const [ya, ma] = ka.split("-");
    const [yb, mb] = kb.split("-");
    if (Number(ya) !== Number(yb)) return Number(ya) - Number(yb);
    return ordenarMeses(ma, mb);
  });
  return pares;
}

// ====== Resúmenes ======
/**
 * Resumen por asesor:
 * - Group por nombre (asesor_nombre)
 * - Total = suma de cantidades
 * - Min/Max = mínimo/máximo del TOTAL MENSUAL (sumando regímenes) por cada mes del período
 * - Promedio = Total / monthsCount
 * - Edad opcional solo si includeAge = true (usando d.asesor -> ASESOR_FECHAN)
 */
function construirResumen(data, monthKeys, monthsCount, includeAge) {
  const porAsesorMes = new Map(); // nombre -> Map(monthKey -> sumMes)
  const metaAsesor = new Map(); // nombre -> { sum, code }

  for (const d of data) {
    console.log(d.asesor_nombre);
    if (String(d.asesor_nombre).toLowerCase() === "comercial ") continue; // EXCLUIR Comercial
    const nombre = String(d.asesor_nombre ?? "(Sin nombre)");
    const cant = Number(d.cantidad_documentos || 0);
    const codeStr = d.asesor != null ? String(d.asesor).trim() : null;
    const mesKey = `${d.anio}-${String(d.mes).toLowerCase()}`;

    if (!porAsesorMes.has(nombre)) porAsesorMes.set(nombre, new Map());
    const mapMes = porAsesorMes.get(nombre);
    mapMes.set(mesKey, (mapMes.get(mesKey) || 0) + cant);

    if (!metaAsesor.has(nombre))
      metaAsesor.set(nombre, { sum: 0, code: codeStr });
    const meta = metaAsesor.get(nombre);
    meta.sum += cant;
    if (!meta.code && codeStr) meta.code = codeStr;
  }

  const filas = [];
  for (const [asesorNombre, mapMes] of porAsesorMes.entries()) {
    let minMes = Infinity,
      maxMes = -Infinity;
    for (const mk of monthKeys) {
      const v = mapMes.get(mk) || 0;
      if (v < minMes) minMes = v;
      if (v > maxMes) maxMes = v;
    }
    if (monthKeys.length === 0) {
      minMes = 0;
      maxMes = 0;
    }

    const { sum, code } = metaAsesor.get(asesorNombre);
    const promedio = monthsCount > 0 ? sum / monthsCount : 0;

    const fila = {
      asesor: asesorNombre,
      total: sum,
      min: minMes,
      max: maxMes,
      promedio: Number.isFinite(promedio) ? Number(promedio.toFixed(0)) : 0,
    };
    if (includeAge) {
      const dob = code ? ASESOR_FECHAN[code] : null;
      const edadCalc = calcAgeFromDMY(dob);
      fila.edad = edadCalc ?? "";
    }
    filas.push(fila);
  }

  filas.sort((a, b) => b.promedio - a.promedio);
  return filas;
}

function construirResumenPorRegimen(data, monthKeys, monthsCount) {
  const porRegimen = new Map(); // regimen -> rows[]
  for (const d of data) {
    if (String(d.asesor_nombre).toLowerCase() === "comercial") continue; // EXCLUIR Comercial
    const regimen = String(d.regimen ?? "(Sin régimen)");
    if (!porRegimen.has(regimen)) porRegimen.set(regimen, []);
    porRegimen.get(regimen).push(d);
  }

  const resultado = [];
  for (const [regimen, rows] of porRegimen.entries()) {
    const resumen = construirResumen(rows, monthKeys, monthsCount, false);
    resultado.push({ regimen, resumen });
  }
  resultado.sort((a, b) => a.regimen.localeCompare(b.regimen, "es"));
  return resultado;
}

// ====== Componente principal ======
const ReporteAfiliacionesPDF = ({
  data = [],
  anioSeleccionado = "Todos",
  mesSeleccionado = ["Todos"],
}) => {
  // Filtrar fuera "Comercial" lo antes posible para el período y conteos
  const dataFiltrada = useMemo(
    () =>
      data.filter((d) => String(d.asesor_nombre).toLowerCase() !== "comercial"),
    [data]
  );

  const monthKeys = useMemo(
    () =>
      obtenerKeysMesPeriodo({
        anioSeleccionado,
        mesSeleccionado,
        data: dataFiltrada,
      }),
    [anioSeleccionado, mesSeleccionado, dataFiltrada]
  );
  const monthsCount = monthKeys.length;

  const resumenGeneral = useMemo(
    () => construirResumen(dataFiltrada, monthKeys, monthsCount, true),
    [dataFiltrada, monthKeys, monthsCount]
  );

  const resumenPorRegimen = useMemo(
    () => construirResumenPorRegimen(dataFiltrada, monthKeys, monthsCount),
    [dataFiltrada, monthKeys, monthsCount]
  );

  const exportarPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // ======= Encabezado (página 1) =======
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Informe por Asesor", margin, 40);

    const periodo = construirPeriodo({
      anioSeleccionado,
      mesSeleccionado,
      data: dataFiltrada,
    });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Período: ${periodo}`, margin, 58);
    doc.text(`Nº de Meses del período: ${monthsCount}`, margin, 72);
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, margin, 86);

    // ======= Tabla General (página 1) =======
    const totalGeneralSum = resumenGeneral.reduce(
      (acc, r) => acc + (r.total || 0),
      0
    );
    autoTable(doc, {
      head: [
        [
          "Asesor",
          "Edad",
          "Total Afiliaciones",
          "Mínimo",
          "Máximo",
          "Promedio",
        ],
      ],
      body: resumenGeneral.map((r) => [
        r.asesor,
        r.edad,
        r.total,
        r.min,
        r.max,
        r.promedio,
      ]),
      foot: [["TOTAL GENERAL", "", totalGeneralSum, "", "", ""]],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [190, 58, 74], textColor: 255 },
      footStyles: {
        fillColor: [190, 58, 74],
        textColor: 255,
        fontStyle: "bold",
      }, // mismo color que header
      theme: "striped",
      margin: { left: margin, right: margin },
      startY: 100,
      didDrawPage: () => {
        const pageCount = doc.internal.getNumberOfPages();
        const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
        doc.setFontSize(9);
        doc.text(
          `Página ${pageCurrent} de ${pageCount}`,
          pageWidth - margin,
          pageHeight - 10,
          { align: "right" }
        );
      },
    });

    // ======= Tablas por Régimen (cada una en su propia página) =======
    resumenPorRegimen.forEach(({ regimen, resumen }) => {
      doc.addPage();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(`Régimen: ${regimen}`, margin, 40);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Período: ${periodo}`, margin, 56);
      doc.text(`Nº de Meses del período: ${monthsCount}`, margin, 70);

      const totalRegimenSum = resumen.reduce(
        (acc, r) => acc + (r.total || 0),
        0
      );
      autoTable(doc, {
        head: [
          ["Asesor", "Total Afiliaciones", "Mínimo", "Máximo", "Promedio"],
        ],
        body: resumen.map((r) => [r.asesor, r.total, r.min, r.max, r.promedio]),
        foot: [["TOTAL GENERAL", totalRegimenSum, "", "", ""]],
        styles: { fontSize: 10 },
        headStyles: { fillColor: [226, 132, 50], textColor: 255 },
        footStyles: {
          fillColor: [226, 132, 50],
          textColor: 255,
          fontStyle: "bold",
        }, // mismo color que header
        theme: "striped",
        margin: { left: margin, right: margin },
        startY: 90,
        didDrawPage: () => {
          const pageCount = doc.internal.getNumberOfPages();
          const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
          doc.setFontSize(9);
          doc.text(
            `Página ${pageCurrent} de ${pageCount}`,
            pageWidth - margin,
            pageHeight - 10,
            { align: "right" }
          );
        },
      });
    });

    doc.save("informe_resumen_asesores.pdf");
  };

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Button
        style={{
          backgroundColor: "#BE3A4A",
          color: "#FFFFFF",
          marginTop: "20px",
          width: "100%",
          marginRight: "auto",
        }}
        onClick={exportarPDF}
      >
        Exportar PDF
      </Button>
    </div>
  );
};

export default ReporteAfiliacionesPDF;
