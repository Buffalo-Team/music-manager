import { withTranslation, WithTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

interface Props extends WithTranslation {
    filesCount: number;
}

const MissingFilesWarning = ({ filesCount, t }: Props) => (
    <Typography
        sx={{
            margin: 0,
            marginTop: 1,
            color: (theme) => theme.palette.error.main,
        }}
        variant="regular"
        component="p"
    >
        {t('devices.newFilesToDownload', {
            count: filesCount,
        })}
    </Typography>
);

export default withTranslation()(MissingFilesWarning);
