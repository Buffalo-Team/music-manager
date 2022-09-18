import { useState } from 'react';
import { Formik } from 'formik';
import FolderIcon from '@mui/icons-material/Folder';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import useHover from 'hooks/useHover';
import FormStaticConfig from 'pages/Home/components/FilesList/ItemRow/FormStaticConfig';
import ItemActions from 'pages/Home/components/FilesList/ItemRow/ItemActions';
import splitFilename from 'pages/Home/components/FilesList/ItemRow/splitFilename';
import { File, ItemRowType, UpdateFileRequestData } from 'types';
import FilenameEditor from './FilenameEditor';
import Styled from './ItemRow.styled';

interface Props {
    item: File;
    onClick?: () => void;
    onDelete: () => void;
    onEdit: (values: UpdateFileRequestData) => void;
    type: ItemRowType;
    isLoading: boolean;
}

const icons = {
    [ItemRowType.FOLDER]: FolderIcon,
    [ItemRowType.FILE]: MusicNoteIcon,
};

const ItemRow = ({
    item,
    type,
    onClick,
    onDelete,
    isLoading,
    onEdit,
}: Props) => {
    const IconComponent = icons[type];
    const [ref, isHovering] = useHover<HTMLDivElement>();
    const [editMode, setEditMode] = useState(false);

    const { filename, extension } = !item.isFolder
        ? splitFilename(item.name)
        : { filename: item.name, extension: '' };

    const handleSubmit = (values: UpdateFileRequestData) => {
        onEdit({ ...values, name: `${values.name}${extension}` });
        setEditMode(false);
    };

    return (
        <ListItemButton
            ref={ref}
            onClick={onClick}
            sx={{ flex: 0, paddingY: 0.5 }}
        >
            <Formik<UpdateFileRequestData>
                {...FormStaticConfig}
                initialValues={{
                    name: filename,
                }}
                onSubmit={handleSubmit}
            >
                {({ touched, handleSubmit, isValid }) => (
                    <Styled.FormContent onSubmit={handleSubmit}>
                        <Styled.RowContentWrapper>
                            <ListItemIcon>
                                <IconComponent />
                            </ListItemIcon>
                            {editMode ? (
                                <FilenameEditor
                                    touched={touched.name}
                                    extension={extension}
                                />
                            ) : (
                                <ListItemText
                                    primary={item.name}
                                    primaryTypographyProps={{
                                        variant: 'regular',
                                    }}
                                />
                            )}
                        </Styled.RowContentWrapper>
                        <ItemActions
                            isEditMode={editMode}
                            isValid={isValid}
                            isHovering={isHovering}
                            isLoading={isLoading}
                            onCancel={() => setEditMode(false)}
                            onDelete={onDelete}
                            onEdit={() => setEditMode(true)}
                        />
                    </Styled.FormContent>
                )}
            </Formik>
        </ListItemButton>
    );
};

export default ItemRow;
