import * as yup from "yup";

export const validateEmail = yup.string().email().trim().label("E-mail");

export const validatePassword = yup
  .string()
  .min(8)
  .matches(/\w/, "Password must contain at least a special character")
  .label("Password");

export const validateUsername = yup
  .string()
  .min(2)
  .max(15)
  .matches(
    /ˆ[a-z][a-z0-9._]{1,14}$/,
    "Username must contain only letters, numbers, '.' and '_' "
  )
  .label("Username");

export const validateDisplayName = yup
  .string()
  .min()
  .max()
  .trim()
  .matches(/[ˆ\n\r\u00a0]/)
  .label("DisplayName");
