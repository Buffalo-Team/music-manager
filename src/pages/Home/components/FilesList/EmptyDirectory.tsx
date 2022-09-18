import { withTranslation, WithTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const EmptyDirectory = ({ t }: WithTranslation) => (
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

export default withTranslation()(EmptyDirectory);
