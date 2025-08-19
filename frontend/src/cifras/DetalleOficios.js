import React, { useEffect, useState } from "react";
import Titulo from "../componentes/Titulo";
import { Card, CardContent, Grid, Typography, Button } from "@material-ui/core";

import { Modal, Table } from "react-bootstrap";
import { URL } from "../comercial/Constantes";
import { makeStyles } from "@material-ui/core/styles";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

import { IconButton, Tooltip as MuiTooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

//const COLORS16713 = ["#E28432", "#D0702A", "#F6A85A", "#A15121", "#F4B77F"];

const COLORS_MIXED = [
  "#6C6252", // de COLORS16713
  "#8E2B34", // de COLORS20130
  "#E28432", // de COLORS20130
];

const coloresArticulo8 = {
  Opta: "#E28432",
  "No Opta": "#8E2B34",
  "No Realiza Opción": "#6C6252",
  20130: "#FF5722",
};

const coloresRangoEdad = {
  "<26": "#E28432",
  "entre 26 y 40": "#8E2B34",
  ">40": "#6C6252",
};

//const COLORS20130 = ["#BE3A4A", "#8E2B34", "#D15A6A", "#F06D7A", "#F9B0B6"];

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: "90%",
    margin: "10px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },

  card2: {
    width: "100%",
    height: "90%",
    margin: "10px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },

  card3: {
    width: "100%",
    height: "90%",
    margin: "10px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  texto: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#E28432",
  },
  texto2: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#BE3A4A",
  },
  texto3: {
    fontWeight: "bold",
    fontSize: "26px",
    color: "#E28432",
  },
  texto4: {
    fontWeight: "bold",
    fontSize: "26px",
    color: "#BE3A4A",
  },
  ul: {
    listStyleType: "none",
    paddingLeft: 0,
    "& li": {
      marginBottom: "5px",
    },
  },
});

