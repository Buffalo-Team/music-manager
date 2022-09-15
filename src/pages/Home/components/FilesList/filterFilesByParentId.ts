import groupBy from 'lodash/groupBy';
import { File as ItemFile } from 'types';
import CurrentLevel from './CurrentLevel';

const filterFilesByParentId = (
    files: ItemFile[],
    parentFolderId?: string
): CurrentLevel => {
    const items = files
        .filter((file) => file.parentFile === parentFolderId)
        .sort((f1, f2) => {
            const isFolderResult = Number(f1.isFolder) - Number(f2.isFolder);
            if (isFolderResult !== 0) {
                return isFolderResult;
            }
            return f1.name?.toLowerCase().localeCompare(f2.name?.toLowerCase());
        });
    return groupBy(items, (i) => (i.isFolder ? 'folders' : 'files'));
};

export default filterFilesByParentId;
