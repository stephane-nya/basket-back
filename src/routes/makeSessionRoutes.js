import express from "express"
import validate from "../middlewares/validate.js"
import { validateEmailOrUsername, validatePassword } from "../validators.js"
import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"
import User from "../db/models/User.js"
import checkPassword from "../checkPassword.js"

const makeSessionRoutes = ({ app, db }) => {
  app.post(
    "/sign-in",
    express.json(),
    validate({
      emailOrUsername: validateEmailOrUsername.required(),
      password: validatePassword.required(),
    }),
    async (req, res) => {
      const { emailOrUsername, password } = req.body

      if (!emailOrUsername) {
        res.status(401).send({ error: ["Invalid credentials."] })

        return
      }

      const user = await User.query()
        .where({
          email: emailOrUsername,
        })
        .orWhere({ username: emailOrUsername })

      if (!user) {
        res.status(401).send({ error: ["Invalid credentials."] })

        return
      }

      if (
        user[0].passwordHash !== checkPassword(password, user[0].passwordSalt)
      ) {
        res.status(401).send({ error: ["Invalid credentials."] })
      }

      const jwt = jsonwebtoken.sign(
        {
          session: {
            user: {
              id: user[0].id,
              username: user[0].username,
              displayName: user[0].displayName,
            },
          },
        },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn }
      )

      res.send({ result: [{ jwt }] })
    }
  )
}

export default makeSessionRoutes
