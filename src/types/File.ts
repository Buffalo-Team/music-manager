export type File = {
    id: string;
    name: string;
    owner: string;
    storageKey: string;
    sizeMegabytes?: number;
    parentFile?: string;
    directLink?: string;
    isFolder: boolean;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
};
