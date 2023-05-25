// import cors from "cors";
// import express from "express";
// import knex from "knex";
// import config from "./config.js";
// import makeUsersroutes from "./routes/makeUsersRoutes.js";

// const app = express();
// const db = knex(config.db);

// app.use(cors());
// app.use(express.json());

// makeUsersroutes({ app, db, config });

// app.listen(config.server.port, () =>
//   // eslint-disable-next-line no-console
//   console.log(`Listening on :${config.server.port}`)
// );

import cors from "cors"
import express from "express"
import knex from "knex"
import config from "./config.js"
import makeUsersRoutes from "./routes/makeUsersRoutes.js"
import { Model } from "objection"

const app = express()
const db = knex(config.db)

Model.knex(db)

app.use(cors())
app.use(express.json())

makeUsersRoutes({ app, db })

app.listen(config.server.port, () =>
  console.log(`Listening on : ${config.server.port}`)
)
