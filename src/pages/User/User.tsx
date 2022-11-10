import { Box } from '@mui/material';
import Card from 'components/Card';
import Language from 'pages/User/Language';
import Logout from 'pages/User/Logout';
import Password from 'pages/User/Password';
import Theme from 'pages/User/Theme';
import UserDetails from 'pages/User/UserDetails';
import Styled from './User.styled';

const User = () => (
    <Styled.Container>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: (theme) => theme.spacing(3),
            }}
        >
            <Card>
                <UserDetails />
            </Card>
            <Card>
                <Password />
            </Card>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: (theme) => theme.spacing(3),
                }}
            >
                <Card>
                    <Language />
                </Card>
                <Card>
                    <Theme />
                </Card>
            </Box>
        </Box>
        <Box>
            <Card>
                <Logout />
            </Card>
        </Box>
    </Styled.Container>
);

export default User;
