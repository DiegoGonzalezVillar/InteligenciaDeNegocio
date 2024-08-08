import React from "react";
import { Card, CardMedia } from "@material-ui/core";
import iafap from "./imagenes/IafapPrincipal.svg";

const Principal2 = () => {
  return (
    <div className="h-[calc(100vh-75px)]">
      <div className="grid grid-cols-2 h-full">
        <div className="h-full">
          <Card className="w-full h-full">
            <CardMedia
              component="img"
              image={iafap}
              title="Imagen 1"
              className="w-full h-full object-cover"
            />
          </Card>
        </div>
        <div className="bg-teal-500 h-full"></div>
      </div>
    </div>
  );
};

export default Principal2;
