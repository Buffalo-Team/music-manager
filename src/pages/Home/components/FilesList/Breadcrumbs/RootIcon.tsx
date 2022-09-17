import HomeIcon from '@mui/icons-material/Home';

interface Props {
    onClick?: () => void;
    disabled: boolean;
}

const RootIcon = ({ disabled, onClick }: Props) => (
    <HomeIcon
        sx={{
            height: (theme) => theme.spacing(1.6),
            width: (theme) => theme.spacing(1.6),
            color: (theme) => theme.palette.grey[200],
            ...(!disabled && {
                cursor: 'pointer',
                '&:hover': {
                    color: (theme) => theme.palette.text.primary,
                },
            }),
        }}
        onClick={onClick}
    />
);

export default RootIcon;
