import cors from "cors";
import express from "express";
import knex from "knex";
import config from "./config.js";
import makeUsersroutes from "./routes/makeUsersRoutes.js";

const app = express();
const db = knex(config.db);

app.use(cors());
app.use(express.json());

makeUsersroutes({ app, db, config });

app.listen(config.server.port, () =>
  // eslint-disable-next-line no-console
  console.log(`Listening on :${config.server.port}`)
);
