import { useEffect, useState } from "react";
import "../style/OficiosPorUsuario.css";
import { URL } from "../comercial/Constantes.js";
import Titulo from "../componentes/Titulo.js";

function DataTable({
  data,
  columnOrder = [],
  strict = false,
  noFormatCols = [],
  headerLabels = {},
}) {
  if (!data || data.length === 0) return <div className="empty">Sin datos</div>;

  const allCols = Array.from(new Set(data.flatMap((row) => Object.keys(row))));
  let cols;
  if (columnOrder.length) {
    const present = (c) => allCols.includes(c);
    cols = columnOrder.filter(present);
    if (!strict)
      cols = [...cols, ...allCols.filter((c) => !columnOrder.includes(c))];
  } else {
    cols = allCols;
  }

  const numberFmt = new Intl.NumberFormat("es-UY");
  const formatCell = (value, key) => {
    if (value == null) return "";
    if (typeof value === "number" && !noFormatCols.includes(key)) {
      return numberFmt.format(value);
    }
    return value;
  };

  // 🔎 Detecta fila de totales según tus datasets
  const isTotalRow = (row) =>
    row?.Departamento === "Total" ||
    row?.Regimen === "Total" ||
    row?.Usuario === "Total";

  // ---------- Helpers de copiado ----------
  const sanitizeTSV = (v) => {
    if (v == null) return "";
    // mantener los números “crudos” sin separadores
    const s = String(v);
    // evitar romper columnas/filas
    return s.replace(/\t/g, " ").replace(/\r?\n/g, " ");
  };
  const escapeHtml = (v) => {
    if (v == null) return "";
    return String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const buildTSV = () => {
    const header = cols
      .map((c) => sanitizeTSV(headerLabels[c] ?? c))
      .join("\t");
    const rows = data.map((row) =>
      cols.map((k) => sanitizeTSV(row[k])).join("\t")
    );
    return [header, ...rows].join("\n");
  };

  const buildHTML = (cols, data, isTotalRow, headerLabels = {}) => {
    const tableStyle =
      "border-collapse:collapse;border:1px solid #eee;font-family:Arial, sans-serif;font-size:12px";
    const thStyle =
      "background:#be3a4a;color:#fff;padding:6px 8px;text-align:center;border:1px solid #eee;font-weight:700";
    const tdBase =
      "border:1px solid #eee;padding:6px 8px;text-align:center;white-space:nowrap";

    const thead = `<tr>${cols
      .map(
        (c) => `<th style="${thStyle}">${escapeHtml(headerLabels[c] ?? c)}</th>`
      )
      .join("")}</tr>`;

    const tbody = data
      .map((row) => {
        const extra = isTotalRow(row)
          ? "font-weight:700;border-top:2px solid #ccc"
          : "";
        const tdStyle = `${tdBase};${extra}`;
        const tds = cols
          .map((k) => `<td style="${tdStyle}">${escapeHtml(row[k])}</td>`)
          .join("");
        return `<tr>${tds}</tr>`;
      })
      .join("");

    return `<!doctype html>
<html><head><meta charset="utf-8"></head><body>
<table style="${tableStyle}">
  <thead>${thead}</thead>
  <tbody>${tbody}</tbody>
</table>
</body></html>`;
  };
  /*
  const copyExcel = async () => {
    const tsv = buildTSV();
    try {
      // mejor esfuerzo moderno
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(tsv);
      } else {
        // fallback legacy
        const ta = document.createElement("textarea");
        ta.value = tsv;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      // opcional: toast o console
      // console.log("Copiado TSV");
    } catch (e) {
      console.error("No se pudo copiar TSV", e);
    }
  };*/

  const copyHTML = async () => {
    const html = buildHTML(cols, data, isTotalRow, headerLabels); // usa la versión inline
    const tsv = buildTSV(); // fallback texto plano por si la app no soporta HTML

    try {
      if (navigator.clipboard?.write && window.ClipboardItem) {
        const item = new window.ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([tsv], { type: "text/plain" }),
        });
        await navigator.clipboard.write([item]);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(tsv);
      } else {
        const ta = document.createElement("textarea");
        ta.value = tsv;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    } catch (e) {
      console.error("No se pudo copiar HTML/TSV", e);
    }
  };

  return (
    <div className="table-wrapper">
      {/* Acciones de copiado */}
      <div className="table-actions">
        {/*<button
          className="btn-copy"
          onClick={copyExcel}
          title="Copiar como TSV para Excel"
        >
          Copiar (Excel)
        </button>*/}
        <button
          className="btn-copy"
          onClick={copyHTML}
          title="Copiar como HTML para PowerPoint/Word"
        >
          Copiar Tabla
        </button>
      </div>

      <table className="table-oficios">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c}>{headerLabels[c] ?? c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={isTotalRow(row) ? "row-total" : undefined}>
              {cols.map((k) => (
                <td key={k}>{formatCell(row[k], k)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const OficiosPorUsuario = () => {
  const [tablas, setTablas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const oficiosPorUsuario = async () => {
    try {
      setLoading(true);
      setErr(null);

      const res = await fetch(`${URL}oficiosPorUsuario`, {
        method: "GET",
        headers: { accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      let data = await res.json();

      // El backend puede devolver {tablas: {...}} o directamente {...}
      const tablasObj = data?.tablas ?? data;

      if (!tablasObj || typeof tablasObj !== "object") {
        throw new Error("Respuesta inesperada del servidor");
      }

      setTablas(tablasObj);
    } catch (e) {
      console.error(e);
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    oficiosPorUsuario();
  }, []);

  return (
    <div className="contenedor-principal2">
      {loading && <div className="loading">Cargando…</div>}
      {err && <div className="error">Error: {err}</div>}

      {!loading && !err && (
        <div className="parent">
          {/* Columna 1 */}
          <div className="col-1">
            <Titulo title="Resumen oficios por usuario" />
            <DataTable
              data={tablas?.resumen_departamento_regimen}
              columnOrder={[
                "Departamento",
                "16713",
                "20130",
                "Transicion",
                "Art 65",
                "Total",
              ]}
              noFormatCols={["Departamento"]}
            />
          </div>

          <div className="col-2">
            <Titulo title="Finalizados" />
            <DataTable
              data={tablas?.departamento_0_resumen}
              columnOrder={["Regimen", "Ratificados", "Finalizados", "Total"]}
              noFormatCols={["Departamento", "Regimen"]}
            />
          </div>

          <div className="div1000Edad">
            <Titulo title="Usuario 1000 — Edad por Régimen" />
            <DataTable
              data={tablas?.depto_1000_edad_por_regimen}
              columnOrder={[
                "Regimen",
                "Mayores_40",
                "Menores_igual_40",
                "Total",
              ]}
              noFormatCols={["Regimen"]}
              strict
              headerLabels={{
                Regimen: "Régimen",
                Mayores_40: "Mayores 40",
                Menores_igual_40: "≤ 40",
              }}
            />
          </div>

          {/* Columna 2 (tres tarjetas apiladas) */}

          <div className="col-2">
            <Titulo title="16713 — Montevideo y Canelones" />
            <DataTable
              data={tablas?.gestion_16713_departamento}
              columnOrder={[
                "Departamento",
                "Sin Gestión",
                "Con Gestión",
                "Total",
              ]}
            />
          </div>

          <div className="col-2">
            <Titulo title="Detalle Canelones" />
            <DataTable
              data={tablas?.detalle_canelones_por_usuario}
              columnOrder={["Usuario", "Sin Gestion", "Con Gestion", "Total"]}
            />
          </div>

          {/* Columna 3 */}
          <div className="col-3">
            <Titulo title="Detalle Montevideo" />
            <DataTable
              data={tablas?.detalle_montevideo_por_usuario}
              columnOrder={["Usuario", "Sin Gestion", "Con Gestion", "Total"]}
              noFormatCols={["Usuario"]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OficiosPorUsuario;
