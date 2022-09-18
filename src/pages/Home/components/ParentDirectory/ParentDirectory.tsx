import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { File as ItemFile } from 'types';

interface Props extends WithTranslation {
    targetFolder?: ItemFile;
}

const ParentDirectory = ({ targetFolder, t }: Props) => (
    <Typography variant="regular" sx={{ marginBottom: 1 }}>
        {t('files.parentDirectory', {
            name: targetFolder ? targetFolder.name : t('files.rootDirectory'),
        })}
    </Typography>
);

export default withTranslation()(ParentDirectory);
