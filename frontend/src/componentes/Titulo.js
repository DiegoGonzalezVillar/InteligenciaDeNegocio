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
      <h4 style={{ color: "#B83E42", marginTop: "1%" }}>{props.title}</h4>
    </div>
  );
};

export default Titulo;
