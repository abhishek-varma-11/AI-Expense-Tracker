function Overview() {
    return (
        <section className="overview-page">

            <header className="page-header">
                <div>
                    <h2>Dashboard</h2>
                    <p>
                        Here's an overview of your finances.
                    </p>
                </div>
            </header>

            <section className="summary-grid">

                <div className="summary-card">
                    <span>Available Balance</span>
                    <h3>₹0</h3>
                </div>

                <div className="summary-card">
                    <span>Total Income</span>
                    <h3>₹0</h3>
                </div>

                <div className="summary-card">
                    <span>Total Expenses</span>
                    <h3>₹0</h3>
                </div>

                <div className="summary-card">
                    <span>Opening Balance</span>
                    <h3>₹0</h3>
                </div>

            </section>

            <section className="dashboard-section">

                <div className="section-header">
                    <h3>Recent Transactions</h3>
                </div>

                <div className="empty-state">
                    <p>
                        No transactions yet.
                    </p>

                    <p>
                        Add your first income or expense
                        to get started.
                    </p>
                </div>

            </section>

        </section>
    );
}

export default Overview;