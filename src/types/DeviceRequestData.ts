import { DeviceType } from 'types/DeviceType';

export type DeviceRequestData = {
    name: string;
    type: DeviceType;
    capacityMegabytes: string;
};
