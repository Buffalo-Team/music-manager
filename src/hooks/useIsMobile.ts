import { Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const useIsMobile = () => {
    return useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
};

export default useIsMobile;
