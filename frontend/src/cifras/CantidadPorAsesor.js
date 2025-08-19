import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

import { Grid } from "@material-ui/core";

import Titulo from "../componentes/Titulo";

const data = [
  { name: "Enero", cantidad: 4000 },
  { name: "Febrero", cantidad: 3000 },
  { name: "Marzo", cantidad: 5000 },
  { name: "Abril", cantidad: 4500 },
  { name: "Mayo", cantidad: 4200 },
  { name: "Junio", cantidad: 6000 },
  { name: "Julio", cantidad: 5500 },
  { name: "Agosto", cantidad: 1000 },
];

const estilosTitulo = {
  color: "#BE3A4A",
  marginTop: "5px",
};

export default function MiGrafica() {
  return (
    <div className="contenedor-principal2">
      <Titulo style={estilosTitulo} title="Cantidad Por Asesor" />
      <Grid
        container
        style={{ gap: "16px" }}
        /*justifyContent="center"
              alignItems="center"*/
      >
        {/* Regimen 16713 */}
        <Grid item xs={12} sm={6} md={3}></Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          style={{ textAlign: "center", marginTop: "150px" }}
        >
          <BarChart width={1000} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#BE3A4A" />

            {/* Línea de referencia en 4000 */}
            <ReferenceLine y={3500} stroke="black" label="" />
          </BarChart>
        </Grid>
      </Grid>
    </div>
  );
}
