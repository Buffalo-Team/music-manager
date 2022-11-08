import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';
import {
    useGetUserByIdQuery,
    useUpdateUserMutation,
} from 'app/api/usersApiSlice';
import { useAppSelector } from 'app/store';
import Loader from 'components/Loader';
import EditableFields from 'pages/User/UserDetails/EditableFields';
import useSnackbarMessages from 'pages/User/useSnackbarMessages';
import { ResponseStatus } from 'types';

interface UserNameData {
    name: string;
    surname: string;
}

interface UserEmailData {
    email: string;
}

const InputProps = (fontFamily: string) => ({
    sx: {
        input: {
            fontFamily,
            fontSize: (theme: Theme) => theme.spacing(2),
        },
    },
});

const UserDetails = () => {
    const { id } = useAppSelector(({ user: { user } }) => user) || {};
    const { data: userData, isLoading: isLoadingUserData } =
        useGetUserByIdQuery({ id: id || '' });
    const [updateUserName, { isLoading: isLoadingName }] =
        useUpdateUserMutation();
    const [updateUserEmail, { isLoading: isLoadingEmail }] =
        useUpdateUserMutation();
    const { showUpdateSuccessMessage, showUpdateErrorMessage } =
        useSnackbarMessages();
    const { user } = userData || {};
    const { name, surname, email } = user || {};
    const updateName = (values: UserNameData, onSuccess: () => void) => {
        handleUpdate(updateUserName, values, onSuccess);
    };

    const updateEmail = (values: UserEmailData, onSuccess: () => void) => {
        handleUpdate(updateUserEmail, values, onSuccess);
    };

    const handleUpdate = async (
        action: typeof updateUserName,
        values: UserNameData | UserEmailData,
        onSuccess: () => void
    ) => {
        const data = {
            id,
            ...values,
        };
        try {
            const response = await action(data).unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                showUpdateSuccessMessage();
                onSuccess();
            } else {
                showUpdateErrorMessage();
            }
        } catch (error) {
            showUpdateErrorMessage();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: (theme) => theme.spacing(3),
            }}
        >
            {isLoadingUserData && <Loader />}
            <AccountCircleIcon
                sx={(theme) => ({
                    width: theme.spacing(10),
                    height: theme.spacing(10),
                    color: theme.palette.grey[50],
                })}
            />
            <Box>
                {!isLoadingUserData && (
                    <EditableFields<UserNameData>
                        fields={[
                            {
                                name: 'name',
                                value: name,
                                InputProps: InputProps('InterSemiBold'),
                            },
                            {
                                name: 'surname',
                                value: surname,
                                InputProps: InputProps('InterSemiBold'),
                            },
                        ]}
                        loading={isLoadingName}
                        onUpdate={updateName}
                    >
                        {(value) => (
                            <Typography
                                variant="largeBold"
                                sx={{ marginY: 0.5 }}
                            >
                                {value}
                            </Typography>
                        )}
                    </EditableFields>
                )}
                {email && (
                    <EditableFields<UserEmailData>
                        fields={[
                            {
                                name: 'email',
                                value: email,
                                InputProps: InputProps('InterRegular'),
                            },
                        ]}
                        loading={isLoadingEmail}
                        onUpdate={updateEmail}
                    >
                        {(value) => (
                            <Typography variant="large" sx={{ marginY: 0.5 }}>
                                {value}
                            </Typography>
                        )}
                    </EditableFields>
                )}
            </Box>
        </Box>
    );
};

export default UserDetails;
