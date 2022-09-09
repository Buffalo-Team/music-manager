import { forwardRef } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Theme } from '@mui/material';
import MUIAlert, { AlertProps } from '@mui/material/Alert';
import { AlertColor } from '@mui/material/Alert/Alert';

const iconStyles = (severity: AlertColor) => ({
    fontSize: 'inherit',
    color: (theme: Theme) => theme.palette[severity]?.main,
});

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return (
        <MUIAlert
            elevation={4}
            ref={ref}
            variant="filled"
            iconMapping={{
                success: <CheckIcon sx={iconStyles('success')} />,
                error: <PriorityHighIcon sx={iconStyles('error')} />,
                warning: <WarningAmberIcon sx={iconStyles('warning')} />,
                info: <QuestionMarkIcon sx={iconStyles('info')} />,
            }}
            sx={{ width: '100%', color: (theme) => theme.palette.text.primary }}
            {...props}
        />
    );
});

export default Alert;
