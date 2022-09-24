import { useEffect, useState } from 'react';
import { useGetAllFilesQuery } from 'app/api/filesApiSlice';
import { useAppDispatch } from 'app/store';
import Loader from 'components/Loader';
import { File as ItemFile, ResponseStatus } from 'types';
import Actions from './components/Actions';
import FilesList from './components/FilesList';
import Breadcrumbs from './components/FilesList/Breadcrumbs';
import Styled from './Home.styled';
import { setFiles } from './store/filesSlice';

const Home = () => {
    const dispatch = useAppDispatch();
    const {
        data: filesResponse,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetAllFilesQuery();
    const [breadcrumbs, setBreadcrumbs] = useState<(ItemFile | undefined)[]>([
        undefined,
    ]);

    useEffect(() => {
        if (
            isSuccess &&
            !isFetching &&
            filesResponse?.status === ResponseStatus.SUCCESS
        ) {
            dispatch(setFiles(filesResponse?.files || []));
        }
    }, [filesResponse, isFetching, isSuccess]);

    const handleBreadcrumbClick = (index: number) => {
        setBreadcrumbs((prev) => prev.slice(0, index + 1));
    };

    const handleFolderSelect = (item: ItemFile) => {
        setBreadcrumbs((prev) => [...prev, item]);
    };

    return (
        <Styled.Container>
            <Actions targetFolder={breadcrumbs[breadcrumbs.length - 1]} />
            {isLoading && <Loader />}
            {isSuccess && (
                <>
                    <Breadcrumbs
                        breadcrumbs={breadcrumbs}
                        onItemClick={handleBreadcrumbClick}
                    />
                    <FilesList
                        onFolderSelect={handleFolderSelect}
                        targetFolder={breadcrumbs[breadcrumbs.length - 1]}
                    />
                </>
            )}
        </Styled.Container>
    );
};

export default Home;
