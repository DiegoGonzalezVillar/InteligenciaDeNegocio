import React, { useState } from "react";
import "./style/Principal.css";
import iafap from "./imagenes/iafap.png";
import ActionAreaCard from "./componentes/ActionAreaCard";
import { useEffect } from "react";
import { URL } from "../src/comercial/Constantes";

export const Principal2 = () => {
  const [total, setTotal] = useState("");
  const fecha = new Date();
  const añoActual = fecha.getFullYear();
  let porcentaje = Math.round((total / 8500) * 100);

  let texto = "Inteligencia de Negocio";
  let texto2 = (
    <p>
      En esta web encontraran informacion relevante a la gestión y resultados
      del equipo comercial.
    </p>
  );
  let texto3 = (
    <p>
      Para este año la Gerencia Comercial estableció como{" "}
      <strong> meta anual</strong> la cantidad de <strong>8.500</strong>{" "}
      afiliaciones, el equipo dispone de{" "}
      <strong>18 asesores previsionales y 1 supervisor.</strong>
    </p>
  );
  let texto4 = (
    <p>
      En lo que va del {añoActual}, contamos con un total de{" "}
      <strong>{total}</strong> afiliados, representando el{" "}
      <strong>{porcentaje}%</strong> de la meta antes mencionada.
    </p>
  );
  let texto5 = (
    <p>
      En caso de requerir información adicional, la misma puede ser solicitada
      al siguiente correo electrónico{" "}
      <strong>comercial@integracionafap.com.uy</strong>.
    </p>
  );
  let combinedText = (
    <div>
      <div className="text">{texto}</div>
      <div className="text2">{texto2}</div>
      <div className="text2">{texto3}</div>
      <div className="text2">{texto4}</div>
      <div className="text2">{texto5}</div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${URL}totalAfiliados`, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        const data = await res.json();
        setTotal(data[0].Cantidad);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="principal">
      <div className="div-card">
        <ActionAreaCard image={iafap} alt="img1" />
        <div>{combinedText}</div>
      </div>
      <div className="contenedor"></div>

      <div className="div-card">
        <div></div>
        <ActionAreaCard image={iafap} alt="img1" />
      </div>
    </div>
  );
};
