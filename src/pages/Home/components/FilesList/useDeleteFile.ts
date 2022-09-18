import { useDeleteFileMutation } from 'app/api/filesApiSlice';
import { ResponseStatus, File as ItemFile } from 'types';

interface Props {
    onDeleteSuccess?: (item: ItemFile) => void;
    onDeleteError?: (item: ItemFile) => void;
}

const useDeleteFile = ({ onDeleteSuccess, onDeleteError }: Props = {}) => {
    const [deleteFile, requestState] = useDeleteFileMutation();

    const handleDelete = async (item: ItemFile) => {
        try {
            const response = await deleteFile({ id: item.id }).unwrap();
            if (!response || response.status === ResponseStatus.SUCCESS) {
                onDeleteSuccess?.(item);
            } else {
                onDeleteError?.(item);
            }
        } catch (error) {
            onDeleteError?.(item);
        }
    };

    return { handleDelete, requestState };
};

export default useDeleteFile;
