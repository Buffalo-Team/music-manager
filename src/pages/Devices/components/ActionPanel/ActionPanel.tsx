import { Drawer } from '@mui/material';
import ActionPanelContent from 'pages/Devices/components/ActionPanel/ActionPanelContent';
import { Device } from 'types';
import Styled from './ActionPanel.styled';

interface Props {
    device: Device | null;
    onClose: () => void;
}

const ActionPanel = ({ device, onClose }: Props) => (
    <Drawer anchor="right" open={!!device} onClose={onClose}>
        <Styled.ActionPanelContainer>
            {device && <ActionPanelContent device={device} onClose={onClose} />}
        </Styled.ActionPanelContainer>
    </Drawer>
);

export default ActionPanel;
