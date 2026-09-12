function Header() {

    return (
        <header className="dashboard-header">

            <div className="header-left">

                <h2>
                    AI Expense Tracker
                </h2>

                <p>
                    Manage your finances and understand your spending.
                </p>

            </div>

            <div className="header-right">

                <div className="user-greeting">
                    <span>Welcome back</span>
                    <strong>User</strong>
                </div>

            </div>

        </header>
    );
}

export default Header;