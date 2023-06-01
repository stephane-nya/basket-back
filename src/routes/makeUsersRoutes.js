import User from "../db/models/User.js"
import filterDBResult from "../filterDBResult.js"
import hashPassword from "../hashPassword.js"
import validate from "../middlewares/validate.js"
import {
  validateId,
  validateEmail,
  validatePassword,
  validateDisplayName,
  validateUsername,
} from "../validators.js"

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
      const { email, password, displayName, username } = req.body

      const [passwordHash, passwordSalt] = hashPassword(password)

      const user = await User.query()
        .insert({
          email,
          passwordHash,
          passwordSalt,
          displayName,
          username,
        })
        .returning("*")

      res.send({ result: filterDBResult([user]), count: 1 })
    }
  )
}

export default makeUsersRoutes
