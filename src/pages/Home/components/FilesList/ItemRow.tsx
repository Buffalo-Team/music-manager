import FolderIcon from '@mui/icons-material/Folder';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { File, ItemRowType } from 'types';

interface Props {
    item: File;
    onClick?: () => void;
    type: ItemRowType;
}

const icons = {
    [ItemRowType.FOLDER]: FolderIcon,
    [ItemRowType.FILE]: MusicNoteIcon,
};

const ItemRow = ({ item, onClick, type }: Props) => {
    const IconComponent = icons[type];
    return (
        <ListItemButton onClick={onClick} sx={{ flex: 0 }}>
            <ListItemIcon>
                <IconComponent />
            </ListItemIcon>
            <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                    variant: 'regular',
                }}
            />
        </ListItemButton>
    );
};

export default ItemRow;
