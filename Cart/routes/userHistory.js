const express = require("express");
const router = express.Router();
const UserHistory = require("../models/UserHistory");

// POST /userHistory - guardar historial de compra
router.post("/", async (req, res) => {
  try {
    console.log("Datos recibidos en /userHistory:", req.body);
    const { userId, name, products, total, date, cardType, cardNumber } = req.body;
    const history = new UserHistory({
      userId, // <-- Ahora se guarda el id del usuario
      name,
      products,
      total,
      date,
      cardType,
      cardNumber,
    });
    await history.save();
    res.status(201).json({ message: "Historial guardado" });
  } catch (err) {
    console.error("Error al guardar historial:", err);
    res.status(500).json({ error: "Error al guardar el historial" });
  }
});

// GET /userHistory?userId=ID - obtener historial por id de usuario
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const history = await UserHistory.find({ userId }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el historial" });
  }
});

module.exports = router;