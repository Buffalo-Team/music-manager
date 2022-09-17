import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const EmptyDirectory = () => {
    const { t } = useTranslation();
    return (
        <Typography
            variant="regular"
            sx={{
                color: (theme) => theme.palette.grey[100],
                marginY: 1,
            }}
        >
            {t('files.directoryIsEmpty')}
        </Typography>
    );
};

export default EmptyDirectory;
