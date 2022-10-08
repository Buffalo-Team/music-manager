import { DeviceType } from 'types/DeviceType';

export type Device = {
    allocatedMegabytes: number;
    capacityMegabytes: number;
    createdAt: string;
    id: string;
    isSynchronizationNeeded: boolean;
    missingFiles: [];
    missingFilesCount: number;
    name: string;
    owner: string;
    type: DeviceType;
    updatedAt: string;
};
