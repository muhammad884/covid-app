import path from "path";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
// import { errorHandler } from "./middleware/errorMiddleware";``
import connectDB from "./config/connectdb.js";
import AdminRouter from "./routes/AdminRoute.js";
import AgentRouter from "./routes/AgentRoute.js";
import PersonRouter from "./routes/PersonRoute.js";
import PersonTravelRouter from "./routes/PersonTravelRoute.js";

const app = express();
const port = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;
// const __dirname = path.resolve(
//   path.dirname(decodeURI(new URL(import.meta.url).pathname))
// );
// cors policy
app.use(cors());
// Database connection
connectDB(DATABASE_URL);
// jsosn parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// load routes
app.use("/covid/admin", AdminRouter);

// agent routes
app.use("/covid/agent", AgentRouter);

// person routes
app.use("/covid/person", PersonRouter);

// person travel routes
app.use("/covid/person/travel", PersonTravelRouter);

import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// app.use(errorHandler);
// Catch all unknown routes ( this middleware runs after all routes have been defined !)
if (process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(path.resolve(__dirname, "../frontend", "build")));

  app.get("*", (req, res, next) => {
    // Serve index.html file if it doesn't recognize the route
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html")); // <- Here !
  });
}

app.listen(port, () => {
  console.log(`server listeing at port: ${port}`);
});
