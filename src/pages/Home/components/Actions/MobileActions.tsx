import { MouseEvent, SyntheticEvent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { SpeedDialAction } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

interface Props extends WithTranslation {
    open: boolean;
    onClose: (e: SyntheticEvent<{}>, reason: string) => void;
    onSpeedDialClick: () => void;
    onFolderClick: (e: MouseEvent<HTMLDivElement>) => void;
    onFileClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const MobileActions = ({
    open,
    onClose,
    onSpeedDialClick,
    onFolderClick,
    onFileClick,
    t,
}: Props) => (
    <SpeedDial
        open={open}
        onClick={onSpeedDialClick}
        onClose={onClose}
        ariaLabel="Home actions"
        sx={{
            position: 'absolute',
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
        }}
        icon={<SpeedDialIcon />}
    >
        <SpeedDialAction
            icon={<CreateNewFolderIcon />}
            tooltipTitle={t('files.createDirectory')}
            onClick={onFolderClick}
        />
        <SpeedDialAction
            icon={<UploadFileIcon />}
            tooltipTitle={t('files.upload')}
            onClick={onFileClick}
        />
    </SpeedDial>
);

export default withTranslation()(MobileActions);
