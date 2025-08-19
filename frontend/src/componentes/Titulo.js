import React from "react";

const Titulo = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h4 style={{ ...props.style, color: "#BE3A4A" }}>{props.title}</h4>
    </div>
  );
};

export default Titulo;
