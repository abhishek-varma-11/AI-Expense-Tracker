const Transaction = require("../models/Transaction");


// ==========================================
// Create Transaction
// ==========================================

async function createTransaction(req, res) {
    try {
        const {
            type,
            title,
            amount,
            category,
            date,
            description
        } = req.body;

        if (
            !type ||
            !title ||
            amount === undefined ||
            !category ||
            !date
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Type, title, amount, category, and date are required"
            });
        }

        const transaction = await Transaction.create({
            user: req.user.userId,
            type,
            title: title.trim(),
            amount,
            category: category.trim(),
            date,
            description: description
                ? description.trim()
                : ""
        });

        res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            transaction
        });
    } catch (error) {
        console.error(
            "Create transaction error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server error while creating transaction"
        });
    }
}


// ==========================================
// Get All Transactions
// ==========================================

async function getTransactions(req, res) {
    try {
        const transactions = await Transaction.find({
            user: req.user.userId
        }).sort({
            date: -1,
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: transactions.length,
            transactions
        });
    } catch (error) {
        console.error(
            "Get transactions error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server error while fetching transactions"
        });
    }
}


// ==========================================
// Get Transaction By ID
// ==========================================

async function getTransactionById(req, res) {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            transaction
        });
    } catch (error) {
        console.error(
            "Get transaction error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server error while fetching transaction"
        });
    }
}


// ==========================================
// Update Transaction
// ==========================================

async function updateTransaction(req, res) {
    try {
        const {
            type,
            title,
            amount,
            category,
            date,
            description
        } = req.body;

        const transaction =
            await Transaction.findOne({
                _id: req.params.id,
                user: req.user.userId
            });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        if (type !== undefined) {
            transaction.type = type;
        }

        if (title !== undefined) {
            transaction.title = title.trim();
        }

        if (amount !== undefined) {
            transaction.amount = amount;
        }

        if (category !== undefined) {
            transaction.category =
                category.trim();
        }

        if (date !== undefined) {
            transaction.date = date;
        }

        if (description !== undefined) {
            transaction.description =
                description.trim();
        }

        await transaction.save();

        res.status(200).json({
            success: true,
            message:
                "Transaction updated successfully",
            transaction
        });
    } catch (error) {
        console.error(
            "Update transaction error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server error while updating transaction"
        });
    }
}


// ==========================================
// Delete Transaction
// ==========================================

async function deleteTransaction(req, res) {
    try {
        const transaction =
            await Transaction.findOneAndDelete({
                _id: req.params.id,
                user: req.user.userId
            });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Transaction deleted successfully"
        });
    } catch (error) {
        console.error(
            "Delete transaction error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server error while deleting transaction"
        });
    }
}


module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};