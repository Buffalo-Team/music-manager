import { CreateFolderRequestData, Response, File as ItemFile } from 'types';
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
        }),
        getFilesByTargetId: builder.query<
            { files: ItemFile[] } & Response,
            { targetId?: string }
        >({
            query: ({ targetId = '' }) => `/files/in/${targetId}`,
        }),
        deleteFile: builder.mutation<Response, { id: string }>({
            query: ({ id }) => ({
                url: `/files/${id}`,
                method: 'DELETE',
            }),
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
        }),
    }),
});

export const {
    useUploadFilesMutation,
    useGetFilesByTargetIdQuery,
    useDeleteFileMutation,
    useCreateFolderMutation,
    useUpdateFileMutation,
} = filesApiSlice;
