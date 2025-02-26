import React from 'react';
import { Button,TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import '../styles/ColOptions.css';

function DetailedSettings({ detailedSettings, setDetailedSettings }) {
    const defaultValues = {
        priority: 50,
        gain: 2750,
        binning: 1,
        obsStartTime: '',
        radius: '',
    };

    const {
        priority,
        gain,
        binning,
        obsStartTime,
        radius,
    } = detailedSettings;

    const handleInputChange = (field, value) => {
        setDetailedSettings((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleReset = () => {
        setDetailedSettings(defaultValues);
    };

    return (
        <div className="mode-options">

            <div className="group-container">
                <label className="detail-label">Priority:</label>
                <TextField
                    value={priority}
                    onChange={(e) => handleInputChange('priority', parseInt(e.target.value||0))}
                    type="number"
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="group-container">
                <label className="detail-label">Gain:</label>
                <TextField
                    value={gain}
                    onChange={(e) => handleInputChange('gain', parseInt(e.target.value||0))}
                    type="number"
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="group-container">
                <label className="detail-label">Radius:</label>
                <TextField
                    label="arcmin"
                    value={radius}
                    onChange={(e) => handleInputChange('radius', parseInt(e.target.value||0))}
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="group-container">
                <label className="detail-label">Binning:</label>
                <RadioGroup
                    row
                    value={binning}
                    onChange={(e) => handleInputChange('binning', parseInt(e.target.value))}
                >
                    <FormControlLabel value={1} control={<Radio />} label="1" />
                    <FormControlLabel value={2} control={<Radio />} label="2" />
                </RadioGroup>
            </div>

            <div className="group-container">
                <label className="detail-label">Observation Start Time:</label>
                <TextField
                    value={obsStartTime}
                    onChange={(e) => handleInputChange('obsStartTime', e.target.value)}
                    type="datetime-local"
                    variant="outlined"
                    size="small"
                    inputProps={{
                        step: 1, 
                    }}
                />
            </div>
            <div className='reset-button-container'>
                <Button
                    className="reset-button"
                    onClick={handleReset}
                    variant="outlined"
                    color="secondary"
                    size="small"
                >
                    Reset to Defaults
                </Button>
            </div>
        </div>
    );
}

export default DetailedSettings;