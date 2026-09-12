import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useTransactions from "../hooks/useTransactions.jsx";
import TransactionForm from "../components/transactions/TransactionForm.jsx";

function TransactionDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        getTransaction,
        updateTransaction,
        deleteTransaction
    } = useTransactions();

    const transaction = getTransaction(Number(id));

    const [isEditing, setIsEditing] = useState(false);

    if (!transaction) {

        return (
            <section className="transaction-details-page">

                <header className="page-header">

                    <div>
                        <h2>
                            Transaction Not Found
                        </h2>

                        <p>
                            The transaction you're looking for
                            does not exist.
                        </p>
                    </div>

                </header>

                <Link to="/dashboard/transactions">
                    Back to Transactions
                </Link>

            </section>
        );
    }

    async function handleUpdate(updatedData) {

        updateTransaction(
            transaction.id,
            updatedData
        );

        setIsEditing(false);
    }

    function handleDelete() {

        const shouldDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!shouldDelete) {
            return;
        }

        deleteTransaction(transaction.id);

        navigate("/dashboard/transactions");
    }

    return (
        <section className="transaction-details-page">

            {/* Page Header */}

            <header className="page-header">

                <div>

                    <h2>
                        Transaction Details
                    </h2>

                    <p>
                        View and manage this transaction.
                    </p>

                </div>

                <Link to="/dashboard/transactions">
                    Back to Transactions
                </Link>

            </header>

            {/* Edit Form */}

            {isEditing ? (

                <section className="transaction-form-section">

                    <div className="section-header">

                        <h3>
                            Edit Transaction
                        </h3>

                    </div>

                    <TransactionForm
                        initialData={transaction}
                        onSubmit={handleUpdate}
                        onCancel={() => setIsEditing(false)}
                    />

                </section>

            ) : (

                <section className="transaction-detail-card">

                    {/* Transaction Type */}

                    <div className="detail-item">

                        <span>
                            Type
                        </span>

                        <strong>
                            {transaction.type === "income"
                                ? "Income"
                                : "Expense"}
                        </strong>

                    </div>

                    {/* Title */}

                    <div className="detail-item">

                        <span>
                            Title
                        </span>

                        <strong>
                            {transaction.title}
                        </strong>

                    </div>

                    {/* Amount */}

                    <div className="detail-item">

                        <span>
                            Amount
                        </span>

                        <strong>
                            ₹
                            {transaction.amount.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                    {/* Category */}

                    <div className="detail-item">

                        <span>
                            Category
                        </span>

                        <strong>
                            {transaction.category}
                        </strong>

                    </div>

                    {/* Date */}

                    <div className="detail-item">

                        <span>
                            Date
                        </span>

                        <strong>
                            {transaction.date}
                        </strong>

                    </div>

                    {/* Description */}

                    <div className="detail-item">

                        <span>
                            Description
                        </span>

                        <p>
                            {transaction.description ||
                                "No description provided."}
                        </p>

                    </div>

                    {/* Actions */}

                    <div className="detail-actions">

                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Transaction
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                        >
                            Delete Transaction
                        </button>

                    </div>

                </section>

            )}

        </section>
    );
}

export default TransactionDetails;