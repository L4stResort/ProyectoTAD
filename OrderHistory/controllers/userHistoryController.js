// filepath: UserHistory/src/controllers/userHistoryController.js
const UserHistory = require("../models/userHistoryModel");

// POST /userHistory - save purchase history
const saveUserHistory = async (req, res) => {
    try {
        const { userId, name, products, total, date, cardType, cardNumber } = req.body;
        const history = new UserHistory({
            userId,
            name,
            products,
            total,
            date,
            cardType,
            cardNumber,
        });
        await history.save();
        res.status(201).json({ message: "User history saved" });
    } catch (err) {
        console.error("Error saving user history:", err);
        res.status(500).json({ error: "Error saving user history" });
    }
};

// GET /userHistory?userId=ID - get user history by user ID
const getUserHistory = async (req, res) => {
    try {
        const { userId } = req.query;
        const history = await UserHistory.find({ userId }).sort({ date: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: "Error retrieving user history" });
    }
};

module.exports = {
    saveUserHistory,
    getUserHistory,
};