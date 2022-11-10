import {
    CreateFolderRequestData,
    File as ItemFile,
    Response,
    ResponseStatus,
} from 'types';
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
            invalidatesTags: (result, error, { targetId }) => [
                { type: 'files', id: targetId },
                'devices',
            ],
        }),
        getFilesByTargetId: builder.query<
            { files: ItemFile[] } & Response,
            { targetId?: string }
        >({
            query: ({ targetId = '' }) => `/files/in/${targetId}`,
            providesTags: (result, error, { targetId }) => {
                return result
                    ? [{ type: 'files' as const, id: targetId }, 'files']
                    : ['files'];
            },
        }),
        deleteFile: builder.mutation<Response, ItemFile>({
            query: ({ id }) => ({
                url: `/files/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { parentFile }) => [
                { type: 'files', id: parentFile },
                'devices',
            ],
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
            invalidatesTags: (result, error, { targetId }) => [
                { type: 'files', id: targetId },
                'devices',
            ],
        }),
        updateFile: builder.mutation<
            Response,
            UpdateFileRequestData & { file: ItemFile }
        >({
            query: ({ file: { id }, ...body }) => ({
                url: `/files/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result, error, { file: { parentFile } }) => [
                { type: 'files', id: parentFile },
                'devices',
            ],
        }),
        downloadMissingFiles: builder.mutation<any, { deviceId: string }>({
            queryFn: async ({ deviceId }, api, extraOptions, baseQuery) => {
                const result: any = await baseQuery({
                    url: `/devices/${deviceId}/downloadMissingFiles`,
                    responseHandler: (response) => response.blob(),
                });
                const hiddenElement = document.createElement('a');
                const url = window.URL || window.webkitURL;
                hiddenElement.href = url.createObjectURL(result.data);
                hiddenElement.target = '_blank';
                hiddenElement.download = `missing_files_${new Date().getTime()}.zip`;
                hiddenElement.click();
                return {
                    data: {
                        status:
                            result.meta.response.status === 200
                                ? ResponseStatus.SUCCESS
                                : ResponseStatus.ERROR,
                    },
                } as any;
            },
        }),
    }),
});

export const {
    useUploadFilesMutation,
    useGetFilesByTargetIdQuery,
    useDeleteFileMutation,
    useCreateFolderMutation,
    useUpdateFileMutation,
    useDownloadMissingFilesMutation,
} = filesApiSlice;
