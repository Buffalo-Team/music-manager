import { useTranslation } from 'react-i18next';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';

const useSnackbarMessages = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const showSignInErrorMessage = () => {
        dispatch(
            openSnackbar({
                content: t('login.signInFailed'),
                severity: 'error',
            })
        );
    };

    const showSignUpErrorMessage = () => {
        dispatch(
            openSnackbar({
                content: t('login.signUpFailed'),
                severity: 'error',
            })
        );
    };

    return {
        showSignInErrorMessage,
        showSignUpErrorMessage,
    };
};

export default useSnackbarMessages;
