import CancelButton from './buttons/CancelButton';
import DeleteButton from './buttons/DeleteButton';
import EditButton from './buttons/EditButton';
import SaveButton from './buttons/SaveButton';
import Styled from './ItemRow.styled';

interface Props {
    isEditMode: boolean;
    isValid: boolean;
    isHovering: boolean;
    isLoading: boolean;
    onCancel: () => void;
    onDelete: () => void;
    onEdit: () => void;
}

const ItemActions = ({
    isEditMode,
    isValid,
    isHovering,
    isLoading,
    onCancel,
    onDelete,
    onEdit,
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
    </Styled.ItemActionsContainer>
);

export default ItemActions;
