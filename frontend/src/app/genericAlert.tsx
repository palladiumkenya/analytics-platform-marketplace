import * as React from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';

export default function GenericAlert({message, alertSeverity}: {message: string; alertSeverity:AlertColor}) {

    return (
        <Alert sx={{
            position: 'absolute' as 'absolute',
            width: '35%',
            top: '90%',
            left: '60%',
        }}
            variant='filled'
            severity={alertSeverity}>
            {message}
        </Alert>
    );

}