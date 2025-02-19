import * as Yup from "yup";

export const searchSchema = Yup.object({
  query: Yup.string()
    .max(25, "Máximo 25 caracteres")
    .matches(/^[a-zA-Z0-9\s]*$/, "No se permiten caracteres especiales")
});
