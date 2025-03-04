const express = require("express");
const { addExpense, getExpenses, getTotalExpenses } = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.get("/total", authMiddleware, getTotalExpenses);

module.exports = router;
