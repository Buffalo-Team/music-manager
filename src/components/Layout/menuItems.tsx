import DevicesIcon from '@mui/icons-material/Devices';
import PeopleIcon from '@mui/icons-material/People';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

const menuItems = [
    {
        IconComponent: <QueueMusicIcon />,
        name: 'home',
    },
    {
        IconComponent: <DevicesIcon />,
        name: 'devices',
    },
    {
        IconComponent: <PeopleIcon />,
        name: 'community',
    },
];

export default menuItems;
