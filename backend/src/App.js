import express from "express";
import afapsRoutes from "./routes/afaps.routes";
const fileUpload = require("express-fileupload");

const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(cors());
app.use(afapsRoutes);
app.use(express.json());

export default app;
