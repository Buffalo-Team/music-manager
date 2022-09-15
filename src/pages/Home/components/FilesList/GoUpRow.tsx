import FolderIcon from '@mui/icons-material/Folder';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface Props {
    onGoUp: () => void;
    previousFolderId?: string;
    currentFolderId?: string;
}

const GoUpRow = ({ onGoUp, previousFolderId, currentFolderId }: Props) => (
    <ListItemButton
        onClick={onGoUp}
        sx={{
            ...(!!previousFolderId && { cursor: 'pointer' }),
            flex: 0,
        }}
        disabled={!currentFolderId}
    >
        <ListItemIcon>
            <FolderIcon />
        </ListItemIcon>
        <ListItemText
            primary=".."
            primaryTypographyProps={{
                variant: 'regular',
            }}
        />
    </ListItemButton>
);

export default GoUpRow;