const DetalleOficios = () => {
  const estilosTitulo = {
    color: "#BE3A4A",
    marginTop: "5px",
  };
  const classes = useStyles();

  const [datos, setDatos] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openModal16713, setOpenModal16713] = useState(false);
  const [openModal20130, setOpenModal20130] = useState(false);
  const [accionSeleccionada16713, setAccionSeleccionada16713] = useState(null);
  const [showDepartamentosModal16713, setShowDepartamentosModal16713] =
    useState(false);
  const [accionSeleccionada20130, setAccionSeleccionada20130] = useState(null);
  const [showDepartamentosModal20130, setShowDepartamentosModal20130] =
    useState(false);

  const handleMouseEnter = (e) => {
    setShowMessage(true);
    setMousePosition({ x: e.clientX, y: e.clientY }); // Guarda la posición del mouse
  };

  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY }); // Actualiza la posición del mouse
  };

  // Manejar el evento de clic en la barra de "Finalizados"
  const handleBarClick16713 = () => {
    setOpenModal16713(true); // Abrir el modal
  };

  const handleBarClick20130 = () => {
    setOpenModal20130(true); // Abrir el modal
  };

  const handleClose16713 = () => {
    setOpenModal16713(false); // Cerrar el modal
  };

  const handleClose20130 = () => {
    setOpenModal20130(false); // Cerrar el modal
  };

  // Función para abrir el modal con los detalles por departamento
  const handleRowClick16713 = (accion) => {
    setAccionSeleccionada16713(accion);
    setShowDepartamentosModal16713(true);
  };

  const handleRowClick20130 = (accion) => {
    setAccionSeleccionada20130(accion);
    setShowDepartamentosModal20130(true);
  };

  // Función para cerrar el modal de departamentos
  const handleCloseDepartamentosModal = () => {
    setShowDepartamentosModal16713(false);
    setAccionSeleccionada16713(null);
  };

  // Función para cerrar el modal de departamentos
  const handleCloseDepartamentosModal20130 = () => {
    setShowDepartamentosModal20130(false);
    setAccionSeleccionada20130(null);
  };

  const obtenerDatos = async () => {
    const res = await fetch(`${URL}asignacionesDeOficio`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    const datos = JSON.parse(data);
    setDatos(datos);
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  if (!datos) {
    return (
      <div className="contenedor-principal2">
        <Typography
          style={{ textAlign: "center", marginTop: "25px" }}
          className={classes.texto}
        >
          Cargando datos...
        </Typography>
      </div>
    );
  }
  const trabajables16713 = datos.cantidad_datos_trabajables_16713;

  const trabajables20130 = datos.cantidad_datos_trabajables_20130;

  const detallePendientes16713 = datos.detalle_pendiente_por_ultima_accion
    .filter((item) => item.regimen === "16713") // Filtrar por régimen
    .reduce((acc, item) => {
      let accion = item.ultima_accion.trim(); // Remover espacios adicionales
      accion = accion === "SIN ACCION" ? "SIN ACCION" : "CON ACCION";
      // Usar la categoría de edad directamente desde el objeto
      const categoriaEdad = item.categoria_edad;

      // Crear clave combinada para agrupación
      const clave = `${accion} - ${categoriaEdad}`;

      if (!acc[clave]) {
        acc[clave] = {
          total: 0,
          departamentos: [],
        }; // Inicializar estructura para total y departamentos
      }

      acc[clave].total += item.count; // Sumar la cantidad de documentos
      acc[clave].departamentos.push({
        departamento: item.departamento.trim(), // Limpiar espacios en el nombre del departamento
        documento: item.count,
      });

      return acc;
    }, {});

  const detallePendientesAgrupados = Object.keys(detallePendientes16713)
    .map((clave) => {
      const [accion, categoriaEdad] = clave.split(" - "); // Separar clave en acción y categoría de edad
      return {
        ultima_accion: accion,
        categoria_edad: categoriaEdad,
        total: detallePendientes16713[clave].total, // Cantidad total por acción y edad
        departamentos: detallePendientes16713[clave].departamentos, // Departamentos
      };
    })
    .sort((a, b) => b.total - a.total); // Ordenar de mayor a menor por cantidad

  const detallePendientes20130 = datos.detalle_pendiente_por_ultima_accion
    .filter((item) => item.regimen === "20130") // Filtrar por régimen
    .reduce((acc, item) => {
      let accion = item.ultima_accion.trim(); // Remover espacios adicionales
      accion = accion === "SIN ACCION" ? "SIN ACCION" : "CON ACCION"; // Agrupar todas las demás acciones en "CON ACCION"

      // Usar la categoría de edad directamente desde el objeto
      const categoriaEdad = item.categoria_edad;

      // Crear clave combinada para agrupación
      const clave = `${accion} - ${categoriaEdad}`;

      if (!acc[clave]) {
        acc[clave] = {
          total: 0,
          departamentos: [],
        }; // Inicializar estructura para total y departamentos
      }

      acc[clave].total += item.count; // Sumar la cantidad de documentos
      acc[clave].departamentos.push({
        departamento: item.departamento.trim(), // Limpiar espacios en el nombre del departamento
        documento: item.count,
      });

      return acc;
    }, {});

  const detallePendientesAgrupados20130 = Object.keys(detallePendientes20130)
    .map((clave) => {
      const [accion, categoriaEdad] = clave.split(" - "); // Separar clave en acción y categoría de edad
      return {
        ultima_accion: accion,
        categoria_edad: categoriaEdad,
        total: detallePendientes20130[clave].total, // Cantidad total por acción y edad
        departamentos: detallePendientes20130[clave].departamentos, // Departamentos
      };
    })
    .sort((a, b) => b.total - a.total); // Ordenar de mayor a menor por cantidad

  const finalizados16713 = datos.cantidad_datos_finalizados_16713;
  const finalizados20130 = datos.cantidad_datos_finalizados_20130;
  const ratificados16713 = datos.detalle_finalizado_ratificado.find(
    (item) => item.regimen === "16713"
  );

  const ratificados20130 = datos.detalle_finalizado_ratificado.find(
    (item) => item.regimen === "20130"
  );

  const finalizados16713detalle =
    datos.detalle_finalizado_por_ultima_accion.filter(
      (item) => item.regimen === "16713"
    );

  const finalizados20130detalle =
    datos.detalle_finalizado_por_ultima_accion.filter(
      (item) => item.regimen === "20130"
    );

  const pendientes16713 = datos.cantidad_datos_pendientes_16713;
  const pendientes20130 = datos.cantidad_datos_pendientes_20130;

  const finalizados16713_sin_ratificaciones = finalizados16713detalle
    .filter((item) => item.regimen === "16713")
    .reduce((total, item) => total + item.documento, 0);

  const finalizados20130_sin_ratificaciones = finalizados20130detalle
    .filter((item) => item.regimen === "20130")
    .reduce((total, item) => total + item.documento, 0);

  // Prepare data for the PieChart
  const pieData16713 = finalizados16713detalle
    .filter(
      (item) =>
        item.ultima_accion.trim() !== "SIN ACTIVIDAD" &&
        !item.ultima_accion.trim().includes("AFILIADO")
    ) // Filtra los elementos con "Sin actividad"
    .map((item) => ({
      name: item.ultima_accion.trim(),
      value: item.documento,
    }));

  // Prepare data for the PieChart
  const pieData = finalizados20130detalle
    .filter(
      (item) =>
        item.ultima_accion.trim() !== "SIN ACTIVIDAD" &&
        !item.ultima_accion.trim().includes("AFILIADO")
    ) // Filtra los elementos con "Sin actividad"
    .map((item) => ({
      name: item.ultima_accion.trim(),
      value: item.documento,
    }));

  const data_para_barras_16713 = [
    {
      Finalizados: finalizados16713,
      Pendientes: pendientes16713,
    },
  ];

  const mayores_a_40_16713 =
    pendientes16713 + finalizados16713 - trabajables16713;

  const datosFiltrados_20130_por_edad =
    datos.distribucion_rat_rango_edad.filter(
      (dato) => dato.regimen !== "16713"
    );

  const data_para_barras_20130_por_edad = [
    ...datosFiltrados_20130_por_edad,
  ].sort((a, b) => {
    const order = ["<26 ", "entre 26 y 40", ">40"];
    return order.indexOf(a.rango_edad) - order.indexOf(b.rango_edad);
  });

  const data_para_barras_20130 = [
    {
      Finalizados: finalizados20130,
      Pendientes: pendientes20130,
    },
  ];

  const datosFiltrados_opcion_articulo_8 = datos.opta_articulo_8.filter(
    (dato) => dato.resultado_opcion !== "20130"
  );

  const datos_opcion_articulo_8_Ordenados = [
    ...datosFiltrados_opcion_articulo_8,
  ].sort((a, b) => {
    const order = ["Opta", "No Opta", "No Realiza Opción"];
    return (
      order.indexOf(a.resultado_opcion) - order.indexOf(b.resultado_opcion)
    );
  });
  const maxValor = Math.max(
    ...datos_opcion_articulo_8_Ordenados.map((d) => d.cantidad)
  );
  const maxConMargen = Math.ceil((maxValor + 250) / 100) * 100; // Redondeado

  const maxValor20130 = Math.max(
    ...data_para_barras_20130_por_edad.map((d) => d.cantidad)
  );
  const maxConMargen20130 = Math.ceil((maxValor20130 + 250) / 100) * 100; // Redondeado

  return (
    <div className="contenedor-principal2">
      <Titulo style={estilosTitulo} title="Detalle Asignaciones de Oficio" />
      <Grid
        container
        style={{ gap: "16px" }}
        /*justifyContent="center"
        alignItems="center"*/
      >
        {/* Regimen 16713 */}
        <Grid item xs={12} sm={6} md={1}>
          <Typography
            style={{ textAlign: "center", marginTop: "150px" }}
            className={classes.texto3}
          >
            16.713
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className={classes.card}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <CardContent>
              <Typography className={classes.texto}>
                Trabajables: {trabajables16713}
              </Typography>
              {/* Condicionalmente muestra el mensaje fuera de la gráfica */}
              {showMessage && (
                <div
                  style={{
                    position: "absolute",
                    top: mousePosition.y + 15, // Añade un poco de espacio del cursor
                    left: mousePosition.x + 15,
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    padding: "8px",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000, // Para que esté por encima de otros elementos
                    pointerEvents: "none", // Evita que interfiera con el mouse
                  }}
                >
                  <Typography className={classes.texto}>
                    Los finalizados incluyen {mayores_a_40_16713} datos mayores
                    a 40 años
                  </Typography>
                </div>
              )}

              <ResponsiveContainer
                width="100%"
                height={270} // Maneja los eventos del mouse para mostrar/ocultar el mensaje
              >
                {" "}
                <BarChart
                  data={data_para_barras_16713}
                  margin={{ top: 20, right: 20, left: 20 }}
                  barGap={50}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis // Ajusta el rango del eje Y para que comience en 0 y termine en el máximo de los datos.
                    tickCount={6} // Define cuántas divisiones (ticks) quieres en el eje Y.
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Finalizados" fill="#E28432" barSize={80}>
                    <LabelList
                      dataKey="Finalizados"
                      position="top"
                      fill="#E28432"
                    />
                  </Bar>
                  <Bar
                    dataKey="Pendientes"
                    fill="#9c9c9c"
                    barSize={80}
                    onClick={(data) => handleBarClick16713(data)}
                  >
                    <LabelList dataKey="Pendientes" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card2}>
            <CardContent>
              <Typography className={classes.texto}>
                Ratificados: {ratificados16713.cantidad} (Art 8)
              </Typography>
              <ResponsiveContainer width="100%" height={270}>
                <BarChart
                  data={datos_opcion_articulo_8_Ordenados}
                  margin={{ top: 15, right: 20, left: 22 }}
                  layout="vertical"
                  barGap={50}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    tickCount={8}
                    domain={[0, maxConMargen]}
                    allowDataOverflow={true}
                  />
                  <YAxis type="category" dataKey="resultado_opcion" />
                  <Tooltip />
                  <Bar dataKey="cantidad" barSize={50}>
                    {/* Aplica el color a cada barra */}
                    {datos_opcion_articulo_8_Ordenados.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={coloresArticulo8[entry.resultado_opcion]}
                      />
                    ))}
                    <LabelList dataKey="cantidad" position="right" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card3}>
            <CardContent>
              <Typography className={classes.texto}>
                Detalle Finalizados: {" " + finalizados16713_sin_ratificaciones}
              </Typography>
              {/* PieChart con etiquetas externas */}
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData16713}
                    cx={150}
                    cy={140}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData16713.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS_MIXED[index % COLORS_MIXED.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="top"
                    formatter={(value, entry, index) => (
                      <span
                        style={{
                          color: COLORS_MIXED[index % COLORS_MIXED.length],
                        }}
                      >
                        {value}
                      </span>
                    )}
                    wrapperStyle={{
                      marginTop: "90px", // Ajusta este valor para bajar la leyenda
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={1}
          style={{ marginLeft: "90px", marginTop: "120px" }}
        >
          <MuiTooltip
            title="La diferencia generada entre la suma de Ratificados y el Detalle
            Finalizados con respecto al total de datos finalizados por ley, es
            debido a que se están contabilizando acciones de 'Ratificado' 
            (realizadas en el corriente día), que aún no están creadas en la
            tabla de Ratificaciones."
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: "1.2rem", // <-- tamaño de letra
                  lineHeight: 1.4, // opcional, para mejor legibilidad
                  whiteSpace: "pre-line", // si querés respetar saltos de línea
                  textAlign: "justify",
                },
              },
            }}
          >
            <IconButton
              size="large"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#8E2B34",
              }}
            >
              <InfoIcon
                fontSize="large"
                sx={{
                  color: "#8E2B34",
                }}
              />
            </IconButton>
          </MuiTooltip>
        </Grid>

        {/* Regimen 20130 */}
        <Grid item xs={12} sm={6} md={1}>
          <Typography
            style={{ textAlign: "center", marginTop: "150px" }}
            className={classes.texto4}
          >
            20.130
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.texto2}>
                Trabajables: {trabajables20130}
              </Typography>
              <ResponsiveContainer width="100%" height={270}>
                {" "}
                {/* Cambié el height a 200 */}
                <BarChart
                  data={data_para_barras_20130}
                  margin={{ top: 20, right: 20, left: 20 }}
                  barGap={50}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis // Ajusta el rango del eje Y para que comience en 0 y termine en el máximo de los datos.
                    tickCount={6} // Define cuántas divisiones (ticks) quieres en el eje Y.
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Finalizados" fill="#BE3A4A" barSize={80}>
                    <LabelList
                      dataKey="Finalizados"
                      position="top"
                      fill="#BE3A4A"
                    />
                  </Bar>
                  <Bar
                    dataKey="Pendientes"
                    fill="#9c9c9c"
                    barSize={80}
                    onClick={(data) => handleBarClick20130(data)}
                  >
                    <LabelList dataKey="Pendientes" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card2}>
            <CardContent>
              <Typography className={classes.texto2}>
                Ratificados: {ratificados20130.cantidad} (por edad)
              </Typography>
              <ResponsiveContainer width="100%" height={270}>
                <BarChart
                  data={data_para_barras_20130_por_edad}
                  margin={{ top: 15, right: 20, left: 22 }}
                  layout="vertical"
                  barGap={50}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, maxConMargen20130]} />
                  <YAxis type="category" dataKey="rango_edad" />
                  <Tooltip />
                  <Bar dataKey="cantidad" barSize={50}>
                    {/* Aplica el color a cada barra */}
                    {data_para_barras_20130_por_edad.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={coloresRangoEdad[entry.rango_edad]}
                      />
                    ))}
                    <LabelList dataKey="cantidad" position="right" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card3}>
            <CardContent>
              <Typography className={classes.texto2}>
                Detalle Finalizados: {" " + finalizados20130_sin_ratificaciones}
              </Typography>
              {/* PieChart con etiquetas externas */}
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx={150}
                    cy={140}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS_MIXED[index % COLORS_MIXED.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="top"
                    formatter={(value, entry, index) => (
                      <span
                        style={{
                          color: COLORS_MIXED[index % COLORS_MIXED.length],
                        }}
                      >
                        {value}
                      </span>
                    )}
                    wrapperStyle={{
                      marginTop: "90px", // Ajusta este valor para bajar la leyenda
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        {/* Modal que muestra el detalle 16713*/}
        <Modal
          animation={false}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "25%",
            width: "50%",
          }}
          show={openModal16713}
          onHide={handleClose16713}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#E28432" }}>
              Detalle Pendientes (16713)
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Mostrar la tabla con los datos */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ color: "#E28432" }}>Última Acción</th>
                  <th style={{ color: "#E28432" }}>Rango Edad</th>
                  <th style={{ color: "#E28432" }}>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {detallePendientesAgrupados.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick16713(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{item.ultima_accion.trim()}</td>{" "}
                    <td>{item.categoria_edad.trim()}</td>{" "}
                    {/* .trim() para limpiar espacios adicionales */}
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secundario"
              onClick={handleClose16713}
              style={{ color: "#E28432" }}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal que muestra el detalle 20130*/}
        <Modal
          animation={false}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "25%",
            width: "50%",
          }}
          show={openModal20130}
          onHide={handleClose20130}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#BE3A4A" }}>
              Detalle Pendientes (20130)
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Mostrar la tabla con los datos */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ color: "#BE3A4A" }}>Última Acción</th>
                  <th style={{ color: "#BE3A4A" }}>Rango Edad</th>
                  <th style={{ color: "#BE3A4A" }}>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {detallePendientesAgrupados20130.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      handleRowClick20130(item);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{item.ultima_accion.trim()}</td>{" "}
                    <td>{item.categoria_edad.trim()}</td>{" "}
                    {/* .trim() para limpiar espacios adicionales */}
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secundario"
              onClick={handleClose20130}
              style={{ color: "#BE3A4A" }}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Segundo modal para mostrar los departamentos por acción */}
        <Modal
          show={showDepartamentosModal16713}
          onHide={handleCloseDepartamentosModal}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#BE3A4A" }}>
              Detalle por Departamento -{" "}
              {accionSeleccionada16713?.ultima_accion}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Mostrar la tabla con los departamentos */}
            {accionSeleccionada16713 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ color: "#BE3A4A" }}>Departamento</th>
                    <th style={{ color: "#BE3A4A" }}>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(
                    accionSeleccionada16713.departamentos.reduce((acc, dep) => {
                      const depto = dep.departamento.trim(); // Limpiar espacios adicionales
                      if (!acc[depto]) {
                        acc[depto] = 0;
                      }
                      acc[depto] += Number(dep.documento); // Sumar documentos del mismo departamento
                      return acc;
                    }, {})
                  )
                    .filter(([_, total]) => total !== 0)
                    .sort((a, b) => b[1] - a[1]) // Ordenar de mayor a menor por cantidad de documentos
                    .map(([departamento, documento], index) => (
                      <tr key={index}>
                        <td>{departamento}</td>
                        <td>{documento}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDepartamentosModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Segundo modal para mostrar los departamentos por acción */}
        <Modal
          show={showDepartamentosModal20130}
          onHide={handleCloseDepartamentosModal20130}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#BE3A4A" }}>
              Detalle por Departamento -{" "}
              {accionSeleccionada20130?.ultima_accion}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Mostrar la tabla con los departamentos */}
            {accionSeleccionada20130 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ color: "#BE3A4A" }}>Departamento</th>
                    <th style={{ color: "#BE3A4A" }}>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(
                    accionSeleccionada20130.departamentos.reduce((acc, dep) => {
                      const depto = dep.departamento.trim(); // Limpiar espacios adicionales
                      if (!acc[depto]) {
                        acc[depto] = 0;
                      }
                      acc[depto] += Number(dep.documento); // Sumar documentos del mismo departamento
                      return acc;
                    }, {})
                  )
                    .filter(([_, total]) => total !== 0)
                    .sort((a, b) => b[1] - a[1]) // Ordenar de mayor a menor por cantidad de documentos
                    .map(([departamento, documento], index) => (
                      <tr key={index}>
                        <td>{departamento}</td>
                        <td>{documento}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseDepartamentosModal20130}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Grid>
    </div>
  );
};

export default DetalleOficios;
