const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.status(200).json({
    ok: true,
    eventos: eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);
  // verificar que tenga el evento

  try {
    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `error en la base de datos: ${error}`,
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(400).json({
        ok: false,
        msg: "evento no existe en ",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios de editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hablar con adm",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(400).json({
        ok: false,
        msg: "evento no existe en ",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios de editar este evento",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    res.json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hablar con adm",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
