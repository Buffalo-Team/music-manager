import { CreateFolderRequestData, Response } from 'types';
import { emptySplitApi } from './emptySplitApi';

export const filesApiSlice = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFiles: builder.mutation<
            Response,
            { targetId?: string; body: FormData }
        >({
            query: ({ targetId = '', body }) => ({
                url: `/files/upload/${targetId}`,
                method: 'POST',
                body,
            }),
        }),
        getAllFiles: builder.query<{ files: File[] } & Response, void>({
            query: () => '/files',
        }),
        deleteFile: builder.mutation<Response, { id: string }>({
            query: ({ id }) => ({
                url: `/files/${id}`,
                method: 'DELETE',
            }),
        }),
        createFolder: builder.mutation<Response, CreateFolderRequestData>({
            query: ({ parentFolderId = '', ...body }) => ({
                url: `/files/folder/${parentFolderId}`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useUploadFilesMutation,
    useGetAllFilesQuery,
    useDeleteFileMutation,
    useCreateFolderMutation,
} = filesApiSlice;
