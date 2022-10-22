import { withTranslation, WithTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

interface Props extends WithTranslation {
    filesCount: number;
    fullSyncNeeded: boolean;
}

const MissingFilesWarning = ({ filesCount, fullSyncNeeded, t }: Props) => (
    <Typography
        sx={{
            margin: 0,
            marginTop: 1,
            color: (theme) => theme.palette.error.main,
        }}
        variant="regular"
        component="p"
    >
        {fullSyncNeeded
            ? t('devices.fullSynchronizationNeeded')
            : t('devices.newFilesToDownload', {
                  count: filesCount,
              })}
    </Typography>
);

export default withTranslation()(MissingFilesWarning);
