import { User } from 'types/User';

export type LoginResponse = {
    status: 'SUCCESS' | 'ERROR';
    token: string;
    user: User;
};
