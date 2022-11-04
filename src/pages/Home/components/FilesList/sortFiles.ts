import { File as ItemFile } from 'types';

const sortFiles = (f1: ItemFile, f2: ItemFile) => {
    const isFolderResult = Number(f1.isFolder) - Number(f2.isFolder);
    if (isFolderResult !== 0) {
        return isFolderResult;
    }
    return f1.name?.toLowerCase().localeCompare(f2.name?.toLowerCase());
};

export default sortFiles;
