import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircleIcon from '@mui/icons-material/Circle'; // Material UI Circle Icon
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../styles/DailyScheduleTable.css';

function DailyScheduleTable() {
    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showRedBall, setShowRedBall] = useState(false); // State to toggle unscheduled visibility
    const [showObserved, setShowObserved] = useState(false); // State to toggle observed visibility

    // Fetch daily schedule data
    useEffect(() => {
        axios.get('/api/daily_schedule')
            .then((response) => {
                setScheduleData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching daily schedule:", error);
                setLoading(false);
            });
    }, []);

    const toggleRedBallVisibility = () => {
        setShowRedBall(!showRedBall);
    };

    const toggleObservedVisibility = () => {
        setShowObserved(!showObserved);
    };

    const formatColumnValue = (value) => {
        if (typeof value === 'string' && value.includes(',')) {
            // Split the value and ensure all entries are identical
            const splitValues = value.split(',');
            return splitValues.every((val) => val === splitValues[0]) ? splitValues[0] : value;
        }
        return value || 'N/A';
    };

    const getStatusIcon = (status) => {
        const iconStyle = { width: "12px", height: "12px", margin: "0", padding: "0" };

        if (status === "observed") {
            return <CircleIcon style={{ ...iconStyle, color: "green" }} />;
        }
        if (status === "scheduled") {
            return <CircleIcon style={{ ...iconStyle, color: "#FFBF00" }} />;
        }
        if (status === "unscheduled" && showRedBall) {
            return <CircleIcon style={{ ...iconStyle, color: "red" }} />;
        }
        return <CircleIcon style={{ ...iconStyle, color: "gray" }} />;
    };

    // Filter rows based on `showRedBall` and `showObserved` state
    const filteredScheduleData = scheduleData.filter((row) => {
        if (!showRedBall && row.status === "unscheduled") return false;
        if (!showObserved && row.status === "observed") return false;
        return true;
    });

    if (loading) {
        return <p>Loading data...</p>;
    }

    return (
        <div className="container">
            <h3>Daily Observing Schedule</h3>

            {/* Buttons in the same line */}
            <div className="button-container">
                <div className="collapse-toggle" onClick={toggleRedBallVisibility}>
                    {showRedBall ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    <span className="collapse-text">
                        {showRedBall ? 'Hide Unscheduled' : 'Show Unscheduled'}
                    </span>
                </div>
                <div className="collapse-toggle" onClick={toggleObservedVisibility}>
                    {showObserved ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    <span className="collapse-text">
                        {showObserved ? 'Hide Observed' : 'Show Observed'}
                    </span>
                </div>
            </div>

            {/* Collapsible Content */}
            <div className="collapsible-content">
                <div className="table-container">
                    <table className="compact-table">
                        <thead>
                            <tr>
                                <th>Object Name</th>
                                <th>RA</th>
                                <th>Dec</th>
                                <th>Exp Time</th>
                                <th>Count</th>
                                <th>Start Time</th>
                                <th>Mode</th>
                                <th>nTel</th>
                                <th>Obj Type</th>
                                <th>Priorty</th>
                                <th>Status</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {filteredScheduleData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.objname}</td>
                                    <td>{row.RA}</td>
                                    <td>{row.De}</td>
                                    <td>{formatColumnValue(row.exptime)}</td>
                                    <td>{formatColumnValue(row.count)}</td>
                                    <td>{row.obs_starttime}</td>
                                    <td>{row.specmode || row.obsmode}</td>
                                    <td>{row.ntelescope || 'N/A'}</td>
                                    <td>{row.objtype || 'N/A'}</td>
                                    <td>{row.priority}</td>
                                    <td>{getStatusIcon(row.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DailyScheduleTable;