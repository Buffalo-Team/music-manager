import { Drawer } from '@mui/material';
import ActionPanelContent from 'pages/Devices/components/ActionPanel/ActionPanelContent';
import { Device } from 'types';
import Styled from './ActionPanel.styled';

interface Props {
    open: boolean;
    device?: Device;
    onClose: () => void;
    onEdit: () => void;
}

const ActionPanel = ({ open, device, onClose, onEdit }: Props) => (
    <Drawer anchor="right" open={open} onClose={onClose}>
        <Styled.ActionPanelContainer>
            {device && (
                <ActionPanelContent
                    device={device}
                    onClose={onClose}
                    onEdit={onEdit}
                />
            )}
        </Styled.ActionPanelContainer>
    </Drawer>
);

export default ActionPanel;
