import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

interface Props {
    overlap?: boolean;
}

const Loader = ({ overlap }: Props) => {
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                ...(overlap && {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }),
            }}
        >
            {t('loading')}
        </Box>
    );
};

export default Loader;
