import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { TransactionProvider } from "./context/TransactionContext.jsx";

import App from "./App.jsx";

import "./index.css";
import "./styles/App.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>

        <AuthProvider>

            <TransactionProvider>

                <BrowserRouter>
                    <App />
                </BrowserRouter>

            </TransactionProvider>

        </AuthProvider>

    </StrictMode>
);