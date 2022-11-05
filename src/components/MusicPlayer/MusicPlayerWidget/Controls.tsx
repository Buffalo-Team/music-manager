import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box } from '@mui/material';
import IconButton from 'components/IconButton';

interface Props {
    playing: boolean;
    onPlay: () => void;
    onPause: () => void;
    onPrevious: () => void;
    onNext: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
}

const Controls = ({
    playing,
    onPlay,
    onPause,
    onPrevious,
    onNext,
    hasPrevious,
    hasNext,
}: Props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: (theme) => theme.spacing(0.5),
            }}
        >
            <IconButton onClick={onPrevious} disabled={!hasPrevious}>
                <FastRewindIcon sx={{ height: 24, width: 24 }} />
            </IconButton>
            <IconButton active onClick={playing ? onPause : onPlay}>
                {playing ? (
                    <PauseIcon sx={{ height: 60, width: 60 }} />
                ) : (
                    <PlayArrowIcon sx={{ height: 60, width: 60 }} />
                )}
            </IconButton>
            <IconButton onClick={onNext} disabled={!hasNext}>
                <FastForwardIcon sx={{ height: 24, width: 24 }} />
            </IconButton>
        </Box>
    );
};

export default Controls;
