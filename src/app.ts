import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("combined"));
app.use(cors());

const PORT = 8000;

app.listen(PORT, () => {
  console.log("API Running on PORT: ", PORT);
});
