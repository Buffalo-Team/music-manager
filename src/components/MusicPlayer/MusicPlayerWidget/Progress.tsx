import { Box, Slider } from '@mui/material';

interface Props {
    currentTime: number;
    length: number;
    onChange: (event: Event, newValue: number | number[]) => void;
}

const getTime = (secondsValue: number) => {
    let rest = Math.round(secondsValue);
    const hours = Math.floor(rest / 3600);
    rest = rest - hours * 3600;
    const minutes = Math.floor(rest / 60);
    rest = rest - minutes * 60;
    const seconds = rest < 10 ? `0${rest}` : rest;
    return [...(hours ? [hours] : []), minutes, seconds];
};

const Progress = ({ currentTime, length, onChange }: Props) => {
    const currentTimeString = getTime(currentTime).join(':');
    const maxTimeString = getTime(length).join(':');
    return (
        <Box>
            <Slider
                value={currentTime}
                onChange={onChange}
                min={0}
                max={length}
                sx={{ marginY: 1 }}
            />
            <Box
                sx={{
                    marginBottom: (theme) => theme.spacing(1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box>{currentTimeString}</Box>
                <Box>{maxTimeString}</Box>
            </Box>
        </Box>
    );
};

export default Progress;
