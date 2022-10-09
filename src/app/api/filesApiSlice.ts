import { CreateFolderRequestData, Response } from 'types';
import { UpdateFileRequestData } from 'types/UpdateFileRequestData';
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
            invalidatesTags: ['files', 'devices'],
        }),
        getAllFiles: builder.query<{ files: File[] } & Response, void>({
            query: () => '/files',
            providesTags: ['files'],
        }),
        deleteFile: builder.mutation<Response, { id: string }>({
            query: ({ id }) => ({
                url: `/files/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['files', 'devices'],
        }),
        createFolder: builder.mutation<
            Response,
            CreateFolderRequestData & { targetId?: string }
        >({
            query: ({ targetId = '', ...body }) => ({
                url: `/files/folder/${targetId}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['files', 'devices'],
        }),
        updateFile: builder.mutation<
            Response,
            UpdateFileRequestData & { id: string }
        >({
            query: ({ id, ...body }) => ({
                url: `/files/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['files', 'devices'],
        }),
    }),
});

export const {
    useUploadFilesMutation,
    useGetAllFilesQuery,
    useDeleteFileMutation,
    useCreateFolderMutation,
    useUpdateFileMutation,
} = filesApiSlice;
