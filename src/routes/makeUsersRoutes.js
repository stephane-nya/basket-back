import validate from "../midellewares/validate.js";
import {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../validator.js";

const makeUsersroutes = ({ app, db }) => {
  app.post(
    "/users",
    validate({
      email: validateEmail.required(),
      password: validatePassword.required(),
      username: validateUsername.required(),
      displayName: validateDisplayName.required(),
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
  app.get("/users", async (req, res) => {});
  app.patch("/users", async (req, res) => {});
  app.delete("/users", async (req, res) => {});
};
export default makeUsersroutes;
