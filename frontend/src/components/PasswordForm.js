import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import axios from 'axios';

const PasswordForm = ({ open, onPasswordSubmit }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/validate-password', { password });
            if (response.data.valid) {
                onPasswordSubmit();
            } else {
                setError('Invalid password');
            }
        } catch (error) {
            setError('An error occurred while validating the password');
        }
    };

    return (
        <Dialog open={open} disableEscapeKeyDown>
            <DialogTitle>
                <Typography variant="h6" component="div" style={{color:"red", fontWeight:"bold"}}>
                    Secure Access
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" component="p" gutterBottom>
                    Please enter the password to access the page.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error}
                        helperText={error}
                    />
                    <DialogActions>
                        <Button type="submit" color="primary" variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PasswordForm;