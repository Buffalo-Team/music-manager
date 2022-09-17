import { Typography } from '@mui/material';

interface Props {
    onClick?: () => void;
    name: string;
    disabled: boolean;
}

const BreadcrumbItem = ({ disabled, name, onClick }: Props) => (
    <Typography
        variant="regular"
        onClick={onClick}
        sx={{
            ...(!disabled && {
                cursor: 'pointer',
                '&:hover': {
                    color: (theme) => theme.palette.text.primary,
                },
            }),
        }}
    >
        {name}
    </Typography>
);

export default BreadcrumbItem;
