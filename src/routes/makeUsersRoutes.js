// import validate from "../midellewares/validate.js";
// import {
//   validateDisplayName,
//   validateEmail,
//   validateLimit,
//   validateOffset,
//   validatePassword,
//   validateUsername,
// } from "../validator.js";

// const makeUsersroutes = ({ app, db, config }) => {
//   // CREATE
//   app.post(
//     "/users",
//     validate({
//       body: {
//         email: validateEmail.required(),
//         password: validatePassword.required(),
//         username: validateUsername.required(),
//         displayName: validateDisplayName.required(),
//       },
//     }),
//     async (req, res) => {
//       const { email, password, username, displayName } = req.body;

//       const [user] = await db("users")
//         .insert({
//           email,
//           passwordHash: password, // TODO-Hash
//           passwordSalt: password, // TODO-Hash
//           username,
//           displayName,
//         })
//         .returning("*");

//       res.send(user); // TODO never send password even Hash!!!
//     }
//   );
//   // READ COLLECTION
//   app.get(
//     "/users",
//     validate({
//       query: {
//         offset: validateOffset,
//         limit: validateLimit,
//       },
//     }),
//     async (req, res) => {
//       const { offset, limit } = req.query;
//       const users = await db("users")
//         .limit(limit)
//         .offset(offset * limit);

//       res.send(users);
//     }
//   );
//   app.patch("/users", async (req, res) => {});
//   app.delete("/users", async (req, res) => {});
// };
// export default makeUsersroutes;

import User from "../db/models/User.js";
import filterDBResult from "../filterDBResult.js";
import hashPassword from "../hashPassword.js";
import validate from "../middlewares/validate.js";
import {
  validateId,
  validateEmail,
  validatePassword,
  validateDisplayName,
  validateUsername,
} from "../validators.js";

const makeUsersRoutes = ({ app }) => {
  // CREATE
  app.post(
    "/users",
    validate({
      body: {
        email: validateEmail.required(),
        password: validatePassword.required(),
        username: validateUsername.required(),
        displayName: validateDisplayName.required(),
      },
    }),
    async (req, res) => {
      const { email, password, displayName, username } = req.body;

      const [passwordHash, passwordSalt] = hashPassword(password);

      const user = await User.query()
        .insert({
          email,
          passwordHash,
          passwordSalt,
          displayName,
          username,
        })
        .returning("*");

      res.send({ result: filterDBResult([user]), count: 1 });
    }
  );
};

export default makeUsersRoutes;
