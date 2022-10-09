import { useUpdateFileMutation } from 'app/api/filesApiSlice';
import { ResponseStatus, File as ItemFile } from 'types';
import { UpdateFileRequestData } from 'types/UpdateFileRequestData';

interface Props {
    onUpdateSuccess?: (item: ItemFile) => void;
    onUpdateError?: (item: ItemFile) => void;
}

const useUpdateFile = ({ onUpdateSuccess, onUpdateError }: Props = {}) => {
    const [updateFile, requestState] = useUpdateFileMutation();

    const handleUpdate = async ({
        item,
        values,
    }: {
        item: ItemFile;
        values: UpdateFileRequestData;
    }) => {
        try {
            const response = await updateFile({
                file: item,
                ...values,
            }).unwrap();
            if (!response || response.status === ResponseStatus.SUCCESS) {
                onUpdateSuccess?.(item);
            } else {
                onUpdateError?.(item);
            }
        } catch (error) {
            onUpdateError?.(item);
        }
    };

    return { handleUpdate, requestState };
};

export default useUpdateFile;
