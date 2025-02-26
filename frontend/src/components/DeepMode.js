import React from 'react';
import { Checkbox, FormControlLabel, Select, MenuItem } from '@mui/material';
import '../styles/ColOptions.css';

function DeepMode({ selectedFilters, handleCheckboxChange, selectedTelNumber, setSelectedTelNumber }) {
    return (
        <div className="mode-options">
            {/* Filters Checkboxes */}
            <div className="checkbox-group">
                <label className="smaller-label">Filters:</label>
                {['g', 'r', 'i'].map((filter) => (
                    <FormControlLabel
                        key={filter}
                        control={<Checkbox />}
                        label={filter}
                        checked={selectedFilters.includes(filter)}
                        onChange={() => handleCheckboxChange(filter)}
                    />
                ))}
            </div>

            {/* Number of Telescopes Dropdown */}
            <div className="dropdown-container">
                <label className="smaller-label"># of Telescopes:</label>
                <Select
                    value={selectedTelNumber}
                    onChange={(e) => setSelectedTelNumber(e.target.value)}
                    size="small"
                >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                        <MenuItem key={num} value={num}>
                            {num}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}

export default DeepMode;