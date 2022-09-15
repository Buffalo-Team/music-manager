import { DeviceType } from 'types/DeviceType';

export type AddDeviceRequestData = {
    name: string;
    type: DeviceType;
    capacityMegabytes: string;
};
