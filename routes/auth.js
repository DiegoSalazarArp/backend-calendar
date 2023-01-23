/*
    Rutas de usuario/auth
    host + /api/auth
*/
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  crearUsuario,
  loginUsuario,
  revalidarTokens,
} = require("../controllers/auth");

router.post(
  "/new",
  [
    // middlewares
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWT,  revalidarTokens);

module.exports = router;
