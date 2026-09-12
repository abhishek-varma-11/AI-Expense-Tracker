function Analytics() {
    return (
        <section className="analytics-page">

            <header className="page-header">

                <div>
                    <h2>Analytics</h2>

                    <p>
                        Understand your spending patterns.
                    </p>
                </div>

                <select defaultValue="month">

                    <option value="week">
                        This Week
                    </option>

                    <option value="month">
                        This Month
                    </option>

                    <option value="three-months">
                        Last 3 Months
                    </option>

                    <option value="year">
                        This Year
                    </option>

                </select>

            </header>

            <section className="analytics-grid">

                <div className="analytics-card">
                    <h3>Spending by Category</h3>
                    <p>
                        Chart will appear here.
                    </p>
                </div>

                <div className="analytics-card">
                    <h3>Income vs Expenses</h3>
                    <p>
                        Chart will appear here.
                    </p>
                </div>

                <div className="analytics-card">
                    <h3>Monthly Spending</h3>
                    <p>
                        Chart will appear here.
                    </p>
                </div>

            </section>

            <section className="analytics-card">
                <h3>AI Financial Insights</h3>

                <p>
                    AI-powered spending insights will appear
                    here.
                </p>
            </section>

        </section>
    );
}

export default Analytics;