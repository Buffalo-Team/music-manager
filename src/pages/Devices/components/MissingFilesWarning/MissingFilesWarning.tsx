import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

interface Props {
    missingFiles: [];
}

const MissingFilesWarning = ({ missingFiles }: Props) => {
    const { t } = useTranslation();
    return (
        <>
            {!!missingFiles?.length && (
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
                        count: missingFiles.length,
                    })}
                </Typography>
            )}
        </>
    );
};

export default MissingFilesWarning;