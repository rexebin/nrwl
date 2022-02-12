import {Alert, Snackbar} from '@mui/material';


import React, {PropsWithChildren, useEffect, useState} from 'react';

import {useMessage} from './MessageContext';

interface OptionalSnackbarOrigin {
    vertical?: 'top' | 'bottom';
    horizontal?: 'left' | 'center' | 'right';
}

export function MessageSnackBar({vertical, horizontal}: PropsWithChildren<OptionalSnackbarOrigin>) {
    const messageContext = useMessage();
    const [open, setOpen] = useState(false);
    const message = messageContext?.message;
    useEffect(() => {
        setOpen(true);
    }, [message]);

    if (!message) {
        return null;
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: vertical || 'top',
                horizontal: horizontal || 'center',
            }}
            open={open}
            onClose={handleClose}
        >
            <Alert severity={message.type}>{message.message}</Alert>
        </Snackbar>
    );
};
