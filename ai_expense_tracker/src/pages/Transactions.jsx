import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import useTransactions from "../hooks/useTransactions.jsx";
import TransactionForm from "../components/transactions/TransactionForm.jsx";

function Transactions() {

    const {
        transactions,
        addTransaction,
        deleteTransaction
    } = useTransactions();

    const [showForm, setShowForm] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [typeFilter, setTypeFilter] = useState("");

    const [categoryFilter, setCategoryFilter] = useState("");

    async function handleAddTransaction(transactionData) {

        addTransaction(transactionData);

        setShowForm(false);
    }

    function handleDeleteTransaction(id) {

        const shouldDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!shouldDelete) {
            return;
        }

        deleteTransaction(id);
    }

    const filteredTransactions = useMemo(() => {

        return transactions.filter((transaction) => {

            const matchesSearch =
                transaction.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                transaction.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesType =
                typeFilter === "" ||
                transaction.type === typeFilter;

            const matchesCategory =
                categoryFilter === "" ||
                transaction.category === categoryFilter;

            return (
                matchesSearch &&
                matchesType &&
                matchesCategory
            );
        });

    }, [
        transactions,
        searchTerm,
        typeFilter,
        categoryFilter
    ]);

    const categories = [
        ...new Set(
            transactions.map(
                (transaction) => transaction.category
            )
        )
    ];

    return (
        <section className="transactions-page">

            {/* Page Header */}

            <header className="page-header">

                <div>

                    <h2>
                        Transactions
                    </h2>

                    <p>
                        Manage your income and expenses.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                >
                    Add Transaction
                </button>

            </header>

            {/* Add Transaction Form */}

            {showForm && (
                <section className="transaction-form-section">

                    <div className="section-header">

                        <h3>
                            Add Transaction
                        </h3>

                    </div>

                    <TransactionForm
                        onSubmit={handleAddTransaction}
                        onCancel={() => setShowForm(false)}
                    />

                </section>
            )}

            {/* Filters */}

            <section className="transaction-filters">

                <div className="form-group">

                    <label htmlFor="search">
                        Search
                    </label>

                    <input
                        id="search"
                        type="search"
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                        placeholder="Search transactions..."
                    />

                </div>

                <div className="form-group">

                    <label htmlFor="typeFilter">
                        Type
                    </label>

                    <select
                        id="typeFilter"
                        value={typeFilter}
                        onChange={(event) =>
                            setTypeFilter(event.target.value)
                        }
                    >

                        <option value="">
                            All Types
                        </option>

                        <option value="income">
                            Income
                        </option>

                        <option value="expense">
                            Expense
                        </option>

                    </select>

                </div>

                <div className="form-group">

                    <label htmlFor="categoryFilter">
                        Category
                    </label>

                    <select
                        id="categoryFilter"
                        value={categoryFilter}
                        onChange={(event) =>
                            setCategoryFilter(event.target.value)
                        }
                    >

                        <option value="">
                            All Categories
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        ))}

                    </select>

                </div>

            </section>

            {/* Transaction List */}

            <section className="transaction-list">

                <div className="section-header">

                    <h3>
                        All Transactions
                    </h3>

                    <span>
                        {filteredTransactions.length} transaction
                        {filteredTransactions.length !== 1
                            ? "s"
                            : ""}
                    </span>

                </div>

                {filteredTransactions.length === 0 ? (

                    <div className="empty-state">

                        {transactions.length === 0 ? (
                            <>
                                <h3>
                                    No transactions yet
                                </h3>

                                <p>
                                    Add your first income or
                                    expense to get started.
                                </p>
                            </>
                        ) : (
                            <>
                                <h3>
                                    No matching transactions
                                </h3>

                                <p>
                                    Try changing your search
                                    or filters.
                                </p>
                            </>
                        )}

                    </div>

                ) : (

                    <div className="transaction-table-wrapper">

                        <table className="transaction-table">

                            <thead>

                                <tr>

                                    <th>
                                        Title
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Amount
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredTransactions.map(
                                    (transaction) => (

                                        <tr
                                            key={transaction.id}
                                        >

                                            <td>

                                                <Link
                                                    to={`/dashboard/transactions/${transaction.id}`}
                                                >
                                                    {transaction.title}
                                                </Link>

                                                {transaction.description && (
                                                    <small>
                                                        {
                                                            transaction.description
                                                        }
                                                    </small>
                                                )}

                                            </td>

                                            <td>
                                                {transaction.type === "income"
                                                    ? "Income"
                                                    : "Expense"}
                                            </td>

                                            <td>
                                                {transaction.category}
                                            </td>

                                            <td>
                                                {transaction.date}
                                            </td>

                                            <td>
                                                ₹
                                                {transaction.amount.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </td>

                                            <td>

                                                <div className="transaction-actions">

                                                    <Link
                                                        to={`/dashboard/transactions/${transaction.id}`}
                                                    >
                                                        View
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteTransaction(
                                                                transaction.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>

        </section>
    );
}

export default Transactions;