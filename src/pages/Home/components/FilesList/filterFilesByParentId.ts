import groupBy from 'lodash/groupBy';
import sortFiles from 'pages/Home/components/FilesList/sortFiles';
import { File as ItemFile } from 'types';
import CurrentLevel from './CurrentLevel';

const filterFilesByParentId = (
    files: ItemFile[],
    parentFolderId?: string
): CurrentLevel => {
    const items = files
        .filter((file) => file.parentFile === parentFolderId)
        .sort(sortFiles);
    return groupBy(items, (i) => (i.isFolder ? 'folders' : 'files'));
};

export default filterFilesByParentId;
