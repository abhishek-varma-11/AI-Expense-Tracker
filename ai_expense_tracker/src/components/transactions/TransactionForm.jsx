import { useState } from "react";

const EXPENSE_CATEGORIES = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Rent",
    "Utilities",
    "Other"
];

const INCOME_CATEGORIES = [
    "Salary",
    "Freelance",
    "Business",
    "Gift",
    "Other"
];

function TransactionForm({
    initialData = null,
    onSubmit,
    onCancel
}) {

    const [formData, setFormData] = useState({
        type: initialData?.type || "expense",
        title: initialData?.title || "",
        amount: initialData?.amount || "",
        category: initialData?.category || "",
        date: initialData?.date || "",
        description: initialData?.description || ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories =
        formData.type === "expense"
            ? EXPENSE_CATEGORIES
            : INCOME_CATEGORIES;

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: ""
        }));
    }

    function handleTypeChange(event) {

        const newType = event.target.value;

        setFormData((currentData) => ({
            ...currentData,
            type: newType,
            category: ""
        }));

        setErrors({});
    }

    function validate() {

        const newErrors = {};

        if (formData.title.trim() === "") {
            newErrors.title = "Title is required";
        }

        if (formData.amount === "") {
            newErrors.amount = "Amount is required";
        }
        else if (Number(formData.amount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }

        if (formData.category === "") {
            newErrors.category = "Category is required";
        }

        if (formData.date === "") {
            newErrors.date = "Date is required";
        }

        return newErrors;
    }

    async function handleSubmit(event) {

        event.preventDefault();

        const newErrors = validate();

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        try {

            const transactionData = {
                ...formData,
                amount: Number(formData.amount)
            };

            await onSubmit(transactionData);

        }
        finally {

            setIsSubmitting(false);

        }
    }

    return (
        <form
            className="transaction-form"
            onSubmit={handleSubmit}
        >

            {/* Transaction Type */}

            <div className="form-group">

                <label htmlFor="type">
                    Transaction Type
                </label>

                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleTypeChange}
                >

                    <option value="expense">
                        Expense
                    </option>

                    <option value="income">
                        Income
                    </option>

                </select>

            </div>

            {/* Title */}

            <div className="form-group">

                <label htmlFor="title">
                    {formData.type === "expense"
                        ? "Expense Title"
                        : "Income Source"}
                </label>

                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder={
                        formData.type === "expense"
                            ? "e.g. Groceries"
                            : "e.g. Monthly Salary"
                    }
                />

                {errors.title && (
                    <p className="form-error">
                        {errors.title}
                    </p>
                )}

            </div>

            {/* Amount */}

            <div className="form-group">

                <label htmlFor="amount">
                    Amount
                </label>

                <input
                    id="amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                />

                {errors.amount && (
                    <p className="form-error">
                        {errors.amount}
                    </p>
                )}

            </div>

            {/* Category */}

            <div className="form-group">

                <label htmlFor="category">
                    Category
                </label>

                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >

                    <option value="">
                        Select a category
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

                {errors.category && (
                    <p className="form-error">
                        {errors.category}
                    </p>
                )}

            </div>

            {/* Date */}

            <div className="form-group">

                <label htmlFor="date">
                    Date
                </label>

                <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />

                {errors.date && (
                    <p className="form-error">
                        {errors.date}
                    </p>
                )}

            </div>

            {/* Description */}

            <div className="form-group">

                <label htmlFor="description">
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add an optional description"
                    rows="4"
                />

            </div>

            {/* Actions */}

            <div className="form-actions">

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Saving..."
                        : initialData
                            ? "Update Transaction"
                            : "Add Transaction"}
                </button>

            </div>

        </form>
    );
}

export default TransactionForm;