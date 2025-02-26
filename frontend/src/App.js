import React, { useState } from 'react';
import StatusTable from './components/StatusTable';
import DailyScheduleTable from './components/DailyScheduleTable';
import TargetForm from './components/TargetForm';
import PasswordForm from './components/PasswordForm';

import './App.css';

function App() {
    const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(true);

    const handlePasswordSubmit = () => {
        setIsPasswordFormOpen(false);
    };

    return (
        <div className="app-container">
            {!isPasswordFormOpen && (
                <>
                    <header>
                        <h1>7DT Target of Opportunity (ToO) Request</h1>
                    </header>
                    <section className="form-section">
                        <TargetForm />
                    </section>
                    
                    <header>
                        <h2>Observatory Dashboard</h2>
                    </header>
                    <section className="dashboard-section">
                        <StatusTable />
                    </section>

                    <section className="schedule-section">
                        <DailyScheduleTable />
                    </section>

                    <footer className="footer">
                        <div className="footer-content">
                            <p>If you have any questions, please contact: 
                                <a href="mailto:myungshin.im@gmail.com?cc=hhchoi1022@gmail.com"> Prof. Myungshin Im</a>
                            </p>
                        </div>
                    </footer>
                </>
            )}
            <PasswordForm open={isPasswordFormOpen} onPasswordSubmit={handlePasswordSubmit} />
        </div>
    );
}

export default App;