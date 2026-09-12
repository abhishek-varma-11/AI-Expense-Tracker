import { createContext, useState } from "react";

const TransactionContext = createContext();

function TransactionProvider({ children }) {

    const [transactions, setTransactions] = useState([]);

    function addTransaction(transaction) {

        const newTransaction = {
            id: Date.now(),
            ...transaction
        };

        setTransactions((currentTransactions) => [
            newTransaction,
            ...currentTransactions
        ]);
    }

    function updateTransaction(id, updatedData) {

        setTransactions((currentTransactions) =>
            currentTransactions.map((transaction) =>
                transaction.id === id
                    ? {
                        ...transaction,
                        ...updatedData
                    }
                    : transaction
            )
        );
    }

    function deleteTransaction(id) {

        setTransactions((currentTransactions) =>
            currentTransactions.filter(
                (transaction) => transaction.id !== id
            )
        );
    }

    function getTransaction(id) {

        return transactions.find(
            (transaction) => transaction.id === id
        );
    }

    const value = {
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getTransaction
    };

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
}

export { TransactionProvider };
export default TransactionContext;