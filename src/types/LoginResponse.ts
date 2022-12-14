import { Response } from 'types/Response';
import { User } from 'types/User';

export type LoginResponse = {
    token: string;
    user: {
        user: User | null;
    };
} & Response;
