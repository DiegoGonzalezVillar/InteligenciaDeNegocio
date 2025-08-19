import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function formatFecha(value) {
  if (typeof value === "string") return value;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value ?? "");
  return new Intl.DateTimeFormat("es-UY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export default function DetalleGrid({ detalle = [] }) {
  const rows = React.useMemo(
    () =>
      (detalle ?? []).map((d, i) => ({
        id: `${d.num_id}-${i}`,
        num_id: d.num_id,
        fecha: d.fecha_str,
        cantidad_dias: d.cantidad_dias,
      })),
    [detalle]
  );

  const columns = [
    {
      field: "num_id",
      headerName: "Cedula",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fecha",
      headerName: "Fecha",
      flex: 1.4,
      minWidth: 220,
      align: "center",
      headerAlign: "center",
      valueFormatter: (params) => formatFecha(params.value),
    },
    {
      field: "cantidad_dias",
      headerName: "Cantidad de Días",
      type: "number",
      flex: 0.8,
      minWidth: 160,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <Box
      sx={{
        height: 420,
        width: "100%",
        "& .MuiDataGrid-columnHeaders": {
          color: "#BE3A4A",
          fontWeight: "bold",
        },
        "& .row-yellow": {
          backgroundColor: "#FFF59D", // amarillo claro
        },
        "& .row-red": {
          backgroundColor: "#FFCDD2", // rojo claro
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        pageSizeOptions={[]}
        paginationModel={{ pageSize: 10, page: 0 }}
        getRowClassName={(params) => {
          if (params.row.cantidad_dias === 4) return "row-yellow";
          if (params.row.cantidad_dias > 4) return "row-red";
          return "";
        }}
      />
    </Box>
  );
}
