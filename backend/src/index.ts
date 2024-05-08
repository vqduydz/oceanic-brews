import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

import router from "./routes/routes";

dotenv.config();
let app = express();
let port = process.env.PORT;

const options: cors.CorsOptions = {
  origin: true,
};
app.use(cors(options));
app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({ response: "Duy Vũ" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log("_________________________________");
});
