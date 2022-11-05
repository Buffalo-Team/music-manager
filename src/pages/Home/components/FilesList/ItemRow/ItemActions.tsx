import CancelButton from './buttons/CancelButton';
import DeleteButton from './buttons/DeleteButton';
import EditButton from './buttons/EditButton';
import PauseButton from './buttons/PauseButton';
import PlayButton from './buttons/PlayButton';
import SaveButton from './buttons/SaveButton';
import Styled from './ItemRow.styled';

interface Props {
    isFile: boolean;
    isEditMode: boolean;
    isValid: boolean;
    isHovering: boolean;
    isLoading: boolean;
    isPlaying: boolean;
    onCancel: () => void;
    onDelete: () => void;
    onEdit: () => void;
    onPlay?: () => void;
    onPause?: () => void;
}

const ItemActions = ({
    isFile,
    isEditMode,
    isValid,
    isHovering,
    isLoading,
    isPlaying,
    onCancel,
    onDelete,
    onEdit,
    onPlay,
    onPause,
}: Props) => (
    <Styled.ItemActionsContainer>
        {isEditMode && (
            <>
                <SaveButton
                    isLoading={isLoading}
                    isValid={isValid}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
                <CancelButton
                    isLoading={isLoading}
                    isValid={isValid}
                    onClick={(e) => {
                        onCancel();
                        e.stopPropagation();
                    }}
                />
            </>
        )}
        {!isEditMode && (
            <EditButton
                isHovering={isHovering}
                isEditMode={isEditMode}
                onClick={(e) => {
                    onEdit();
                    e.stopPropagation();
                }}
            />
        )}
        <DeleteButton
            isHovering={isHovering}
            isEditMode={isEditMode}
            onClick={(e) => {
                onDelete();
                e.stopPropagation();
            }}
        />
        {isFile &&
            (isPlaying ? (
                <PauseButton
                    isHovering={isHovering}
                    isEditMode={isEditMode}
                    onClick={(e) => {
                        onPause?.();
                        e.stopPropagation();
                    }}
                />
            ) : (
                <PlayButton
                    isHovering={isHovering}
                    isEditMode={isEditMode}
                    onClick={(e) => {
                        onPlay?.();
                        e.stopPropagation();
                    }}
                />
            ))}
    </Styled.ItemActionsContainer>
);

export default ItemActions;
