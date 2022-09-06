import { useEffect } from 'react';
import { useGetCurrentUserDataQuery } from 'app/api/usersApiSlice';
import { useAppDispatch } from 'app/store';
import { setUser } from 'app/User/userSlice';

const CurrentUserManager = () => {
    const dispatch = useAppDispatch();
    const { data, isFetching, isSuccess } = useGetCurrentUserDataQuery();

    useEffect(() => {
        if (isSuccess && !isFetching && data?.user) {
            dispatch(setUser(data.user));
        }
    }, [data, isFetching, isSuccess]);

    return null;
};

export default CurrentUserManager;
