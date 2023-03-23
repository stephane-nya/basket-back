import validate from "../midellewares/validate.js";
import {
  validateDisplayName,
  validateEmail,
  validateLimit,
  validateOffset,
  validatePassword,
  validateUsername,
} from "../validator.js";

const makeUsersroutes = ({ app, db, config }) => {
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
      const { email, password, username, displayName } = req.body;

      const [user] = await db("users")
        .insert({
          email,
          passwordHash: password, // TODO-Hash
          passwordSalt: password, // TODO-Hash
          username,
          displayName,
        })
        .returning("*");

      res.send(user); // TODO never send password even Hash!!!
    }
  );
  // READ COLLECTION
  app.get(
    "/users",
    validate({
      query: {
        offset: validateOffset,
        limit: validateLimit,
      },
    }),
    async (req, res) => {
      const { offset, limit } = req.query;
      const users = await db("users")
        .limit(limit)
        .offset(offset * limit);

      res.send(users);
    }
  );
  app.patch("/users", async (req, res) => {});
  app.delete("/users", async (req, res) => {});
};
export default makeUsersroutes;
