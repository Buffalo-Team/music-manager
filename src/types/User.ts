import { Device } from 'types/Device';

export type User = {
    user: {
        id: string;
        name: string;
        surname: string;
        email: string;
        devices: Device[];
    } | null;
};
