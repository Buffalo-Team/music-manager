import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import deviceIcons from 'pages/Devices/components/DeviceIcons';
import { DeviceType } from 'types';

interface Props {
    value: DeviceType;
    onSelect: (type: DeviceType) => void;
}

const DeviceTypeSelection = ({ value, onSelect }: Props) => (
    <ToggleButtonGroup
        value={value}
        onChange={(e, device) => {
            if (!device) {
                return;
            }
            onSelect(device);
        }}
        aria-label="device-type"
        exclusive
        sx={{
            marginX: 5,
            marginBottom: 2,
            display: 'flex',
            justifyContent: 'space-between',
            '.MuiToggleButtonGroup-grouped': {
                '&:not(:last-of-type)': {
                    borderRadius: '50%',
                },
                '&:not(:first-of-type)': {
                    borderRadius: '50%',
                },
            },
        }}
    >
        {Object.entries(deviceIcons)
            .filter(([key]) => key !== 'unknown')
            .map(([key, IconComponent]) => (
                <ToggleButton key={key} value={key} aria-label={key}>
                    <IconComponent />
                </ToggleButton>
            ))}
    </ToggleButtonGroup>
);

export default DeviceTypeSelection;
