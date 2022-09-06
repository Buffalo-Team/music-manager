import { useEffect, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import convertToGBIfNeeded from './convertToGBIfNeeded';
import CurrentMax from './CurrentMax';

interface Props {
    allocatedMegabytes: number;
    capacityMegabytes: number;
}

const DeviceCapacity = ({ allocatedMegabytes, capacityMegabytes }: Props) => {
    const [{ current, max, unit }, setValues] = useState<CurrentMax>({
        current: 0,
        max: 1,
        unit: 'MB',
    });
    const percentage = (current * 100) / max;

    useEffect(() => {
        setValues(convertToGBIfNeeded(allocatedMegabytes, capacityMegabytes));
    }, [allocatedMegabytes, capacityMegabytes]);

    return (
        <Box sx={{ textAlign: 'right' }}>
            <Typography variant="large">{`${current}${unit} / ${max}${unit}`}</Typography>
            <LinearProgress
                sx={{ marginTop: 0.5 }}
                value={percentage}
                variant="determinate"
            />
        </Box>
    );
};

export default DeviceCapacity;
