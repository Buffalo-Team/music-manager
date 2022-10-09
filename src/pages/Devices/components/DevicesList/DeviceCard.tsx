import { Box } from '@mui/material';
import DeviceCapacity from 'pages/Devices/components/DeviceCapacity';
import DeviceHeader from 'pages/Devices/components/DeviceHeader';
import MissingFilesWarning from 'pages/Devices/components/MissingFilesWarning';
import { Device } from 'types';
import Styled from './DeviceCard.styled';

interface Props {
    device: Device;
    onClick: (device: Device) => void;
    active: boolean;
}

const DeviceCard = ({ device, onClick, active }: Props) => {
    const {
        type,
        name,
        allocatedMegabytes,
        capacityMegabytes,
        missingFilesCount,
    } = device;
    return (
        <Styled.PaperCard
            elevation={0}
            active={active}
            onClick={() => onClick(device)}
        >
            <Box>
                <DeviceHeader type={type} name={name} />
                {!!missingFilesCount && (
                    <MissingFilesWarning filesCount={missingFilesCount} />
                )}
            </Box>
            <DeviceCapacity
                allocatedMegabytes={allocatedMegabytes}
                capacityMegabytes={capacityMegabytes}
            />
        </Styled.PaperCard>
    );
};

export default DeviceCard;
