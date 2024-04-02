import express from "express";
import morgan from "morgan";
import cors from "cors";
import { mainRouter } from "./v1/routes";

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    Result: "Success",
    Status: 200,
    Protocol: req.protocol,
  });
});

app.use("/api/v1", mainRouter);

const PORT = 8000;

app.listen(PORT, () => {
  console.log("API Running on PORT: ", PORT);
});
