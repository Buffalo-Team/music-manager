import { useEffect, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface Props {
    allocatedMegabytes: number;
    capacityMegabytes: number;
}

interface CurrentMax {
    current: number;
    max: number;
    unit: 'MB' | 'GB';
}

const convertToGBIfNeeded = (current: number, max: number): CurrentMax =>
    current < 1024 && max < 1024
        ? {
              current: Number(current.toFixed(2)),
              max: Number(max.toFixed(2)),
              unit: 'MB',
          }
        : {
              current: Number((current / 1024).toFixed(2)),
              max: Number((max / 1024).toFixed(2)),
              unit: 'GB',
          };

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
            <Typography variant="large">{`${current} / ${max} ${unit}`}</Typography>
            <LinearProgress
                sx={{ marginTop: 0.5 }}
                value={percentage}
                variant="determinate"
            />
        </Box>
    );
};

export default DeviceCapacity;
