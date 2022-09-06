import React from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LaptopIcon from '@mui/icons-material/Laptop';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WatchIcon from '@mui/icons-material/Watch';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
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
        }}
    >
        <ToggleButton value={DeviceType.CAR} aria-label="car">
            <DirectionsCarIcon />
        </ToggleButton>
        <ToggleButton value={DeviceType.MOBILE} aria-label="mobile">
            <PhoneAndroidIcon />
        </ToggleButton>
        <ToggleButton value={DeviceType.PC} aria-label="pc">
            <LaptopIcon />
        </ToggleButton>
        <ToggleButton value={DeviceType.WATCH} aria-label="watch">
            <WatchIcon />
        </ToggleButton>
    </ToggleButtonGroup>
);

export default DeviceTypeSelection;
