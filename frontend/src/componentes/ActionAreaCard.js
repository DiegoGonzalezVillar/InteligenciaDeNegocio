import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardContent, Typography } from "@mui/material";
import "../style/Card.css";

const ActionAreaCard = (props) => {
  const { image, alt, text, onClick } = props;
  return (
    <Card className="card" onClick={onClick}>
      <CardActionArea>
        <CardMedia
          className="cardMedia"
          component="img"
          image={image}
          alt={alt}
        />
      </CardActionArea>
      <CardContent>
        <Typography className="texto2">{text}</Typography>
      </CardContent>
    </Card>
  );
};

export default ActionAreaCard;
