import { useContext } from "react";

import TransactionContext from "../context/TransactionContext.jsx";

function useTransactions() {
    return useContext(TransactionContext);
}

export default useTransactions;