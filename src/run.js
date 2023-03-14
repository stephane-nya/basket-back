import cors from "cors";
import express from "express";
import knex from "knex";
import config from "./config.js";
import makeUsersroutes from "./routes/makeUsersRoutes.js";

const app = express();
const db = knex(config.db);

app.use(cors());
// users
makeUsersroutes({ app });
// posts
// comments
app.use(express.json());

app.listen(config.server.port, () =>
  // eslint-disable-next-line no-console
  console.log(`Listening on :${config.server.port}`)
);
