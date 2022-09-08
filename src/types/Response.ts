export enum ResponseStatus {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    NOT_FOUND = 'NOT_FOUND',
}

export type Response = {
    status: ResponseStatus;
};
