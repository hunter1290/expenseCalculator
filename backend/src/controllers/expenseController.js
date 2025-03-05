const Expense = require("../models/Expense");
const mongoose = require("mongoose")

const addExpense = async (req, res) => {
     console.log(req.body);
    try {
        const { amount, category, date, description } = req.body;
        const newExpense = new Expense({
            user: req.user.id,
            amount,
            category,
            date,
            description
        });

        await newExpense.save();
        res.status(201).json({ message: "Expense added successfully", expense: newExpense });
    } catch (error) {
        res.status(500).json({ message: "Error adding expense", error });
    }
};

// ✅ Get all expenses for the logged-in user
const getExpenses = async (req, res) => {
    try {
        const { category, date } = req.query;
        let filter = { user: req.user.id };

        if (category) filter.category = category;
        if (date) filter.date = new Date(date);

        const expenses = await Expense.find(filter).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving expenses", error });
    }
};

// ✅ Get total expenses for a given period
const getTotalExpenses = async (req, res) => {
    try {
        const { start, end } = req.query;
        if (!start || !end) {
            return res.status(400).json({ message: "Start and end dates are required" });
        }

        console.log("Raw Start:", start, "Raw End:", end);

        // Convert to Date objects
        const startDate = new Date(start);
        const endDate = new Date(end);

        console.log("Converted Start:", startDate, "Converted End:", endDate);
        console.log("User ID:", req.user?.id);

        // Validate Dates
        if (isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Debug existing expenses
        const existingExpenses = await Expense.find({ user: req.user.id });
        console.log("User Expenses Count:", existingExpenses.length);

        // Aggregation pipeline
        const total = await Expense.aggregate([
            { 
                $match: { 
                    user: new mongoose.Types.ObjectId(req.user.id),  // Fixed ObjectId issue
                    date: { $gte: startDate, $lte: endDate }  // No need to wrap in new Date() again
                } 
            },
            { 
                $group: { 
                    _id: null, 
                    totalAmount: { $sum: "$amount" } 
                } 
            }
        ]);

        console.log("Total Aggregated Amount:", total.length > 0 ? total[0].totalAmount : 0);

        res.status(200).json({ total: total.length > 0 ? total[0].totalAmount : 0 });
    } catch (error) {
        console.error("Error in getTotalExpenses:", error);
        res.status(500).json({ message: "Error calculating total expenses", error });
    }
};


module.exports = { addExpense, getExpenses, getTotalExpenses };
