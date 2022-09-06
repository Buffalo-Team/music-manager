import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LaptopIcon from '@mui/icons-material/Laptop';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WatchIcon from '@mui/icons-material/Watch';
import { DeviceType } from 'types';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const deviceIcons = {
    [DeviceType.CAR]: DirectionsCarIcon,
    [DeviceType.MOBILE]: PhoneAndroidIcon,
    [DeviceType.PC]: LaptopIcon,
    [DeviceType.WATCH]: WatchIcon,
    unknown: HelpOutlineIcon,
};

export default deviceIcons;
