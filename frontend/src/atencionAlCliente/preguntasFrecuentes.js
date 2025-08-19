import React, { useState } from "react";
import Titulo from "../componentes/Titulo";
import { makeStyles } from "@material-ui/core/styles";

const faqs = [
  {
    pregunta: "¿Cómo me registro en la plataforma?",
    respuesta:
      "Para registrarte, haz clic en el botón 'Registrarse' en la parte superior derecha e ingresa tus datos.",
  },
  {
    pregunta: "¿Puedo modificar mis datos personales?",
    respuesta:
      "Sí, puedes editar tu información desde tu perfil una vez que inicias sesión.",
  },
  {
    pregunta: "¿Qué hago si olvido mi contraseña?",
    respuesta:
      "Haz clic en 'Olvidé mi contraseña' en la pantalla de inicio de sesión y sigue los pasos.",
  },
  {
    pregunta: "¿Cómo me registro en la plataforma?",
    respuesta:
      "Para registrarte, haz clic en el botón 'Registrarse' en la parte superior derecha e ingresa tus datos.",
  },
  {
    pregunta: "¿Puedo modificar mis datos personales?",
    respuesta:
      "Sí, puedes editar tu información desde tu perfil una vez que inicias sesión.",
  },
  {
    pregunta: "¿Qué hago si olvido mi contraseña?",
    respuesta:
      "Haz clic en 'Olvidé mi contraseña' en la pantalla de inicio de sesión y sigue los pasos.",
  },
  {
    pregunta: "¿Cómo me registro en la plataforma?",
    respuesta:
      "Para registrarte, haz clic en el botón 'Registrarse' en la parte superior derecha e ingresa tus datos.",
  },
  {
    pregunta: "¿Puedo modificar mis datos personales?",
    respuesta:
      "Sí, puedes editar tu información desde tu perfil una vez que inicias sesión.",
  },
  {
    pregunta: "¿Qué hago si olvido mi contraseña?",
    respuesta:
      "Haz clic en 'Olvidé mi contraseña' en la pantalla de inicio de sesión y sigue los pasos.",
  },
  {
    pregunta: "¿Cómo me registro en la plataforma?",
    respuesta:
      "Para registrarte, haz clic en el botón 'Registrarse' en la parte superior derecha e ingresa tus datos.",
  },
  {
    pregunta: "¿Puedo modificar mis datos personales?",
    respuesta:
      "Sí, puedes editar tu información desde tu perfil una vez que inicias sesión.",
  },
  {
    pregunta: "¿Qué hago si olvido mi contraseña?",
    respuesta:
      "Haz clic en 'Olvidé mi contraseña' en la pantalla de inicio de sesión y sigue los pasos.",
  },
  {
    pregunta: "¿Cómo me registro en la plataforma?",
    respuesta:
      "Para registrarte, haz clic en el botón 'Registrarse' en la parte superior derecha e ingresa tus datos.",
  },
  {
    pregunta: "¿Puedo modificar mis datos personales?",
    respuesta:
      "Sí, puedes editar tu información desde tu perfil una vez que inicias sesión.",
  },
  {
    pregunta: "¿Qué hago si olvido mi contraseña?",
    respuesta:
      "Haz clic en 'Olvidé mi contraseña' en la pantalla de inicio de sesión y sigue los pasos.",
  },
  {
    pregunta: "¿Cómo me registro en la plataforma?",
    respuesta:
      "Para registrarte, haz clic en el botón 'Registrarse' en la parte superior derecha e ingresa tus datos.",
  },
  {
    pregunta: "¿Puedo modificar mis datos personales?",
    respuesta:
      "Sí, puedes editar tu información desde tu perfil una vez que inicias sesión.",
  },
  {
    pregunta: "¿Qué hago si olvido mi contraseña?",
    respuesta:
      "Haz clic en 'Olvidé mi contraseña' en la pantalla de inicio de sesión y sigue los pasos.",
  },
];

const useStyles = makeStyles({
  card: {
    width: "10%",
    margin: "10px",
  },
  media: {
    height: 180,
    backgroundSize: "auto",
  },
  texto: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#BE3A4A",
    textAlign: "center",
  },
  textoTitulo: {
    color: "#BE3A4A",
    marginTop: "15px",
  },
});

const FAQ = () => {
  const [activo, setActivo] = useState(null);
  const classes = useStyles();
  const toggle = (index) => {
    setActivo(activo === index ? null : index);
  };

  return (
    <div style={{ paddingTop: "75px" }}>
      <Titulo
        className={classes.textoTitulo}
        style={{ marginTop: "1rem" }}
        title="Preguntas Frecuentes"
      />
      <div className="max-w-3xl mx-auto p-4">
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-md">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-4 py-2 font-medium bg-gray-100 hover:bg-gray-200"
              >
                {faq.pregunta}
              </button>
              {activo === index && (
                <div className="px-4 py-2 text-gray-700 bg-white">
                  {faq.respuesta}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
