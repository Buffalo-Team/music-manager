import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LaptopIcon from '@mui/icons-material/Laptop';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WatchIcon from '@mui/icons-material/Watch';
import { DeviceType } from 'types';

const deviceIcons = {
    [DeviceType.CAR]: DirectionsCarIcon,
    [DeviceType.MOBILE]: PhoneAndroidIcon,
    [DeviceType.COMPUTER]: LaptopIcon,
    [DeviceType.WATCH]: WatchIcon,
    unknown: HelpOutlineIcon,
};

export default deviceIcons;
