import validate from "../midellewares/validate.js";
import {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../validator.js";

const makeUsersroutes = ({ app }) => {
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

      console.log("WORKS");

      res.send("IT WORKED");
    }
  );
  app.post("/users", async (req, res) => {});
  app.get("/users", async (req, res) => {});
  app.patch("/users", async (req, res) => {});
  app.delete("/users", async (req, res) => {});
};
export default makeUsersroutes;
