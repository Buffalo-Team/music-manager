import DevicesIcon from '@mui/icons-material/Devices';
import PeopleIcon from '@mui/icons-material/People';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { MenuItem } from 'types';

const menuItems: MenuItem[] = [
    {
        IconComponent: <QueueMusicIcon />,
        name: 'home',
        link: '/',
    },
    {
        IconComponent: <DevicesIcon />,
        name: 'devices',
        link: '/devices',
    },
    {
        IconComponent: <PeopleIcon />,
        name: 'community',
        link: '/community',
    },
];

export default menuItems;
