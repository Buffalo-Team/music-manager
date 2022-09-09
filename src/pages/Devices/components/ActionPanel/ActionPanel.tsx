import { Box, Drawer } from '@mui/material';
import ActionPanelContent from 'pages/Devices/components/ActionPanel/ActionPanelContent';
import { Device } from 'types';

interface Props {
    device: Device | null;
    onClose: () => void;
    onDelete: () => void;
    onDownload: () => void;
}

const ActionPanel = ({ device, onClose, onDelete, onDownload }: Props) => (
    <Drawer anchor="right" open={!!device} onClose={onClose}>
        <Box
            sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                    minWidth: '70vw',
                },
                [theme.breakpoints.up('sm')]: {
                    minWidth: '40vw',
                },
                [theme.breakpoints.up('md')]: {
                    minWidth: '20vw',
                },
                padding: 3.5,
                flex: 1,
            })}
        >
            {device && (
                <ActionPanelContent
                    device={device}
                    onClose={onClose}
                    onDelete={onDelete}
                    onDownload={onDownload}
                />
            )}
        </Box>
    </Drawer>
);

export default ActionPanel;
