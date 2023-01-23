const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");

// Todas tienen que pasar por la validacion del token

router.use(validarJWT);
/// Obtener Eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion  es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

// Eliminar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
